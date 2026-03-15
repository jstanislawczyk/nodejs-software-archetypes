import { Preconditions } from '@/common/preconditions.js';
import type { FeatureValueType } from '../feature-value-type.js';
import { BaseFeatureValueConstraint } from './feature-value-constraint.js';

/**
 * No constraints - any value of the specified type is valid.
 * Example: any text for a free-form comment field
 *
 * Persistence config example: {} (empty)
 */
export class Unconstrained extends BaseFeatureValueConstraint {
  private readonly rawValueType: FeatureValueType;

  constructor(valueType: FeatureValueType) {
    super();

    Preconditions.checkArgument(
      valueType != null,
      'Value type must be defined',
    );

    this.rawValueType = valueType;
  }

  valueType(): FeatureValueType {
    return this.rawValueType;
  }

  type(): string {
    return 'UNCONSTRAINED';
  }

  isValid(value: unknown): boolean {
    return this.rawValueType.isInstance(value);
  }

  desc(): string {
    return `any ${this.rawValueType.name.toLowerCase()}`;
  }
}
