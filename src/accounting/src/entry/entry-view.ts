import type { Dayjs } from 'dayjs';
import type { AccountId } from '../account/account-id.js';
import type { TransactionId } from '../transaction/transaction-id.js';
import type { Money } from '@archetypes/quantity';
import type { EntryId } from './entry-id.js';
import { AccountCredited, AccountDebited, type Entry } from './entry.js';

export class EntryView {
  readonly entryId: EntryId;
  readonly type: EntryType;
  readonly amount: Money;
  readonly transactionId: TransactionId;
  readonly accountId: AccountId;
  readonly occurredAt: Dayjs;
  readonly appliesAt: Dayjs;

  private constructor(
    entryId: EntryId,
    type: EntryType,
    amount: Money,
    transactionId: TransactionId,
    accountId: AccountId,
    occurredAt: Dayjs,
    appliesAt: Dayjs,
  ) {
    this.entryId = entryId;
    this.type = type;
    this.amount = amount;
    this.transactionId = transactionId;
    this.accountId = accountId;
    this.occurredAt = occurredAt;
    this.appliesAt = appliesAt;
  }

  static from(entry: Entry): EntryView {
    return new EntryView(
      entry.id,
      entryTypeFrom(entry),
      entry.amount,
      entry.transactionId,
      entry.accountId,
      entry.occurredAt,
      entry.appliesAt,
    );
  }
}

export enum EntryType {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT',
}

function entryTypeFrom(entry: Entry): EntryType {
  if (entry instanceof AccountCredited) {
    return EntryType.CREDIT;
  }

  if (entry instanceof AccountDebited) {
    return EntryType.DEBIT;
  }

  throw new Error('Unknown entry type');
}
