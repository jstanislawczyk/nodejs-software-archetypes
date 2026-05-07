import { Preconditions } from '@archetypes/common';
import type { Unit } from './unit.js';
import { Decimal } from 'decimal.js';

export class Quantity {
  constructor(
    readonly amount: Decimal,
    readonly unit: Unit,
  ) {
    Preconditions.checkNotEmpty(unit, 'Unit must not be null');
    Preconditions.checkNotEmpty(amount, 'Value must not be empty');
    Preconditions.checkArgument(
      amount.greaterThanOrEqualTo(0),
      'Value must be non-negative',
    );
  }

  static of(amount: number | Decimal, unit: Unit): Quantity {
    Preconditions.checkNotEmpty(amount, 'Value must not be empty');
    const decimalAmount = new Decimal(amount);
    return new Quantity(decimalAmount, unit);
  }

  add(other: Quantity): Quantity {
    Preconditions.checkArgument(
      this.unit.equals(other.unit),
      `Cannot add quantities with different units: ${this.unit} and ${other.unit}`,
    );
    const newAmount = this.amount.plus(other.amount);

    return new Quantity(newAmount, this.unit);
  }

  subtract(other: Quantity): Quantity {
    Preconditions.checkArgument(
      this.unit.equals(other.unit),
      `Cannot subtract quantities with different units: ${this.unit} and ${other.unit}`,
    );
    const newAmount = this.amount.minus(other.amount);

    return new Quantity(newAmount, this.unit);
  }

  compareTo(other: Quantity): number {
    Preconditions.checkArgument(
      this.unit.equals(other.unit),
      `Cannot compare quantities with different units: ${this.unit} and ${other.unit}`,
    );

    return this.amount.comparedTo(other.amount);
  }

  equals(other: Quantity): boolean {
    return this.amount.equals(other.amount) && this.unit.equals(other.unit);
  }

  toString(): string {
    return `${this.amount} ${this.unit}`;
  }
}
