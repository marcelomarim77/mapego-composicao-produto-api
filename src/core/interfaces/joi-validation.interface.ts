import Joi = require('@hapi/joi');
import { AppResult } from '../models/app-result.model';

export interface JoiValidation<T = any> {
    resolveSchema(value: T): Joi.ObjectSchema;
    validate(value: T, schema: Joi.ObjectSchema): Joi.ValidationResult;
    transform(value: T, errors: string[], message: string): AppResult;
}
