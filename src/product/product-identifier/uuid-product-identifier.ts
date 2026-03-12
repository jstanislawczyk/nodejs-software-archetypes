import type { ProductIdentifier } from './product-identifier.js';
import { randomUUID } from 'node:crypto';

export class UuidProductIdentifier implements ProductIdentifier {
  private readonly rawValue: string;

  private constructor(value: string) {
    this.rawValue = value;
  }

  static random(): UuidProductIdentifier {
    return new UuidProductIdentifier(randomUUID());
  }

  static of(value: string): UuidProductIdentifier {
    return new UuidProductIdentifier(value);
  }

  type(): string {
    return 'UUID';
  }

  value(): string {
    return this.rawValue;
  }

  toString(): string {
    return this.rawValue;
  }
}
