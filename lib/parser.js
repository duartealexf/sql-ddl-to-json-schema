"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nearley_1 = require("nearley");
const compiled_1 = require("@mysql/compiled");
const compact_1 = require("@mysql/formatter/compact");
const json_schema_1 = require("./mysql/formatter/json-schema");
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
const utils_1 = require("@shared/utils");
/**
 * Main Parser class, wraps nearley parser main methods.
 */
class Parser {
    /**
     * Parser constructor.
     * Default dialect is 'mysql'.
     *
     * @param dialect SQL dialect ('mysql' or 'mariadb' currently supported).
     */
    constructor(dialect = 'mysql') {
        /**
         * Parsed statements.
         */
        this.statements = [];
        /**
         * Remains of string feed, after last parsed statement.
         */
        this.remains = '';
        /**
         * Whether preparser is currently escaped.
         */
        this.escaped = false;
        /**
         * Current quote char of preparser.
         */
        this.quoted = '';
        if (!dialect || dialect === 'mysql' || dialect === 'mariadb') {
            this.compiledGrammar = nearley_1.Grammar.fromCompiled(compiled_1.Grammar);
            this.compactFormatter = new compact_1.CompactFormatter();
            this.jsonSchemaFormatter = new json_schema_1.JSONSchemaFormatter();
        }
        else {
            throw new TypeError(`Unsupported SQL dialect given to parser: '${dialect}. ` +
                `Please provide 'mysql', 'mariadb' or none to use default.`);
        }
        this.resetParser();
    }
    /**
     * Feed chunk of string into parser.
     *
     * @param chunk Chunk of string to be parsed.
     */
    feed(chunk) {
        let i, char, parsed = '';
        let lastStatementIndex = 0;
        for (i = 0; i < chunk.length; i++) {
            char = chunk[i];
            parsed += char;
            if (char === '\\') {
                this.escaped = !this.escaped;
            }
            else {
                if (!this.escaped && this.isQuoteChar(char)) {
                    if (this.quoted) {
                        if (this.quoted === char) {
                            this.quoted = '';
                        }
                    }
                    else {
                        this.quoted = char;
                    }
                }
                else if (char === ';' && !this.quoted) {
                    const statement = this.remains + parsed.substr(lastStatementIndex, i + 1);
                    this.statements.push(statement);
                    this.remains = '';
                    lastStatementIndex = i + 1;
                }
                this.escaped = false;
            }
        }
        this.remains += parsed.substr(lastStatementIndex);
        return this;
    }
    /**
     * Recreates NearleyParser using grammar given in constructor.
     */
    resetParser() {
        this.parser = new nearley_1.Parser(this.compiledGrammar);
    }
    /**
     * Checks whether character is a quotation character.
     *
     * @param char Character to be evaluated.
     */
    isQuoteChar(char) {
        return char === '"' || char === "'" || char === '`';
    }
    /**
     * Tidy parser results.
     *
     * @param results Parser results.
     */
    tidy(results) {
        return results[0];
    }
    /**
     * Parser results getter. Will run nearley parser on string fed to this parser.
     */
    get results() {
        let lineCount = 1;
        let statement = this.statements.shift();
        const results = [];
        /**
         * Since we separate the statements, if there is a parse error in a block among
         * several statements in a stream, the parser will throw the error with line
         * 0 counting from the beginning of the statement, not the stream. So we
         * need to catch and correct line count incrementally along the stream.
         *
         * https://github.com/duartealexf/sql-ddl-to-json-schema/issues/20
         */
        try {
            while (statement) {
                this.parser.feed(statement);
                lineCount += (statement.match(/\r\n|\r|\n/g) || []).length;
                results.push(this.tidy(this.parser.results));
                statement = this.statements.shift();
                this.resetParser();
            }
        }
        catch (e) {
            /**
             * Apply line count correction.
             */
            if (e.message && utils_1.isString(e.message)) {
                const matches = e.message.match(/^at line (\d+)/);
                if (matches && Array.isArray(matches) && matches.length > 1) {
                    const errorLine = Number(matches[1]);
                    const newCount = lineCount + errorLine - 1;
                    e.message = e.message.replace(/\d+/, newCount);
                }
            }
            /**
             * Reset everything to not affect next feed.
             */
            this.resetParser();
            this.statements = [];
            this.remains = '';
            this.escaped = false;
            this.quoted = '';
            throw e;
        }
        /**
         * Reset remains to not affect next feed.
         */
        this.remains = '';
        this.escaped = false;
        this.quoted = '';
        return {
            id: 'MAIN',
            def: results,
        };
    }
    /**
     * Formats given parsed JSON to a compact format.
     * If no JSON is given, will use currently parsed SQL.
     *
     * @param json Parsed JSON format (optional).
     * @returns {any[]} Array of tables in compact JSON format.
     */
    toCompactJson(json) {
        if (!json) {
            json = this.results;
        }
        return this.compactFormatter.format(json);
    }
    /**
     * Formats parsed SQL to an array of JSON Schema documents,
     * where each item is the JSON Schema of a table. If no
     * tables are given, will use currently parsed SQL.
     *
     * @param options Options available to format as JSON Schema (optional).
     * @param tables Array of tables in compact JSON format (optional).
     */
    toJsonSchemaArray(options = {
        useRef: true,
    }, tables) {
        if (!tables) {
            tables = this.toCompactJson();
        }
        return this.jsonSchemaFormatter.format(tables, options);
    }
    /**
     * Output JSON Schema files (one for each table) in given output directory for the
     * parsed SQL. If no JSON Schemas array is given, will use currently parsed SQL.
     * Only available in NodeJS environments.
     *
     * @param outputDir Output directory.
     * @param options Options object for JSON Schema output to files (optional).
     * @param jsonSchemas JSON Schema documents array (optional).
     */
    toJsonSchemaFiles(outputDir, options = {
        useRef: true,
        extension: '.json',
        indent: 2,
    }, jsonSchemas) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!outputDir) {
                throw new Error('Please provide output directory for JSON Schema files');
            }
            if (!jsonSchemas) {
                jsonSchemas = this.toJsonSchemaArray({
                    useRef: options.useRef,
                });
            }
            const filepaths = yield Promise.all(jsonSchemas.map((schema) => __awaiter(this, void 0, void 0, function* () {
                if (!schema.$id) {
                    throw new Error('No root $id found in schema. It should contain the table name. ' +
                        'If you have modified the JSON Schema, please keep the $id, as it will be the file name.');
                }
                const filename = schema.$id;
                const filepath = path_1.join(outputDir, filename + options.extension);
                const path = yield new Promise((resolve) => {
                    fs_1.default.writeFile(filepath, JSON.stringify(schema, null, options.indent), (err) => {
                        if (err) {
                            throw new Error(`Error when trying to write to file ${filepath}: ${JSON.stringify(err, null, 2)}`);
                        }
                        resolve(filepath);
                    });
                });
                return path;
            })));
            return filepaths;
        });
    }
}
exports.Parser = Parser;
//# sourceMappingURL=parser.js.map