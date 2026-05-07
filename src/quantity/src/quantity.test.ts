import { it, describe } from 'node:test';
import assert from 'node:assert';
import { Quantity } from './quantity.js';
import { Unit } from './unit.js';
import { Decimal } from 'decimal.js';
import { IllegalArgumentException } from '@archetypes/common/errors';

describe('Quantity', () => {
  describe('creation', () => {
    it('should create quantity from Decimal', () => {
      // Arrange
      const amount = new Decimal('100.5');
      const unit = Unit.kilograms();

      // Act
      const quantity = Quantity.of(amount, unit);

      // Assert
      assert.ok(quantity.amount.equals(amount));
      assert.ok(quantity.unit.equals(unit));
    });

    it('should create quantity from number', () => {
      // Arrange
      const amount = 50.75;
      const unit = Unit.liters();

      // Act
      const quantity = Quantity.of(amount, unit);

      // Assert
      assert.ok(quantity.amount.equals(new Decimal('50.75')));
      assert.ok(quantity.unit.equals(unit));
    });

    it('should create quantity from integer', () => {
      // Arrange
      const amount = 1000;
      const unit = Unit.pieces();

      // Act
      const quantity = Quantity.of(amount, unit);

      // Assert
      assert.ok(quantity.amount.equals(new Decimal('1000')));
      assert.ok(quantity.unit.equals(unit));
    });

    it('should throw exception when amount is null', () => {
      // Arrange
      const amount = null as unknown as number;
      const unit = Unit.kilograms();

      // Act & Assert
      assert.throws(() => Quantity.of(amount, unit), IllegalArgumentException);
    });

    it('should throw exception when unit is null', () => {
      // Arrange
      const amount = new Decimal('100');
      const unit = null as unknown as Unit;

      // Act & Assert
      assert.throws(() => Quantity.of(amount, unit), IllegalArgumentException);
    });

    it('should throw exception when amount is negative', () => {
      // Arrange
      const amount = new Decimal('-10');
      const unit = Unit.kilograms();

      // Act & Assert
      assert.throws(() => Quantity.of(amount, unit), IllegalArgumentException);
    });

    it('should allow zero amount', () => {
      // Arrange
      const amount = new Decimal('0');
      const unit = Unit.pieces();

      // Act
      const quantity = Quantity.of(amount, unit);

      // Assert
      assert.ok(quantity.amount.equals(new Decimal('0')));
    });
  });

  describe('add', () => {
    it('should add quantities with same unit', () => {
      // Arrange
      const first = Quantity.of(100, Unit.kilograms());
      const second = Quantity.of(50, Unit.kilograms());

      // Act
      const result = first.add(second);

      // Assert
      assert.ok(result.amount.equals(new Decimal('150')));
      assert.ok(result.unit.equals(Unit.kilograms()));
    });

    it('should add quantities with decimal amounts', () => {
      // Arrange
      const first = Quantity.of(10.5, Unit.liters());
      const second = Quantity.of(5.25, Unit.liters());

      // Act
      const result = first.add(second);

      // Assert
      assert.ok(result.amount.equals(new Decimal('15.75')));
      assert.ok(result.unit.equals(Unit.liters()));
    });

    it('should throw exception when adding quantities with different units', () => {
      // Arrange
      const kilograms = Quantity.of(100, Unit.kilograms());
      const liters = Quantity.of(50, Unit.liters());

      // Act & Assert
      assert.throws(
        () => kilograms.add(liters),
        (error: Error) => {
          assert.ok(error instanceof IllegalArgumentException);
          assert.match(error.message, /different units/);
          return true;
        },
      );
    });
  });

  describe('subtract', () => {
    it('should subtract quantities with same unit', () => {
      // Arrange
      const first = Quantity.of(100, Unit.kilograms());
      const second = Quantity.of(30, Unit.kilograms());

      // Act
      const result = first.subtract(second);

      // Assert
      assert.ok(result.amount.equals(new Decimal('70')));
      assert.ok(result.unit.equals(Unit.kilograms()));
    });

    it('should subtract quantities with decimal amounts', () => {
      // Arrange
      const first = Quantity.of(50.75, Unit.meters());
      const second = Quantity.of(20.5, Unit.meters());

      // Act
      const result = first.subtract(second);

      // Assert
      assert.ok(result.amount.equals(new Decimal('30.25')));
      assert.ok(result.unit.equals(Unit.meters()));
    });

    it('should throw exception when subtracting quantities with different units', () => {
      // Arrange
      const meters = Quantity.of(100, Unit.meters());
      const hours = Quantity.of(5, Unit.hours());

      // Act & Assert
      assert.throws(
        () => meters.subtract(hours),
        (error: Error) => {
          assert.ok(error instanceof IllegalArgumentException);
          assert.match(error.message, /different units/);
          return true;
        },
      );
    });

    it('should throw exception when subtraction results in negative', () => {
      // Arrange
      const first = Quantity.of(50, Unit.pieces());
      const second = Quantity.of(100, Unit.pieces());

      // Act & Assert
      assert.throws(() => first.subtract(second), IllegalArgumentException);
    });
  });

  describe('equals', () => {
    it('should be equal when quantities have same amount and unit', () => {
      // Arrange
      const first = Quantity.of(100, Unit.kilograms());
      const second = Quantity.of(100, Unit.kilograms());

      // Act & Assert
      assert.ok(first.equals(second));
    });

    it('should not be equal when quantities have different amounts', () => {
      // Arrange
      const first = Quantity.of(100, Unit.kilograms());
      const second = Quantity.of(50, Unit.kilograms());

      // Act & Assert
      assert.strictEqual(first.equals(second), false);
    });

    it('should not be equal when quantities have different units', () => {
      // Arrange
      const first = Quantity.of(100, Unit.kilograms());
      const second = Quantity.of(100, Unit.liters());

      // Act & Assert
      assert.strictEqual(first.equals(second), false);
    });

    it('should be equal to itself', () => {
      // Arrange
      const quantity = Quantity.of(100, Unit.kilograms());

      // Act & Assert
      assert.ok(quantity.equals(quantity));
    });
  });

  describe('toString', () => {
    it('should have proper string representation', () => {
      // Arrange
      const quantity = Quantity.of(100.5, Unit.kilograms());

      // Act
      const result = quantity.toString();

      // Assert
      assert.strictEqual(result, '100.5 kg');
    });

    it('should handle complex unit symbols in string representation', () => {
      // Arrange
      const quantity = Quantity.of(25.5, Unit.squareMeters());

      // Act
      const result = quantity.toString();

      // Assert
      assert.strictEqual(result, '25.5 m²');
    });
  });

  describe('arithmetic operations with edge cases', () => {
    it('should handle zero in arithmetic operations', () => {
      // Arrange
      const quantity = Quantity.of(100, Unit.kilograms());
      const zero = Quantity.of(0, Unit.kilograms());

      // Act
      const addResult = quantity.add(zero);
      const subtractResult = quantity.subtract(zero);

      // Assert
      assert.ok(quantity.equals(addResult));
      assert.ok(quantity.equals(subtractResult));
    });

    it('should handle large numbers', () => {
      // Arrange
      const largeAmount = new Decimal('9999999999999.99');
      const unit = Unit.pieces();

      // Act
      const quantity = Quantity.of(largeAmount, unit);

      // Assert
      assert.ok(quantity.amount.equals(largeAmount));
      assert.ok(quantity.unit.equals(unit));
    });

    it('should handle very small decimals', () => {
      // Arrange
      const smallAmount = new Decimal('0.000001');
      const unit = Unit.kilograms();

      // Act
      const quantity = Quantity.of(smallAmount, unit);

      // Assert
      assert.ok(quantity.amount.equals(smallAmount));
    });

    it('should preserve precision in arithmetic operations', () => {
      // Arrange
      const first = Quantity.of(new Decimal('10.123456789'), Unit.meters());
      const second = Quantity.of(new Decimal('5.987654321'), Unit.meters());

      // Act
      const addResult = first.add(second);
      const subtractResult = first.subtract(second);

      // Assert
      assert.ok(addResult.amount.equals(new Decimal('16.111111110')));
      assert.ok(subtractResult.amount.equals(new Decimal('4.135802468')));
    });
  });

  describe('predefined units', () => {
    it('should work with all predefined units', () => {
      // Act
      const pieces = Quantity.of(100, Unit.pieces());
      const kilograms = Quantity.of(50.5, Unit.kilograms());
      const liters = Quantity.of(25.75, Unit.liters());
      const meters = Quantity.of(10, Unit.meters());
      const squareMeters = Quantity.of(100, Unit.squareMeters());
      const cubicMeters = Quantity.of(5, Unit.cubicMeters());
      const hours = Quantity.of(8, Unit.hours());
      const minutes = Quantity.of(30, Unit.minutes());

      // Assert
      assert.ok(pieces);
      assert.ok(kilograms);
      assert.ok(liters);
      assert.ok(meters);
      assert.ok(squareMeters);
      assert.ok(cubicMeters);
      assert.ok(hours);
      assert.ok(minutes);
    });
  });

  describe('custom units', () => {
    it('should work with custom units', () => {
      // Arrange
      const customUnit = Unit.of('widget', 'widgets');
      const quantity = Quantity.of(42, customUnit);

      // Act
      const result = quantity.toString();

      // Assert
      assert.strictEqual(result, '42 widget');
      assert.ok(quantity.amount.equals(new Decimal('42')));
      assert.ok(quantity.unit.equals(customUnit));
    });
  });

  describe('immutability', () => {
    it('should maintain immutability', () => {
      // Arrange
      const original = Quantity.of(100, Unit.kilograms());
      const toAdd = Quantity.of(50, Unit.kilograms());

      // Act
      const result = original.add(toAdd);

      // Assert
      assert.ok(original.amount.equals(new Decimal('100')));
      assert.ok(result.amount.equals(new Decimal('150')));
      assert.notStrictEqual(original, result);
    });
  });
});
