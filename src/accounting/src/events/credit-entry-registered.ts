import type { UUID } from 'node:crypto';
import type { AccountingEvent } from './accounting.event.js';
import type { Money } from '@archetypes/quantity';

export class CreditEntryRegistered implements AccountingEvent {
  constructor(
    readonly id: UUID,
    readonly accountId: UUID,
    readonly transactionId: UUID,
    readonly entryId: UUID,
    readonly amount: Money,
    readonly occurredAt: Date,
    readonly appliesAt: Date,
  ) {}

  readonly type = 'CreditEntryRegistered';
}
