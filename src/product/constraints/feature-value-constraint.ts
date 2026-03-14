import type { FeatureValueType } from '../feature-value-type.js';

export interface FeatureValueConstraint {
  /**
   * Returns the type of values this constraint applies to.
   */
  valueType(): FeatureValueType;

  /**
   * Returns the constraint type identifier for persistence/deserialization.
   */
  type(): string;

  /**
   * Validates whether the given value satisfies this constraint.
   */
  isValid(value: unknown): boolean;

  /**
   * Returns a human-readable description of this constraint.
   */
  desc(): string;
}

export abstract class BaseFeatureValueConstraint implements FeatureValueConstraint {
  abstract valueType(): FeatureValueType;
  abstract type(): string;
  abstract isValid(value: unknown): boolean;
  abstract desc(): string;

  /**
   * Converts the object to its String representation for persistence.
   */
  toString(value: unknown): string {
    return this.valueType().castTo(value);
  }

  /**
   * Converts a String representation to the object, applying validation.
   */
  fromString(value: string): unknown {
    const casted = this.valueType().castFrom(value);

    if (!this.isValid(casted)) {
      throw new Error(`Invalid value: '${value}'. Expected: ${this.desc()}`);
    }

    return casted;
  }
}
