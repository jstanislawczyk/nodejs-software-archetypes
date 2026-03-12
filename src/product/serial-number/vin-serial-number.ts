import type { SerialNumber } from './serial-number.ts';
import { Preconditions } from '@/common/preconditions.ts';

export class VinSerialNumber implements SerialNumber {
  private readonly rawValue: string;

  private constructor(value: string) {
    Preconditions.checkArgument(
      !!value && value.trim().length > 0,
      'VIN cannot be null or blank',
    );

    const normalized = value.toUpperCase().replace(/[\s-]/g, '');

    Preconditions.checkArgument(
      normalized.length === 17,
      'VIN must be exactly 17 characters',
    );
    Preconditions.checkArgument(
      /^[A-HJ-NPR-Z0-9]{17}$/.test(normalized),
      'VIN must contain only uppercase letters and digits (excluding I, O, Q)',
    );

    this.rawValue = normalized;
  }

  static of(value: string): VinSerialNumber {
    return new VinSerialNumber(value);
  }

  type(): string {
    return 'VIN';
  }

  value(): string {
    return this.rawValue;
  }

  toString(): string {
    return this.rawValue;
  }
}
