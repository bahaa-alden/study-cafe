"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pascalCase = exports.camelCase = void 0;
const UPPER_LOWER_CASE = /(?<upperCaseLetter>\p{Lu})(?<lowerCaseLetter>\p{Ll})/gu;
const LOWER_UPPER_CASE = /(?<lowerCaseLetter>\p{Ll})(?<upperCaseLetter>\p{Lu})/gu;
const LEADING_CAPITAL = /^\p{Lu}(?!\p{Lu})/gu;
const IDENTIFIER = /(?<identifier>[\p{Alpha}\p{N}_]|$)/u;
const SEPARATORS = /[_.\- ]+/u;
const LEADING_SEPARATORS = new RegExp(`^${SEPARATORS.source}`, 'u');
const SEPARATORS_AND_IDENTIFIER = new RegExp(SEPARATORS.source + IDENTIFIER.source, 'gu');
const NUMBERS_AND_IDENTIFIER = new RegExp(`\\d+${IDENTIFIER.source}`, 'gu');
const preserveCamelCase = (string) => string
    .replace(UPPER_LOWER_CASE, (_, upperCaseLetter, lowerCaseLetter) => `-${upperCaseLetter}${lowerCaseLetter}`)
    .replace(LOWER_UPPER_CASE, (_, lowerCaseLetter, upperCaseLetter) => `${lowerCaseLetter}-${upperCaseLetter}`);
const convertToCamelCase = (input, toUpperCase) => input
    .replace(LEADING_SEPARATORS, '')
    .replace(SEPARATORS_AND_IDENTIFIER, (_, identifier) => toUpperCase(identifier))
    .replace(NUMBERS_AND_IDENTIFIER, (string) => toUpperCase(string));
const preserveConsecutiveUppercase = (input, toLowerCase) => input.replace(LEADING_CAPITAL, (string) => toLowerCase(string));
const getLowerCaseFn = (locale) => locale
    ? (string) => string.toLocaleLowerCase(locale)
    : (string) => string.toLowerCase();
const getUpperCaseFn = (locale) => locale
    ? (string) => string.toLocaleUpperCase(locale)
    : (string) => string.toUpperCase();
const camelCase = (input, options) => {
    const toLowerCase = getLowerCaseFn(options?.locale);
    const toUpperCase = getUpperCaseFn(options?.locale);
    if (Array.isArray(input)) {
        input = input
            .map((item) => item.trim())
            .filter((item) => Boolean(item.length))
            .join('-');
    }
    input = input.trim();
    if (input.length === 0) {
        return '';
    }
    if (input.length === 1 && SEPARATORS.test(input)) {
        return '';
    }
    const containsUpperCase = input !== toLowerCase(input);
    if (containsUpperCase) {
        input = preserveCamelCase(input);
    }
    input =
        (options?.preserveConsecutiveUppercase ?? false)
            ? preserveConsecutiveUppercase(input, toLowerCase)
            : toLowerCase(input);
    return convertToCamelCase(input, toUpperCase);
};
exports.camelCase = camelCase;
const pascalCase = (input, options) => {
    input = (0, exports.camelCase)(input, options);
    const toUpperCase = getUpperCaseFn(options?.locale);
    input = toUpperCase(input.charAt(0)) + input.slice(1);
    return input;
};
exports.pascalCase = pascalCase;
//# sourceMappingURL=camelcase.js.map