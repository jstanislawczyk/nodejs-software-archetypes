import { Preconditions } from '@archetypes/common';
import type { Unit } from './unit.ts';
import { Decimal } from 'decimal.js';

export class Quantity {
  public constructor(
    private readonly amount: Decimal,
    private readonly unit: Unit,
  ) {
    Preconditions.checkNotEmpty(amount, 'Value must not be empty');
    Preconditions.checkArgument(
      amount.greaterThanOrEqualTo(0),
      'Value must be non-negative',
    );
  }

  public static of(amount: number | Decimal, unit: Unit): Quantity {
    const decimalAmount = new Decimal(amount);
    return new Quantity(decimalAmount, unit);
  }

  public add(other: Quantity): Quantity {
    Preconditions.checkArgument(
      this.unit.equals(other.unit),
      `Cannot add quantities with different units: ${this.unit} and ${other.unit}`,
    );
    const newAmount = this.amount.plus(other.amount);

    return new Quantity(newAmount, this.unit);
  }

  public subtract(other: Quantity): Quantity {
    Preconditions.checkArgument(
      this.unit.equals(other.unit),
      `Cannot subtract quantities with different units: ${this.unit} and ${other.unit}`,
    );
    const newAmount = this.amount.minus(other.amount);

    return new Quantity(newAmount, this.unit);
  }

  public compareTo(other: Quantity): number {
    Preconditions.checkArgument(
      this.unit.equals(other.unit),
      `Cannot compare quantities with different units: ${this.unit} and ${other.unit}`,
    );

    return this.amount.comparedTo(other.amount);
  }

  public toString(): string {
    return `${this.amount} ${this.unit}`;
  }
}
