import { Money } from '@archetypes/quantity';
import type { AccountId } from './account-id.js';
import { AccountName } from './account-name.js';
import type { AccountType } from './account-type.js';
import { Preconditions, Version } from '@archetypes/common';
import { Entries } from '../entry/entries.js';
import type { AccountingEvent } from '../events/accounting.event.js';
import type { Entry } from '../entry/entry.js';
import { AccountCredited, AccountDebited } from '../entry/entry.js';
import { randomUUID } from 'node:crypto';
import { CreditEntryRegistered } from '../events/credit-entry-registered.js';
import { DebitEntryRegistered } from '../events/debit-entry-registered.js';

export class Account {
  private readonly accountId: AccountId;
  private readonly type: AccountType;
  private readonly name: AccountName;
  private balance: Money;
  private readonly version: Version; // Optimistic locking
  private readonly newEntries: Entries;
  private readonly pendingEvents: AccountingEvent[] = [];

  constructor(
    accountId: AccountId,
    type: AccountType,
    name: AccountName,
    balance?: Money,
    version?: Version,
  ) {
    Preconditions.checkNotEmpty(accountId, 'Account ID must be defined');
    Preconditions.checkNotEmpty(type, 'Account type must be defined');
    Preconditions.checkNotEmpty(name, 'Account name must be defined');

    this.accountId = accountId;
    this.type = type;
    this.name = name;
    this.version = version ?? Version.initial();
    this.balance = balance ?? Money.zeroPln();
    this.newEntries = Entries.empty();
  }

  addEntry(entry: Entry): void {
    this.newEntries.add(entry);
    this.balance = this.balance.add(entry.amount);
    this.recordEntryEvent(entry);
  }

  addEntries(newEntries: Entry[]): void {
    this.newEntries.addAll(newEntries);
    newEntries.forEach((entry) => {
      this.balance = this.balance.add(entry.amount);
      this.recordEntryEvent(entry);
    });
  }

  getName(): string {
    return this.name.value;
  }

  getPendingEvents(): AccountingEvent[] {
    return [...this.pendingEvents];
  }

  clearPendingEvents(): void {
    this.pendingEvents.length = 0;
  }

  id(): AccountId {
    return this.accountId;
  }

  entries(): Entries {
    return this.newEntries.copy();
  }

  getType(): AccountType {
    return this.type;
  }

  getBalance(): Money {
    return this.balance;
  }

  getVersion(): Version {
    return this.version;
  }

  private recordEntryEvent(entry: Entry): void {
    let event: AccountingEvent;

    if (entry instanceof AccountCredited) {
      event = new CreditEntryRegistered(
        randomUUID(),
        entry.accountId.value,
        entry.transactionId.value,
        entry.id.value,
        entry.amount,
        entry.occurredAt,
        entry.appliesAt,
      );
    } else if (entry instanceof AccountDebited) {
      event = new DebitEntryRegistered(
        randomUUID(),
        entry.accountId.value,
        entry.transactionId.value,
        entry.id.value,
        entry.amount,
        entry.occurredAt,
        entry.appliesAt,
      );
    } else {
      throw new Error('Unknown entry type');
    }

    this.pendingEvents.push(event);
  }
}
