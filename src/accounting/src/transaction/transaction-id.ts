import { Preconditions } from '@archetypes/common';
import { randomUUID, type UUID } from 'node:crypto';

export class TransactionId {
  readonly value: UUID;

  private constructor(value: UUID) {
    Preconditions.checkArgument(
      value != null && value.trim().length > 0,
      'TransactionId cannot be null or blank',
    );

    this.value = value;
  }

  static generate(): TransactionId {
    return new TransactionId(randomUUID());
  }

  static of(value: UUID): TransactionId {
    return new TransactionId(value);
  }

  equals(other: TransactionId): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
