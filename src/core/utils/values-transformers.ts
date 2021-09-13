import { ValueTransformer } from 'typeorm/decorator/options/ValueTransformer';

export const bigintTransformer: ValueTransformer = {
    to: (entityValue: number) => entityValue,
    from: (databaseValue: string): number => databaseValue == null ? null : parseInt(databaseValue, 10),
};

export const jsonTransformer: ValueTransformer = {
    to: (entityValue: string) => entityValue,
    from: (databaseValue: string) => JSON.parse(databaseValue),
};
