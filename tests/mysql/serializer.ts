export class ParsedQuerySerializer {
  parsed: unknown;

  constructor(parsed: unknown) {
    this.parsed = parsed;
  }

  static test(value: unknown): boolean {
    return value instanceof ParsedQuerySerializer;
  }

  static serialize(value: ParsedQuerySerializer): string {
    return JSON.stringify(value.parsed, null, 2);
  }
}

expect.addSnapshotSerializer(ParsedQuerySerializer);
