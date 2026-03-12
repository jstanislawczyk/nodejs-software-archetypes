import type { SerialNumber } from './serial-number.js';
import { Preconditions } from '@/common/preconditions.js';

export class TextualSerialNumber implements SerialNumber {
  private readonly rawValue: string;

  private constructor(value: string) {
    Preconditions.checkArgument(
      !!value && value.trim().length > 0,
      'SerialNumber  cannot be null or blank',
    );
  }

  static of(value: string): TextualSerialNumber {
    return new TextualSerialNumber(value);
  }

  type(): string {
    return 'TEXTUAL';
  }

  value(): string {
    return this.rawValue;
  }

  toString(): string {
    return this.rawValue;
  }
}
