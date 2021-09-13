import { isArray, isString, isNullOrUndefined, isObject } from 'util';

export const isNullOrEmpty = (value: any) => {
    if (value == null) { return true; }
    if (isArray(value) || isString(value)) { return value.length === 0; }
    if (isObject(value)) { return Object.keys(value).length === 0; }
    return true;
};

export const isNotNullOrEmpty = (value: any) => {
    return !isNullOrEmpty(value);
};

export const getOnlyNumbers = (value: string) => {
    if (isNullOrEmpty(value)) { return value; }
    return value.replace(/[^0-9]/g, '');
};

export const getEnvironment = (key: string, throwException = false): string => {
    const env = process.env[key];
    if (!throwException) {
        return env;
    }

    if (isNullOrUndefined(env)) {
        throw new Error(`Key ${key} not found.`);
    }
    return env;
};

export const isProduction = (): boolean => {
    return getEnvironment('NODE_ENV') === 'production';
};

export const getGatewayUrl = (path: string): string => {
    if (path == null) { return ''; }
    if (!path.startsWith('/')) { path = '/' + path; }
    return `${getEnvironment('GATEWAY_HOST')}${path}`;
};

export const getGatewayApiKeyCheckout = () => {
    return getEnvironment('GATEWAY_APIKEY_CHECKOUT');
};

export const solaceCleanedMessage = (rawMessage: string): string => {
    return rawMessage.replace(/[\s\S]/g, (character: string) => {
        const charCode = character.charCodeAt(0);
        if (charCode <= 8 ||
            charCode === 11 ||
            (charCode >= 14 && charCode <= 31) ||
            (charCode >= 128 && charCode <= 159) ||
            charCode > 255) {
            return '';
        }
        return character;
    });
};

export const removeAccents = (value: string): string => {
    return value == null ? null : value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};
