import { Money } from '@archetypes/quantity';
import type { AccountId } from './account-id.js';
import { EntryView } from '../entry/entry-view.js';
import type { Account } from './account.js';

export class AccountView {
  constructor(
    readonly id: AccountId,
    readonly name: string,
    readonly type: string,
    readonly balance: Money,
    readonly entires: EntryView[],
  ) {}

  static from(account: Account): AccountView {
    const entryViews = account
      .entries()
      .stream()
      .map((entry) => EntryView.from(entry));

    return new AccountView(
      account.id(),
      account.getName(),
      account.getType(),
      account.getBalance(),
      entryViews,
    );
  }

  balanceAsOf(date: Date): Money {
    const entriesBeforeDate = this.entires.filter(
      (entry) => entry.appliesAt <= date,
    );
    return entriesBeforeDate.reduce(
      (acc, entry) => acc.add(entry.amount),
      Money.zeroPln(),
    );
  }
}
