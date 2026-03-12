import { Preconditions } from '@/common/preconditions.js';
import type { ProductIdentifier } from './product-identifier.js';

/**
 * GTIN (Global Trade Item Number) - standard identifier for retail products.
 * Supports multiple data structures:
 * - GTIN-8 (EAN-8): 8 digits
 * - GTIN-12 (UPC-A): 12 digits
 * - GTIN-13 (EAN-13): 13 digits
 * - GTIN-14: 14 digits
 *
 * All include company prefix, item reference number, and check digit.
 */
export class GtinProductIdentifier implements ProductIdentifier {
  private readonly _value: string;

  private constructor(value: string) {
    Preconditions.checkArgument(
      value != null && value.trim().length > 0,
      'GTIN cannot be null or blank',
    );

    const normalized = value.replace(/[-\s]/g, '');

    Preconditions.checkArgument(
      /^(?:\d{8}|\d{12}|\d{13}|\d{14})$/.test(normalized),
      'GTIN must be 8, 12, 13, or 14 digits',
    );

    Preconditions.checkArgument(
      GtinProductIdentifier.isValidCheckDigit(normalized),
      'Invalid GTIN check digit',
    );

    this._value = normalized;
  }

  static of(value: string): GtinProductIdentifier {
    return new GtinProductIdentifier(value);
  }

  type(): string {
    return `GTIN-${this._value.length}`;
  }

  value(): string {
    return this._value;
  }

  toString(): string {
    return this._value;
  }

  private static isValidCheckDigit(gtin: string): boolean {
    let sum = 0;

    for (let i = 0; i < gtin.length - 1; i++) {
      const digit = Number(gtin[i]);

      // Alternate between multiplying by 3 and 1, starting from the right
      const multiplier = (gtin.length - i) % 2 === 0 ? 3 : 1;

      sum += digit * multiplier;
    }

    const checkDigit = Number(gtin[gtin.length - 1]);
    const calculatedCheck = (10 - (sum % 10)) % 10;

    return checkDigit === calculatedCheck;
  }
}
