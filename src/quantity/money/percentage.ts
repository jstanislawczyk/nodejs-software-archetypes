import { Decimal } from 'decimal.js';
import { Preconditions } from '@archetypes/common';

export class Percentage {
  private constructor(readonly value: Decimal) {
    Preconditions.checkArgument(
      value.greaterThanOrEqualTo(0),
      "Percentage can't be negative",
    );

    this.value = value.toDecimalPlaces(5, Decimal.ROUND_HALF_UP);
  }

  static of(percentage: Decimal.Value): Percentage {
    return new Percentage(new Decimal(percentage));
  }

  static ofFraction(value: number): Percentage {
    return Percentage.of(value * 100);
  }

  static oneHundred(): Percentage {
    return Percentage.of(100);
  }

  static zero(): Percentage {
    return Percentage.of(0);
  }

  public add(other: Percentage): Percentage {
    return Percentage.of(this.value.add(other.value));
  }

  public subtract(other: Percentage): Percentage {
    return Percentage.of(this.value.sub(other.value));
  }

  public multiply(other: Percentage): Percentage {
    return Percentage.of(this.value.mul(other.value).div(100));
  }

  public equals(other: Percentage): boolean {
    return this.value.eq(other.value);
  }

  public toString(): string {
    return `${this.value.toDecimalPlaces(2, Decimal.ROUND_HALF_UP).toString()}%`;
  }
}
