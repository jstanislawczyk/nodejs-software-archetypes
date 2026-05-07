import {
  IllegalArgumentException,
  IllegalStateException,
} from './errors/index.js';

export class Preconditions {
  static checkArgument(expression: boolean, errorMessage: string): void {
    if (!expression) {
      throw new IllegalArgumentException(errorMessage);
    }
  }

  static checkState(expression: boolean, errorMessage: string): void {
    if (!expression) {
      throw new IllegalStateException(errorMessage);
    }
  }

  static checkNotBlank(value: string, errorMessage: string): void {
    this.checkNotEmpty(value, errorMessage);
    this.checkArgument(value.trim().length > 0, errorMessage);
  }

  static checkNotEmpty(value: unknown, errorMessage: string): void {
    this.checkArgument(value !== null && value !== undefined, errorMessage);
  }
}
