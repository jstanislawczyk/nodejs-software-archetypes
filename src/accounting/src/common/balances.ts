import { Money } from '@archetypes/quantity';
import type { AccountId } from '../account/account-id.js';

export class Balances {
  constructor(readonly balances: Map<AccountId, Money>) {}

  public static empty(): Balances {
    return new Balances(new Map());
  }

  public get(accountId: AccountId): Money | undefined {
    return this.balances.get(accountId);
  }

  public sum(): Money {
    return Array.from(this.balances.values()).reduce(
      (sum, balance) => sum.add(balance),
      Money.zeroPln(),
    );
  }

  public size(): number {
    return this.balances.size;
  }

  public has(accountId: AccountId): boolean {
    return this.balances.has(accountId);
  }
}
