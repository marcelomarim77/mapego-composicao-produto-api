import { Injectable, PipeTransform, ArgumentMetadata, Logger } from '@nestjs/common';
import { decrypt, EncryptEncondingType } from '../utils/crypto';
import { isNullOrEmpty } from '../utils/util';
import { AppResult } from '../models/app-result.model';
import { AppException } from '../exceptions/app.exception';

@Injectable()
export class DecryptPipe implements PipeTransform {
    private readonly message: string;
    private readonly required: boolean;
    private readonly fromEnconding: EncryptEncondingType;

    constructor(message?: string, required?: boolean, fromEnconding?: EncryptEncondingType) {
        this.message = message || 'Falha ao validar a requisição.';
        this.required = required == null ? true : required;
        this.fromEnconding = fromEnconding || 'hex';
    }

    transform(encryptText: any, metadata: ArgumentMetadata) {
        if (isNullOrEmpty(encryptText)) {
            if (this.required === true) {
                throw new AppException(this.resultErro());
            } else {
                return encryptText;
            }
        }

        const plainText = decrypt(encryptText, this.fromEnconding);

        // Valida se houve falha no decrypt.
        if (plainText == null) {
            throw new AppException(this.resultErro());
        }

        // Valida se precisa é um JSON e precisar converter para objeto.
        if (plainText.startsWith('{') && plainText.endsWith('}')) {
            try {
                return JSON.parse(plainText);
            } catch (ex) {
                Logger.error({ message: 'Falha na conversão do JSON.', plainText }, ex.stack, 'ERROR][DecryptPipe');
                throw new AppException(this.resultErro());
            }
        }

        // Retonar o texto.
        return plainText;
    }

    resultErro() {
        const result = new AppResult();
        result.addError(this.message);
        result.setMessage('Falha ao validar a requisição.');
        return result.response();
    }
}
