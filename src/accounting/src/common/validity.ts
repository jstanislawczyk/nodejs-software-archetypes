import { Preconditions } from '@archetypes/common';
import dayjs, { type Dayjs } from 'dayjs';

export class Validity {
  private static readonly MIN_DATE = dayjs(0);
  private static readonly MAX_DATE = dayjs('9999-12-31T23:59:59.999Z');

  static readonly ALWAYS = new Validity(Validity.MIN_DATE, Validity.MAX_DATE);

  readonly validFrom: Dayjs;
  readonly validTo: Dayjs;

  constructor(validFrom: Dayjs, validTo: Dayjs) {
    Preconditions.checkArgument(validFrom != null, 'validFrom must be defined');
    Preconditions.checkArgument(validTo != null, 'validTo must be defined');
    Preconditions.checkArgument(
      !validFrom.isAfter(validTo),
      'validFrom must be before or equal to validTo',
    );

    this.validFrom = validFrom;
    this.validTo = validTo;
  }

  static until(validTo: Dayjs): Validity {
    return new Validity(Validity.MIN_DATE, validTo);
  }

  static from(validFrom: Dayjs): Validity {
    return new Validity(validFrom, Validity.MAX_DATE);
  }

  static between(validFrom: Dayjs | null, validTo: Dayjs | null): Validity {
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

  isValidAt(instant: Dayjs): boolean {
    return !instant.isBefore(this.validFrom) && instant.isBefore(this.validTo);
  }

  hasExpired(instant: Dayjs): boolean {
    return !instant.isBefore(this.validTo);
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
