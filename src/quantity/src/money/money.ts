import { Preconditions, type Comparable } from '@archetypes/common';
import { Decimal } from 'decimal.js';
import { Percentage } from './percentage.js';

type AcceptedAmount = Decimal | number | string;

export class Money implements Comparable<Money> {
  private readonly amount: Decimal;
  private readonly currencyCode: string;

  private constructor(amount: Decimal, currencyCode: string) {
    Preconditions.checkNotBlank(currencyCode, 'currencyCode must be defined');

    this.amount = new Decimal(amount);
    this.currencyCode = currencyCode;
  }

  static of(amount: AcceptedAmount, currencyCode: string): Money {
    const decimalAmount = this.parseToDecimal(amount);
    return new Money(decimalAmount, currencyCode);
  }

  // PLN
  static pln(amount: AcceptedAmount): Money {
    const decimalAmount = this.parseToDecimal(amount);
    return new Money(decimalAmount, 'PLN');
  }

  static zeroPln(): Money {
    return Money.pln(0);
  }

  static onePln(): Money {
    return Money.pln(1);
  }

  // EUR
  static eur(amount: AcceptedAmount): Money {
    const decimalAmount = this.parseToDecimal(amount);
    return new Money(decimalAmount, 'EUR');
  }

  static zeroEur(): Money {
    return Money.eur(0);
  }

  // GBP
  static gbp(amount: AcceptedAmount): Money {
    const decimalAmount = this.parseToDecimal(amount);
    return new Money(decimalAmount, 'GBP');
  }

  static zeroGbp(): Money {
    return Money.gbp(0);
  }

  // USD
  static usd(amount: AcceptedAmount): Money {
    const decimalAmount = this.parseToDecimal(amount);
    return new Money(decimalAmount, 'USD');
  }

  static zeroUsd(): Money {
    return Money.usd(0);
  }

  static zero(currencyCode: string): Money {
    return new Money(new Decimal(0), currencyCode);
  }

  // Utilities
  static min(one: Money, two: Money): Money {
    return one.compareTo(two) <= 0 ? one : two;
  }

  static max(one: Money, two: Money): Money {
    return one.compareTo(two) <= 0 ? two : one;
  }

  static abs(from: Money): Money {
    return from.abs();
  }

  // Arithmetic
  add(other: Money): Money {
    this.assertSameCurrencyCode(other);
    const newAmount = this.amount.add(other.amount);

    return new Money(newAmount, this.currencyCode);
  }

  subtract(other: Money): Money {
    this.assertSameCurrencyCode(other);

    const newAmount = this.amount.sub(other.amount);
    return new Money(newAmount, this.currencyCode);
  }

  negate(): Money {
    const newAmount = this.amount.neg();
    return new Money(newAmount, this.currencyCode);
  }

  abs(): Money {
    const newAmount = this.amount.abs();
    return new Money(newAmount, this.currencyCode);
  }

  multiply(multiplier: Decimal | Percentage): Money {
    if (multiplier instanceof Percentage) {
      return new Money(
        this.amount.mul(multiplier.value).div(100),
        this.currencyCode,
      );
    }

    const newAmount = this.amount.mul(multiplier);
    return new Money(newAmount, this.currencyCode);
  }

  divide(
    divisor: Decimal.Value,
    rounding: Decimal.Rounding = Decimal.ROUND_HALF_UP,
  ): Money {
    return new Money(
      this.amount.toDecimalPlaces(10).div(divisor).toDecimalPlaces(2, rounding),
      this.currencyCode,
    );
  }

  divideAndRemainder(divisor: Decimal.Value): [Money, Money] {
    const divisorDecimal = new Decimal(divisor);
    const quotient = this.amount.divToInt(divisorDecimal);
    const remainder = this.amount.mod(divisorDecimal);

    return [
      new Money(quotient, this.currencyCode),
      new Money(remainder, this.currencyCode),
    ];
  }

  // Comparison
  compareTo(other: Money): number {
    this.assertSameCurrencyCode(other);

    return this.amount.comparedTo(other.amount);
  }

  isZero(): boolean {
    return this.amount.eq(0);
  }

  isNegative(): boolean {
    return this.amount.lt(0);
  }

  isGreaterThan(other: Money): boolean {
    return this.compareTo(other) > 0;
  }

  isGreaterThanOrEqualTo(other: Money): boolean {
    return this.compareTo(other) >= 0;
  }

  equals(other: Money): boolean {
    return (
      this.currencyCode === other.currencyCode && this.amount.eq(other.amount)
    );
  }

  value(): Decimal {
    return this.amount
      .toDecimalPlaces(10, Decimal.ROUND_HALF_UP)
      .toSignificantDigits()
      .toDecimalPlaces(Math.max(this.amount.decimalPlaces() ?? 0, 0));
  }

  getCurrencyCode(): string {
    return this.currencyCode;
  }

  toString(): string {
    return `${this.currencyCode} ${this.amount.toString()}`;
  }

  private assertSameCurrencyCode(other: Money): void {
    Preconditions.checkArgument(
      this.currencyCode === other.currencyCode,
      `currencyCode mismatch: ${this.currencyCode} vs ${other.currencyCode}`,
    );
  }

  private static parseToDecimal(value: AcceptedAmount): Decimal {
    return new Decimal(value);
  }
}
