import { isUUID } from '@/common/uuid.js';
import { randomUUID } from 'node:crypto';

export class InstanceId {
  private readonly rawValue: string;

  private constructor(value: string) {
    this.rawValue = value;
  }

  static newOne(): InstanceId {
    return new InstanceId(randomUUID());
  }

  static of(value: string): InstanceId {
    if (!isUUID(value)) {
      throw new Error('Invalid UUID for InstanceId');
    }

    return new InstanceId(value);
  }

  toString(): string {
    return this.rawValue;
  }

  value(): string {
    return this.rawValue;
  }
}
