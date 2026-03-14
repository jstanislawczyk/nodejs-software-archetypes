import { Preconditions } from '@/common/preconditions.js';
import {
  BaseFeatureValueConstraint,
  type FeatureValueConstraint,
} from './feature-value-constraint.js';
import { FeatureValueType } from '../feature-value-type.js';

export class DateRangeConstraint extends BaseFeatureValueConstraint {
  private readonly rawFrom: Date;
  private readonly rawTo: Date;

  private constructor(from: Date, to: Date) {
    super();

    Preconditions.checkArgument(from != null, 'from date must be defined');
    Preconditions.checkArgument(to != null, 'to date must be defined');
    Preconditions.checkArgument(
      from.getTime() <= to.getTime(),
      'from must be before or equal to to',
    );

    this.rawFrom = from;
    this.rawTo = to;
  }

  static between(from: string, to: string): FeatureValueConstraint {
    return new DateRangeConstraint(new Date(from), new Date(to));
  }

  valueType(): FeatureValueType {
    return FeatureValueType.DATE;
  }

  type(): string {
    return 'DATE_RANGE';
  }

  isValid(value: unknown): boolean {
    if (!(value instanceof Date)) {
      return false;
    }

    const time = value.getTime();
    return time >= this.rawFrom.getTime() && time <= this.rawTo.getTime();
  }

  desc(): string {
    return `date between ${this.rawFrom.toISOString().slice(0, 10)} and ${this.rawTo
      .toISOString()
      .slice(0, 10)}`;
  }

  from(): Date {
    return this.rawFrom;
  }

  to(): Date {
    return this.rawTo;
  }
}
