import { Preconditions } from '@archetypes/common';

export class Unit {
  constructor(
    private readonly symbol: string,
    private readonly name: string,
  ) {
    Preconditions.checkNotBlank(symbol, 'Symbol must not be empty');
    Preconditions.checkNotBlank(name, 'Name must not be empty');
  }

  public static of(symbol: string, name: string): Unit {
    return new Unit(symbol, name);
  }

  public static pieces(): Unit {
    return new Unit('pcs', 'pieces');
  }

  public static kilograms(): Unit {
    return new Unit('kg', 'kilograms');
  }

  public static liters(): Unit {
    return new Unit('l', 'liters');
  }

  public static meters(): Unit {
    return new Unit('m', 'meters');
  }

  public static squareMeters(): Unit {
    return new Unit('m²', 'square meters');
  }

  public static cubicMeters(): Unit {
    return new Unit('m³', 'cubic meters');
  }

  public static minutes(): Unit {
    return new Unit('min', 'minutes');
  }

  public static hours(): Unit {
    return new Unit('h', 'hours');
  }

  public static packages(): Unit {
    return new Unit('pkg', 'packages');
  }

  public static accounts(): Unit {
    return new Unit('acc', 'accounts');
  }

  public equals(other: Unit): boolean {
    return this.symbol === other.symbol && this.name === other.name;
  }

  public toString(): string {
    return this.symbol;
  }
}
