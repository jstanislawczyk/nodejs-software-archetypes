import { Preconditions } from '@/common/preconditions.js';
import {
  BaseFeatureValueConstraint,
  type FeatureValueConstraint,
} from './feature-value-constraint.js';
import { FeatureValueType } from '../feature-value-type.js';

export class NumericRangeConstraint extends BaseFeatureValueConstraint {
  private readonly rawMin: number;
  private readonly rawMax: number;

  private constructor(min: number, max: number) {
    super();

    Preconditions.checkArgument(
      min <= max,
      'min must be less than or equal to max',
    );

    this.rawMin = min;
    this.rawMax = max;
  }

  static between(min: number, max: number): FeatureValueConstraint {
    return new NumericRangeConstraint(min, max);
  }

  valueType(): FeatureValueType {
    return FeatureValueType.INTEGER;
  }

  type(): string {
    return 'NUMERIC_RANGE';
  }

  isValid(value: unknown): boolean {
    if (typeof value !== 'number' || !Number.isInteger(value)) {
      return false;
    }

    return value >= this.rawMin && value <= this.rawMax;
  }

  desc(): string {
    return `integer between ${this.rawMin} and ${this.rawMax}`;
  }

  min(): number {
    return this.rawMin;
  }

  max(): number {
    return this.rawMax;
  }
}
