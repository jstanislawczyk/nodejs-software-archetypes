import type { UUID } from 'node:crypto';
import type { MetaData } from '../common/metadata.js';
import type { Money } from '@archetypes/quantity';

export class ExecuteTransactionCommand {
  constructor(
    readonly transactionType: string,
    readonly occuredAt: Date,
    readonly appliesAt: Date,
    readonly metadata: MetaData,
    readonly entries: ExecuteTransactionEntry[],
  ) {}
}

export class ExecuteTransactionEntry {
  private constructor(
    readonly entryType: EntryType,
    readonly accountId: UUID,
    readonly amount: Money,
    readonly validFrom: Date | null,
    readonly validTo: Date | null,
    readonly appliedToEntryId: string | null,
  ) {}

  static credit(accountId: UUID, amount: Money): ExecuteTransactionEntry {
    return new ExecuteTransactionEntry(
      EntryType.CREDIT,
      accountId,
      amount,
      null,
      null,
      null,
    );
  }

  static debit(accountId: UUID, amount: Money): ExecuteTransactionEntry {
    return new ExecuteTransactionEntry(
      EntryType.DEBIT,
      accountId,
      amount,
      null,
      null,
      null,
    );
  }
}

export enum EntryType {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT',
}
