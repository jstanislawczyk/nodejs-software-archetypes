import { Preconditions } from '@archetypes/common';
import { randomUUID, type UUID } from 'node:crypto';

export class AccountId {
  readonly value: UUID;

  private constructor(value: UUID) {
    Preconditions.checkNotBlank(value, 'AccountId cannot be null or blank');

    this.value = value;
  }

  static generate(): AccountId {
    return new AccountId(randomUUID());
  }

  static of(value: UUID): AccountId {
    return new AccountId(value);
  }

  equals(other: AccountId): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
