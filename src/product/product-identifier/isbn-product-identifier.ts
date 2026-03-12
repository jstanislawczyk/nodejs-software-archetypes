import { Preconditions } from '@/common/preconditions.js';
import type { ProductIdentifier } from './product-identifier.js';

/**
 * ISBN (International Standard Book Number) - standard identifier for books.
 * Format: ISBN-10 (e.g., 0-201-77060-1)
 *
 * Structure:
 * - Group identifier (geographic/language area)
 * - Publisher identifier
 * - Title identifier
 * - Check digit (0-9 or X for 10)
 */
export class IsbnProductIdentifier implements ProductIdentifier {
  private readonly rawValue: string;

  private constructor(value: string) {
    Preconditions.checkArgument(
      value != null && value.trim().length > 0,
      'ISBN cannot be null or blank',
    );

    const normalized = value.replace(/[-\s]/g, '');

    Preconditions.checkArgument(
      /^\d{9}[\dX]$/.test(normalized),
      'ISBN must be 10 digits with optional check digit X',
    );

    Preconditions.checkArgument(
      IsbnProductIdentifier.isValidCheckDigit(normalized),
      'Invalid ISBN check digit',
    );

    this.rawValue = normalized;
  }

  static of(value: string): IsbnProductIdentifier {
    return new IsbnProductIdentifier(value);
  }

  type(): string {
    return 'ISBN';
  }

  value(): string {
    return this.rawValue;
  }

  toString(): string {
    return `ISBN ${this.rawValue}`;
  }

  private static isValidCheckDigit(isbn: string): boolean {
    let sum = 0;

    for (let i = 0; i < 9; i++) {
      sum += (10 - i) * Number(isbn[i]);
    }

    const checkChar = isbn[9];
    const checkDigit = checkChar === 'X' ? 10 : Number(checkChar);

    return (sum + checkDigit) % 11 === 0;
  }
}
