export class Version {
  constructor(readonly value: number) {}

  public static initial(): Version {
    return new Version(this.initialVersion);
  }

  public static of(value: number): Version {
    return new Version(value);
  }

  private static initialVersion = 0;

  toString(): string {
    return `Version[value=${this.value}]`;
  }
}
