import { IllegalArgumentException } from './errors/illegal-argument.exception.js';
import { IllegalStateException } from './errors/illegal-state.exception.js';

export class Preconditions {
  public static checkArgument(expression: boolean, errorMessage: string): void {
    if (!expression) {
      throw new IllegalArgumentException(errorMessage);
    }
  }

  public static checkState(expression: boolean, errorMessage: string): void {
    if (!expression) {
      throw new IllegalStateException(errorMessage);
    }
  }

  public static checkNotEmpty(value: unknown, errorMessage: string): void {
    this.checkArgument(value !== null, errorMessage);
  }
}
