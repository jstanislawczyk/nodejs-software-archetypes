export class FeatureValueType {
  static readonly TEXT = new FeatureValueType(
    'TEXT',
    (v: string) => v,
    (v: unknown) => v as string,
  );

  static readonly INTEGER = new FeatureValueType(
    'INTEGER',
    (v: string) => Number.parseInt(v, 10),
    (v: unknown) => String(v),
  );

  static readonly DECIMAL = new FeatureValueType(
    'DECIMAL',
    (v: string) => Number(v),
    (v: unknown) => String(v),
  );

  static readonly DATE = new FeatureValueType(
    'DATE',
    (v: string) => new Date(v),
    (v: unknown) => (v as Date).toISOString().slice(0, 10),
  );

  static readonly BOOLEAN = new FeatureValueType(
    'BOOLEAN',
    (v: string) => v === 'true',
    (v: unknown) => String(v),
  );

  private constructor(
    public readonly name: string,
    private readonly from: (value: string) => unknown,
    private readonly to: (value: unknown) => string,
  ) {}

  castFrom(value: string): unknown {
    return this.from(value);
  }

  castTo(value: unknown): string {
    return this.to(value);
  }

  isInstance(value: unknown): boolean {
    switch (this) {
      case FeatureValueType.TEXT:
        return typeof value === 'string';
      case FeatureValueType.INTEGER:
        return typeof value === 'number' && Number.isInteger(value);
      case FeatureValueType.DECIMAL:
        return typeof value === 'number';
      case FeatureValueType.DATE:
        return value instanceof Date;
      case FeatureValueType.BOOLEAN:
        return typeof value === 'boolean';
      default:
        return false;
    }
  }

  static values(): FeatureValueType[] {
    return [
      FeatureValueType.TEXT,
      FeatureValueType.INTEGER,
      FeatureValueType.DECIMAL,
      FeatureValueType.DATE,
      FeatureValueType.BOOLEAN,
    ];
  }
}
