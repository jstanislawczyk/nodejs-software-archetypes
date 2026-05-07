import { Preconditions } from '@archetypes/common';

export class Unit {
  constructor(
    public readonly symbol: string,
    public readonly name: string,
  ) {
    Preconditions.checkNotBlank(symbol, 'Symbol must not be empty');
    Preconditions.checkNotBlank(name, 'Name must not be empty');
  }

  static of(symbol: string, name: string): Unit {
    return new Unit(symbol, name);
  }

  static pieces(): Unit {
    return new Unit('pcs', 'pieces');
  }

  static kilograms(): Unit {
    return new Unit('kg', 'kilograms');
  }

  static liters(): Unit {
    return new Unit('l', 'liters');
  }

  static meters(): Unit {
    return new Unit('m', 'meters');
  }

  static squareMeters(): Unit {
    return new Unit('m²', 'square meters');
  }

  static cubicMeters(): Unit {
    return new Unit('m³', 'cubic meters');
  }

  static minutes(): Unit {
    return new Unit('min', 'minutes');
  }

  static hours(): Unit {
    return new Unit('h', 'hours');
  }

  static packages(): Unit {
    return new Unit('pkg', 'packages');
  }

  static accounts(): Unit {
    return new Unit('acc', 'accounts');
  }

  equals(other: Unit): boolean {
    return this.symbol === other.symbol && this.name === other.name;
  }

  toString(): string {
    return this.symbol;
  }
}
