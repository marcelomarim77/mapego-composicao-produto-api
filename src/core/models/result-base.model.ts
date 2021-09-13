import { HttpStatus, Logger } from '@nestjs/common';

export interface Result<T> {
    statusCode: number;
    success: boolean;
    message: string;
    data: T;
    errors: string[];

    getOptions(): any;
}

export abstract class ResultBase {

    private options: any;

    public statusCode: number = HttpStatus.OK;

    public success: boolean = true;

    public message: string;

    public errors: string[];

    isValid(): boolean {
        return this.success === true;
    }

    isInvalid(): boolean {
        return this.success !== true;
    }

    setStatusCode(httpStatus: HttpStatus): void {
        this.statusCode = httpStatus;
    }

    getStatusCode(): number {
        return this.statusCode;
    }

    setMessage(message: string): void {
        this.message = message;
    }

    setOptions(options: any): void {
        this.options = options;
    }

    getOptions(): any {
        return this.options;
    }

    setInternalServerError(exception: any): void {
        this.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        this.setMessage('Houve um erro interno, favor tente mais tarde.');
        this.addError(exception.message);
        Logger.error(exception.message, exception.stack, 'ERROR');
    }

    addError(message: string): void {
        if (!this.errors) {
            this.errors = [];
        }
        this.errors.push(message);
        this.success = false;
    }

    addErrors(messages: string[]): void {
        if (!this.errors) {
            this.errors = [];
        }
        if (messages == null || messages.length <= 0) { return; }
        this.errors = this.errors.concat(messages);
        this.success = false;
    }

    response(): any {
        if (this.isValid()) {
            if (!this.statusCode) {
                this.statusCode = HttpStatus.OK;
            }

            return this;
        }

        if (this.statusCode < 500) {
            this.statusCode = HttpStatus.BAD_REQUEST;
        }
        return this;
    }

    responseToTopic(topicName: string) {
        if (this.options == null) { this.options = {}; }
        Object.assign(this.options, { topicName });
        return this.response();
    }
}
