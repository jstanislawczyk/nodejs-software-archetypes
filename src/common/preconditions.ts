import {
  IllegalArgumentException,
  IllegalStateException,
} from './errors/index.ts';

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

  public static checkNotBlank(value: string, errorMessage: string): void {
    this.checkNotEmpty(value, errorMessage);
    this.checkArgument(value.trim().length > 0, errorMessage);
  }

  public static checkNotEmpty(value: unknown, errorMessage: string): void {
    this.checkArgument(value !== null && value !== undefined, errorMessage);
  }
}
