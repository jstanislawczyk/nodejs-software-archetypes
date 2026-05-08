import { Preconditions } from '@archetypes/common';
import { randomUUID, type UUID } from 'node:crypto';

export class EntryId {
  readonly value: UUID;

  private constructor(value: UUID) {
    Preconditions.checkNotBlank(value, 'EntryId cannot be null or blank');

    this.value = value;
  }

  static generate(): EntryId {
    return new EntryId(randomUUID());
  }

  equals(other: EntryId): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
