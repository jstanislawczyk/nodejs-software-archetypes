import { it, describe } from 'node:test';
import assert from 'node:assert';
import { Unit } from './unit.js';
import { IllegalArgumentException } from '@archetypes/common';

describe('Unit', () => {
  describe('creation', () => {
    it('should create unit with symbol and name', () => {
      // Arrange
      const symbol = 'kg';
      const name = 'kilograms';

      // Act
      const unit = Unit.of(symbol, name);

      // Assert
      assert.strictEqual(unit.symbol, symbol);
      assert.strictEqual(unit.name, name);
    });

    it('should throw exception when symbol is null', () => {
      // Arrange
      const symbol = null as unknown as string;
      const name = 'kilograms';

      // Act & Assert
      assert.throws(() => Unit.of(symbol, name), IllegalArgumentException);
    });

    it('should throw exception when symbol is blank', () => {
      // Arrange
      const symbol = '   ';
      const name = 'kilograms';

      // Act & Assert
      assert.throws(() => Unit.of(symbol, name), IllegalArgumentException);
    });

    it('should throw exception when name is null', () => {
      // Arrange
      const symbol = 'kg';
      const name = null as unknown as string;

      // Act & Assert
      assert.throws(() => Unit.of(symbol, name), IllegalArgumentException);
    });

    it('should throw exception when name is blank', () => {
      // Arrange
      const symbol = 'kg';
      const name = '';

      // Act & Assert
      assert.throws(() => Unit.of(symbol, name), IllegalArgumentException);
    });
  });

  describe('factory methods', () => {
    it('should create pieces unit', () => {
      // Act
      const unit = Unit.pieces();

      // Assert
      assert.strictEqual(unit.symbol, 'pcs');
      assert.strictEqual(unit.name, 'pieces');
    });

    it('should create kilograms unit', () => {
      // Act
      const unit = Unit.kilograms();

      // Assert
      assert.strictEqual(unit.symbol, 'kg');
      assert.strictEqual(unit.name, 'kilograms');
    });

    it('should create liters unit', () => {
      // Act
      const unit = Unit.liters();

      // Assert
      assert.strictEqual(unit.symbol, 'l');
      assert.strictEqual(unit.name, 'liters');
    });

    it('should create meters unit', () => {
      // Act
      const unit = Unit.meters();

      // Assert
      assert.strictEqual(unit.symbol, 'm');
      assert.strictEqual(unit.name, 'meters');
    });

    it('should create square meters unit', () => {
      // Act
      const unit = Unit.squareMeters();

      // Assert
      assert.strictEqual(unit.symbol, 'm²');
      assert.strictEqual(unit.name, 'square meters');
    });

    it('should create cubic meters unit', () => {
      // Act
      const unit = Unit.cubicMeters();

      // Assert
      assert.strictEqual(unit.symbol, 'm³');
      assert.strictEqual(unit.name, 'cubic meters');
    });

    it('should create hours unit', () => {
      // Act
      const unit = Unit.hours();

      // Assert
      assert.strictEqual(unit.symbol, 'h');
      assert.strictEqual(unit.name, 'hours');
    });

    it('should create minutes unit', () => {
      // Act
      const unit = Unit.minutes();

      // Assert
      assert.strictEqual(unit.symbol, 'min');
      assert.strictEqual(unit.name, 'minutes');
    });
  });

  describe('equals', () => {
    it('should be equal when units have same symbol and name', () => {
      // Arrange
      const first = Unit.of('kg', 'kilograms');
      const second = Unit.of('kg', 'kilograms');

      // Act
      const result = first.equals(second);

      // Assert
      assert.strictEqual(result, true);
    });

    it('should not be equal when units have different symbols', () => {
      // Arrange
      const first = Unit.of('kg', 'kilograms');
      const second = Unit.of('g', 'grams');

      // Act
      const result = first.equals(second);

      // Assert
      assert.strictEqual(result, false);
    });

    it('should not be equal when units have different names', () => {
      // Arrange
      const first = Unit.of('m', 'meters');
      const second = Unit.of('m', 'miles');

      // Act
      const result = first.equals(second);

      // Assert
      assert.strictEqual(result, false);
    });

    it('should be equal to itself', () => {
      // Arrange
      const unit = Unit.kilograms();

      // Act
      const result = unit.equals(unit);

      // Assert
      assert.strictEqual(result, true);
    });
  });

  describe('toString', () => {
    it('should return symbol as string representation', () => {
      // Arrange
      const unit = Unit.of('kg', 'kilograms');

      // Act
      const result = unit.toString();

      // Assert
      assert.strictEqual(result, 'kg');
    });

    it('should return symbol for complex units', () => {
      // Arrange
      const unit = Unit.squareMeters();

      // Act
      const result = unit.toString();

      // Assert
      assert.strictEqual(result, 'm²');
    });
  });

  describe('custom units', () => {
    it('should create custom unit', () => {
      // Arrange
      const symbol = '℃';
      const name = 'degrees Celsius';

      // Act
      const unit = Unit.of(symbol, name);

      // Assert
      assert.strictEqual(unit.symbol, symbol);
      assert.strictEqual(unit.name, name);
      assert.strictEqual(unit.toString(), symbol);
    });

    it('should handle unicode symbols', () => {
      // Arrange
      const symbol = 'Ω';
      const name = 'ohm';

      // Act
      const unit = Unit.of(symbol, name);

      // Assert
      assert.strictEqual(unit.symbol, symbol);
      assert.strictEqual(unit.name, name);
    });
  });
});
