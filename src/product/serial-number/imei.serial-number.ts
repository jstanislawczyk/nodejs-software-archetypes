import type { SerialNumber } from './serial-number.js';
import { Preconditions } from '@/common/preconditions.js';

export class ImeiSerialNumber implements SerialNumber {
  private readonly rawValue: string;

  private constructor(value: string) {
    Preconditions.checkArgument(
      !!value && value.trim().length > 0,
      'IMEI  cannot be null or blank',
    );

    const normalized = value.replace(/[\s-]/g, '');

    Preconditions.checkArgument(
      /^\d{15}$/.test(normalized),
      'IMEI must be exactly 15 digits',
    );

    Preconditions.checkArgument(
      ImeiSerialNumber.isValidLuhnChecksum(normalized),
      'Invalid IMEI check digit (Luhn algorithm)',
    );

    this.rawValue = normalized;
  }

  static of(value: string): ImeiSerialNumber {
    return new ImeiSerialNumber(value);
  }

  type(): string {
    return 'IMEI';
  }

  value(): string {
    return this.rawValue;
  }

  toString(): string {
    return this.rawValue;
  }

  private static isValidLuhnChecksum(imei: string): boolean {
    let sum = 0;
    let alternate = false;

    for (let i = imei.length - 1; i >= 0; i--) {
      let digit = Number(imei.charAt(i));

      if (alternate) {
        digit *= 2;

        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      alternate = !alternate;
    }

    return sum % 10 === 0;
  }
}
