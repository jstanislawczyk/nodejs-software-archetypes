import { Decimal } from 'decimal.js';
import {
  BaseFeatureValueConstraint,
  type FeatureValueConstraint,
} from './feature-value-constraint.js';
import { Preconditions } from '@/common/preconditions.js';
import { FeatureValueType } from '../feature-value-type.js';

export class DecimalRangeConstraint extends BaseFeatureValueConstraint {
  private readonly rawMin: Decimal;
  private readonly rawMax: Decimal;

  private constructor(min: Decimal, max: Decimal) {
    super();

    Preconditions.checkArgument(min != null, 'min must be defined');
    Preconditions.checkArgument(max != null, 'max must be defined');
    Preconditions.checkArgument(
      min.lte(max),
      'min must be less than or equal to max',
    );

    this.rawMin = min;
    this.rawMax = max;
  }

  static of(min: string, max: string): DecimalRangeConstraint {
    return new DecimalRangeConstraint(new Decimal(min), new Decimal(max));
  }

  static between(min: Decimal, max: Decimal): FeatureValueConstraint {
    return new DecimalRangeConstraint(min, max);
  }

  valueType(): FeatureValueType {
    return FeatureValueType.DECIMAL;
  }

  type(): string {
    return 'DECIMAL_RANGE';
  }

  isValid(value: unknown): boolean {
    if (!(value instanceof Decimal)) {
      return false;
    }

    return value.gte(this.rawMin) && value.lte(this.rawMax);
  }

  desc(): string {
    return `decimal between ${this.rawMin.toString()} and ${this.rawMax.toString()}`;
  }

  min(): Decimal {
    return this.rawMin;
  }

  max(): Decimal {
    return this.rawMax;
  }
}
