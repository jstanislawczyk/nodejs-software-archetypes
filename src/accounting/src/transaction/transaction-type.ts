import { Preconditions } from '@archetypes/common';

export class TransactionType {
  static readonly INITIALIZATION = new TransactionType('initialization');
  static readonly REVERSAL = new TransactionType('reversal');
  static readonly TRANSFER = new TransactionType('transfer');
  static readonly REALLOCATION = new TransactionType('reallocation');
  static readonly EXPIRATION_COMPENSATION = new TransactionType(
    'expiration_compensation',
  );

  readonly value: string;

  private constructor(value: string) {
    Preconditions.checkNotBlank(
      value,
      'TransactionType cannot be null or blank',
    );

    this.value = value;
  }

  static of(value: string): TransactionType {
    return new TransactionType(value);
  }

  equals(other: TransactionType): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
