import type { TransactionId } from '../transaction/transaction-id.js';
import { EntryId } from './entry-id.js';
import type { AccountId } from '../account/account-id.js';
import type { Money } from '@archetypes/quantity';
import { Validity } from '../common/validity.js';
import { MetaData } from '../common/metadata.js';

export interface Entry {
  id: EntryId;
  transactionId: TransactionId;
  occurredAt: Date;
  appliesAt: Date;
  accountId: AccountId;
  amount: Money;
  metadata: MetaData;
  validity: Validity;
  appliedTo: EntryId | null;
}

export class AccountDebited implements Entry {
  private constructor(
    readonly id: EntryId,
    readonly transactionId: TransactionId,
    readonly accountId: AccountId,
    readonly amount: Money,
    readonly appliesAt: Date,
    readonly occurredAt: Date,
    readonly metadata: MetaData,
    readonly validity: Validity,
    readonly appliedTo: EntryId | null,
  ) {}

  static create(
    accountId: AccountId,
    transactionId: TransactionId,
    amount: Money,
    appliesAt: Date,
    occurredAt: Date,
    metadata?: MetaData,
    validity?: Validity,
    appliedToEntryId?: EntryId,
  ): AccountDebited {
    const id = EntryId.generate();

    return new AccountDebited(
      id,
      transactionId,
      accountId,
      amount,
      appliesAt,
      occurredAt,
      metadata ?? MetaData.empty(),
      validity ?? Validity.always(),
      appliedToEntryId ?? null,
    );
  }
}

export class AccountCredited implements Entry {
  private constructor(
    readonly id: EntryId,
    readonly transactionId: TransactionId,
    readonly accountId: AccountId,
    readonly amount: Money,
    readonly appliesAt: Date,
    readonly occurredAt: Date,
    readonly metadata: MetaData,
    readonly validity: Validity,
    readonly appliedTo: EntryId | null,
  ) {}

  static create(
    accountId: AccountId,
    transactionId: TransactionId,
    amount: Money,
    appliesAt: Date,
    occurredAt: Date,
    metadata?: MetaData,
    validity?: Validity,
    appliedToEntryId?: EntryId,
  ): AccountCredited {
    const id = EntryId.generate();

    return new AccountCredited(
      id,
      transactionId,
      accountId,
      amount,
      appliesAt,
      occurredAt,
      metadata ?? MetaData.empty(),
      validity ?? Validity.always(),
      appliedToEntryId ?? null,
    );
  }
}
