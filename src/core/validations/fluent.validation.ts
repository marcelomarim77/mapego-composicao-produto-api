import { isNullOrEmpty, isNotNullOrEmpty } from '../utils/util';
import { isString } from 'util';

export class FluentValidation {
    value: any = 0;
    errors: string[] = [];
    hasError = false;

    ruleFor(value: any) {
        this.value = value;
        this.hasError = false;
        return this;
    }

    withMessage(message: string) {
        if (this.hasError) {
            this.errors.push(message);
        }
        this.hasError = false;
        return this;
    }

    must(func: (value: any) => boolean) {
        if (this.hasError) { return this; }
        this.hasError = !func(this.value);
        return this;
    }

    isNumber() {
        if (this.hasError) { return this; }
        this.hasError = isNaN(this.value);
        return this;
    }

    isEmail() {
        if (this.hasError) { return this; }
        // tslint:disable-next-line: quotemark
        const pattern = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");
        this.hasError = !pattern.test(this.value);
        return this;
    }

    isNull() {
        if (this.hasError) { return this; }
        this.hasError = !(this.value === null);
        return this;
    }

    isNotNull() {
        if (this.hasError) { return this; }
        this.hasError = !(this.value !== null);
        return this;
    }

    isNullOrUndefined() {
        if (this.hasError) { return this; }
        this.hasError = !(this.value === null || this.value === undefined);
        return this;
    }

    isNotNullOrUndefined() {
        if (this.hasError) { return this; }
        this.hasError = (this.value === null || this.value === undefined);
        return this;
    }

    isNullOrEmpty() {
        if (this.hasError) { return this; }
        this.hasError = !isNullOrEmpty(this.value);
        return this;
    }

    isNotNullOrEmpty() {
        if (this.hasError) { return this; }
        this.hasError = !isNotNullOrEmpty(this.value);
        return this;
    }

    isTrue() {
        if (this.hasError) { return this; }
        this.hasError = !(this.value === true);
        return this;
    }

    isFalse() {
        if (this.hasError) { return this; }
        this.hasError = !(this.value === false);
        return this;
    }

    isMatch(pattern: string | RegExp) {
        if (this.hasError) { return this; }
        const regExp = new RegExp(pattern);
        this.hasError = !(regExp.test(this.value));
        return this;
    }

    isEqual(value: string|number) {
        if (this.hasError) { return this; }
        this.hasError = !(this.value === value);
        return this;
    }

    isNotEqual(value: string|number) {
        if (this.hasError) { return this; }
        this.hasError = !(this.value !== value);
        return this;
    }

    hasLength(min: number, max: number) {
        if (this.hasError) { return this; }
        if (this.value == null || !isString(this.value)) {
            this.hasError = false;
            return this;
        }
        this.hasError = false;
        if (min != null) {
            this.hasMinLength(min);
        }
        if (max != null) {
            this.hasMaxLength(max);
        }
        return this;
    }

    hasMinLength(min: number) {
        if (this.hasError) { return this; }
        if (min == null || this.value == null || !isString(this.value)) {
            this.hasError = false;
            return this;
        }

        this.hasError = this.value.length < min;
        return this;
    }

    hasMaxLength(max: number) {
        if (this.hasError) { return this; }
        if (max == null || this.value == null || !isString(this.value)) {
            this.hasError = false;
            return this;
        }

        this.hasError = this.value.length > max;
        return this;
    }

}
