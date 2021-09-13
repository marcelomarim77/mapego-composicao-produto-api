import { ResultBase, Result } from './result-base.model';

export class AppResult<T = any> extends ResultBase implements Result<T> {
    data: T;
}
