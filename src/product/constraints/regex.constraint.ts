import { Preconditions } from '@/common/preconditions.js';
import {
  BaseFeatureValueConstraint,
  type FeatureValueConstraint,
} from './feature-value-constraint.js';
import { FeatureValueType } from '../feature-value-type.js';

export class RegexConstraint extends BaseFeatureValueConstraint {
  private readonly regex: RegExp;
  private readonly patternString: string;

  private constructor(pattern: string) {
    super();

    Preconditions.checkArgument(
      pattern != null && pattern.trim().length > 0,
      'Pattern must be defined',
    );

    this.patternString = pattern;
    this.regex = new RegExp(pattern);
  }

  static of(pattern: string): FeatureValueConstraint {
    return new RegexConstraint(pattern);
  }

  valueType(): FeatureValueType {
    return FeatureValueType.TEXT;
  }

  type(): string {
    return 'REGEX';
  }

  isValid(value: unknown): boolean {
    if (typeof value !== 'string') {
      return false;
    }
    return this.regex.test(value);
  }

  desc(): string {
    return `text matching pattern: ${this.patternString}`;
  }

  pattern(): string {
    return this.patternString;
  }
}
