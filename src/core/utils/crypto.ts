import { isObject, isString } from 'util';
import { isNullOrEmpty, getEnvironment } from './util';
import { Logger } from '@nestjs/common';
import crypto = require('crypto');

export declare type EncryptEncondingType = 'hex' | 'base64';

export const encrypt = (value: object | string | number | string[] | number[], toEnconding: EncryptEncondingType = 'hex') => {
    if (isNullOrEmpty(value)) { return null; }

    try {
        const secret = getEnvironment('CRYPTO_SECRET', true);
        const privateKey = secret.substr(8, 16);
        const key = Buffer.from(secret);
        const iv = Buffer.from(privateKey);
        const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
        const plainText = isObject(value) ? JSON.stringify(value) : `${value}`;
        let encryptBuffer = cipher.update(plainText);
        encryptBuffer = Buffer.concat([encryptBuffer, cipher.final()]);
        return encryptBuffer.toString(toEnconding);
    } catch (ex) {
        Logger.error({ message: ex.message, value }, ex.stack, 'ERROR][encrypt');
        return null;
    }
};

export const decrypt = (encryptedText: string, fromEnconding: EncryptEncondingType = 'hex') => {
    if (isNullOrEmpty(encryptedText)) { return null; }
    if (!isString(encryptedText)) { return null; }

    try {
        const secret = getEnvironment('CRYPTO_SECRET', true);
        const privateKey = secret.substr(8, 16);
        const key = Buffer.from(secret);
        const iv = Buffer.from(privateKey);
        const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
        let content = decipher.update(Buffer.from(encryptedText, fromEnconding));
        content = Buffer.concat([content, decipher.final()]);
        return content.toString();
    } catch (ex) {
        Logger.error({ message: ex.message, encryptedText }, ex.stack, 'ERROR][decrypt');
        return null;
    }
};
