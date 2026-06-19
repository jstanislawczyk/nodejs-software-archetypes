import type { Entry } from './entry.js';
import { Money } from '@archetypes/quantity';

export class Entries {
  private constructor(private entries: Entry[]) {}

  static empty(): Entries {
    return new Entries([]);
  }

  //TODO: should be moved to view - this class should be only used to store new entries
  balanceAsOf(when: Date): Money {
    return this.entries
      .filter((entry) => entry.appliesAt <= when)
      .map((entry) => entry.amount)
      .reduce((acc, amount) => acc.add(amount), Money.zeroPln());
  }

  add(entry: Entry): Entries {
    this.entries.push(entry);
    return this;
  }

  addAll(newEntries: Entry[]): Entries {
    this.entries.push(...newEntries);
    return this;
  }

  toList(): Entry[] {
    return [...this.entries];
  }

  amounts(): Money[] {
    return this.entries.map((entry) => entry.amount);
  }

  copy(): Entries {
    return new Entries([...this.entries]);
  }

  stream(): Entry[] {
    return this.entries;
  }
}
