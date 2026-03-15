import { isUUID } from '@/common/uuid.js';
import { randomUUID } from 'node:crypto';

export class BatchId {
  private readonly _value: string;

  private constructor(value: string) {
    this._value = value;
  }

  static newOne(): BatchId {
    return new BatchId(randomUUID());
  }

  static of(value: string): BatchId {
    if (!isUUID(value)) {
      throw new Error('Invalid UUID for BatchId');
    }
    return new BatchId(value);
  }

  value(): string {
    return this._value;
  }

  toString(): string {
    return this._value;
  }
}
