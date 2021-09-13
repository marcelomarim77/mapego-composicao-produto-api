export interface Contract<T> {
    validate(value: T): Promise<string[]>;
}
