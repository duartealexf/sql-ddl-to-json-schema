// https://learn.microsoft.com/en-us/sql/t-sql/data-types/int-bigint-smallint-and-tinyint-transact-sql?view=sql-server-ver16
// https://dev.mysql.com/doc/refman/8.4/en/integer-types.html

export const TINYINT_SIGNED_MIN = -128;
export const TINYINT_SIGNED_MAX = 127;
export const TINYINT_UNSIGNED_MIN = 0;
export const TINYINT_UNSIGNED_MAX = 255;

export const SMALLINT_SIGNED_MIN = -32768;
export const SMALLINT_SIGNED_MAX = 32767;
export const SMALLINT_UNSIGNED_MIN = 0;
export const SMALLINT_UNSIGNED_MAX = 65535;

export const MEDIUMINT_SIGNED_MIN = -8388608;
export const MEDIUMINT_SIGNED_MAX = 8388607;
export const MEDIUMINT_UNSIGNED_MIN = 0;
export const MEDIUMINT_UNSIGNED_MAX = 16777215;

export const INT_SIGNED_MIN = -2147483648;
export const INT_SIGNED_MAX = 2147483647;
export const INT_UNSIGNED_MIN = 0;
export const INT_UNSIGNED_MAX = 4294967295;

// -BigInt(1) * BigInt(2) ** BigInt(63)
export const BIGINT_SIGNED_MIN = -9223372036854775808n;
// BigInt(2) ** BigInt(63) - BigInt(1)
export const BIGINT_SIGNED_MAX = 9223372036854775807n;
//
export const BIGINT_UNSIGNED_MIN = 0n;
// BigInt(2) ** BigInt(64) - BigInt(1)
export const BIGINT_UNSIGNED_MAX = 18446744073709551615n;

// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt

/**  9007199254740991: 2 ^ 53 - 1 */
export const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER;
/** -9007199254740991: -1 * (2 ^ 53 - 1) */
export const MIN_SAFE_INTEGER = Number.MIN_SAFE_INTEGER;

// a proposal for javascript to handle big int numbers
export const BIGINT_SIGNED_MIN_1 = MIN_SAFE_INTEGER;
export const BIGINT_SIGNED_MAX_1 = MAX_SAFE_INTEGER;
export const BIGINT_UNSIGNED_MIN_1 = 0;
export const BIGINT_UNSIGNED_MAX_1 = MAX_SAFE_INTEGER;
