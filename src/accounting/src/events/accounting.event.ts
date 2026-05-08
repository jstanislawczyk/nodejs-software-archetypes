import type { PublishedEvent } from '@archetypes/common';
import type { Money } from '@archetypes/quantity';
import type { UUID } from 'node:crypto';

export interface AccountingEvent extends PublishedEvent {
  appliesAt: Date;
  entryId: string;
  accountId: UUID;
  transactionId: UUID;
  amount: Money;
  type: 'CreditEntryRegistered' | 'DebitEntryRegistered';
}
