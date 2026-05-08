import { Preconditions } from '@archetypes/common';
import dayjs, { type Dayjs } from 'dayjs';

export class Validity {
  private static readonly MIN_DATE = dayjs(0);
  private static readonly MAX_DATE = dayjs('9999-12-31T23:59:59.999Z');

  static readonly ALWAYS = new Validity(
    Validity.MIN_DATE.toDate(),
    Validity.MAX_DATE.toDate(),
  );

  private readonly validFrom: Dayjs;
  private readonly validTo: Dayjs;

  constructor(validFrom: Date, validTo: Date) {
    const parsedValidFrom = dayjs(validFrom);
    const parsedValidTo = dayjs(validTo);

    Preconditions.checkArgument(validFrom != null, 'validFrom must be defined');
    Preconditions.checkArgument(validTo != null, 'validTo must be defined');
    Preconditions.checkArgument(
      !parsedValidFrom.isAfter(parsedValidTo),
      'validFrom must be before or equal to validTo',
    );

    this.validFrom = parsedValidFrom;
    this.validTo = parsedValidTo;
  }

  static until(validTo: Date): Validity {
    return new Validity(Validity.MIN_DATE.toDate(), validTo);
  }

  static from(validFrom: Date): Validity {
    return new Validity(validFrom, Validity.MAX_DATE.toDate());
  }

  static between(validFrom: Date | null, validTo: Date | null): Validity {
    if (!validFrom && !validTo) {
      return Validity.ALWAYS;
    }

    if (!validFrom) {
      return Validity.until(validTo!);
    }

    if (!validTo) {
      return Validity.from(validFrom);
    }

    return new Validity(validFrom, validTo);
  }

  static always(): Validity {
    return Validity.ALWAYS;
  }

  getValidFrom(): Date {
    return this.validFrom.toDate();
  }

  getValidTo(): Date {
    return this.validTo.toDate();
  }

  isValidAt(instant: Date): boolean {
    const parsedInstant = dayjs(instant);
    return (
      !parsedInstant.isBefore(this.validFrom) &&
      parsedInstant.isBefore(this.validTo)
    );
  }

  hasExpired(instant: Date): boolean {
    const parsedInstant = dayjs(instant);
    return !parsedInstant.isBefore(this.validTo);
  }

  equals(other: Validity): boolean {
    return (
      this.validFrom.isSame(other.validFrom) &&
      this.validTo.isSame(other.validTo)
    );
  }

  toString(): string {
    return `[${this.validFrom.toISOString()}, ${this.validTo.toISOString()})`;
  }
}
