import { it, describe } from 'node:test';
import assert from 'node:assert';
import { Percentage } from './percentage.js';
import { IllegalArgumentException } from '@archetypes/common/errors';
import { Decimal } from 'decimal.js';

describe('Percentage', () => {
  describe('creation', () => {
    it('should create percentage from int', () => {
      // Act
      const percentage = Percentage.of(50);

      // Assert
      assert.ok(percentage);
      assert.strictEqual(
        new Decimal('50.00000').equals(percentage.value),
        true,
      );
    });

    it('should create percentage from Decimal', () => {
      // Act
      const percentage = Percentage.of(new Decimal('25.5'));

      // Assert
      assert.ok(percentage);
      assert.strictEqual(
        new Decimal('25.50000').equals(percentage.value),
        true,
      );
    });

    it('should throw exception for negative percentage', () => {
      // Act & Assert
      assert.throws(
        () => Percentage.of(new Decimal('-10')),
        IllegalArgumentException,
      );
    });
  });

  describe('factory methods', () => {
    it('should create zero percentage', () => {
      // Act
      const percentage = Percentage.zero();

      // Assert
      assert.strictEqual(new Decimal('0').equals(percentage.value), true);
    });

    it('should create one hundred percentage', () => {
      // Act
      const percentage = Percentage.oneHundred();

      // Assert
      assert.strictEqual(
        new Decimal('100.00000').equals(percentage.value),
        true,
      );
    });
  });

  describe('add', () => {
    it('should add percentages', () => {
      // Arrange
      const p1 = Percentage.of(30);
      const p2 = Percentage.of(20);

      // Act
      const result = p1.add(p2);

      // Assert
      assert.strictEqual(new Decimal('50.00000').equals(result.value), true);
    });
  });

  describe('subtract', () => {
    it('should subtract percentages', () => {
      // Arrange
      const p1 = Percentage.of(50);
      const p2 = Percentage.of(20);

      // Act
      const result = p1.subtract(p2);

      // Assert
      assert.strictEqual(new Decimal('30.00000').equals(result.value), true);
    });

    it('should subtract to near zero', () => {
      // Arrange
      const p1 = Percentage.of(10);
      const p2 = Percentage.of(10);

      // Act
      const result = p1.subtract(p2);

      // Assert
      assert.strictEqual(new Decimal('0').equals(result.value), true);
    });

    it('should throw when subtraction results in negative', () => {
      // Arrange
      const p1 = Percentage.of(10);
      const p2 = Percentage.of(20);

      // Act & Assert
      assert.throws(() => p1.subtract(p2), IllegalArgumentException);
    });
  });

  describe('multiply', () => {
    it('should multiply percentages', () => {
      // Arrange - 50% of 20% = 10%
      const p1 = Percentage.of(50);
      const p2 = Percentage.of(20);

      // Act
      const result = p1.multiply(p2);

      // Assert
      assert.strictEqual(new Decimal('10.00000').equals(result.value), true);
    });

    it('should multiply percentages with decimals', () => {
      // Arrange - 33.33% of 50% = 16.665%
      const p1 = Percentage.of(new Decimal('33.33'));
      const p2 = Percentage.of(new Decimal('50'));

      // Act
      const result = p1.multiply(p2);

      // Assert
      assert.strictEqual(new Decimal('16.66500').equals(result.value), true);
    });
  });

  describe('toString', () => {
    it('should format to string with two decimal places', () => {
      // Arrange
      const percentage = Percentage.of(new Decimal('25.5'));

      // Act
      const formatted = percentage.toString();

      // Assert
      assert.strictEqual(formatted, '25.5%');
    });

    it('should format to string without trailing zeros', () => {
      // Arrange
      const percentage = Percentage.of(50);

      // Act
      const formatted = percentage.toString();

      // Assert
      assert.strictEqual(formatted, '50%');
    });

    it('should format zero percentage', () => {
      // Arrange
      const percentage = Percentage.zero();

      // Act
      const formatted = percentage.toString();

      // Assert
      assert.strictEqual(formatted, '0%');
    });

    it('should handle very small percentages', () => {
      // Arrange
      const percentage = Percentage.of(new Decimal('0.01'));

      // Act
      const formatted = percentage.toString();

      // Assert
      assert.strictEqual(formatted, '0.01%');
    });

    it('should handle very large percentages', () => {
      // Arrange
      const percentage = Percentage.of(new Decimal('999.99'));

      // Act
      const formatted = percentage.toString();

      // Assert
      assert.strictEqual(formatted, '999.99%');
    });
  });
});
