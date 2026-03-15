/**
 * Represents a time period during which something is valid (available, active, etc.).
 * Both boundaries are optional:
 * - No from date = valid since the beginning of time
 * - No to date = valid indefinitely
 */
export class Validity {
  private readonly rawFrom: Date | undefined;
  private readonly rawTo: Date | undefined;

  private constructor(from?: Date, to?: Date) {
    if (from && to && from.getTime() > to.getTime()) {
      throw new Error('From date must be before or equal to date');
    }

    this.rawFrom = from;
    this.rawTo = to;
  }

  /**
   * Creates validity period from given date (inclusive) with no end date.
   */
  static from(from: Date): Validity {
    return new Validity(from, undefined);
  }

  /**
   * Creates validity period until given date (inclusive) with no start date.
   */
  static until(to: Date): Validity {
    return new Validity(undefined, to);
  }

  /**
   * Creates validity period between two dates (both inclusive).
   */
  static between(from: Date, to: Date): Validity {
    return new Validity(from, to);
  }

  /**
   * Creates validity period with no boundaries (always valid).
   */
  static always(): Validity {
    return new Validity(undefined, undefined);
  }

  /**
   * Checks if the given date falls within this validity period.
   */
  isValidAt(date: Date | undefined): boolean {
    if (!date) {
      return false;
    }

    const time = date.getTime();

    if (this.rawFrom && time < this.rawFrom.getTime()) {
      return false;
    }

    if (this.rawTo && time > this.rawTo.getTime()) {
      return false;
    }

    return true;
  }

  from(): Date | undefined {
    return this.rawFrom;
  }

  to(): Date | undefined {
    return this.rawTo;
  }

  equals(other: unknown): boolean {
    if (!(other instanceof Validity)) {
      return false;
    }

    const fromEqual =
      this.rawFrom?.getTime() === other.rawFrom?.getTime() ||
      (!this.rawFrom && !other.rawFrom);

    const toEqual =
      this.rawTo?.getTime() === other.rawTo?.getTime() ||
      (!this.rawTo && !other.rawTo);

    return fromEqual && toEqual;
  }

  toString(): string {
    if (!this.rawFrom && !this.rawTo) {
      return 'always';
    }

    if (!this.rawFrom) {
      return `until ${this.rawTo?.toISOString().slice(0, 10)}`;
    }

    if (!this.rawTo) {
      return `from ${this.rawFrom.toISOString().slice(0, 10)}`;
    }

    return `${this.rawFrom.toISOString().slice(0, 10)} to ${this.rawTo
      .toISOString()
      .slice(0, 10)}`;
  }
}
