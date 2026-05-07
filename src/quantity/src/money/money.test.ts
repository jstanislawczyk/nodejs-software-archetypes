import { it, describe } from 'node:test';
import assert from 'node:assert';
import { Money } from './money.js';
import { Percentage } from './percentage.js';
import { Decimal } from 'decimal.js';

describe('Money', () => {
  describe('creation', () => {
    it('should create money from integer amount', () => {
      // Arrange
      const amount = 100;

      // Act
      const money = Money.pln(amount);

      // Assert
      assert.strictEqual(new Decimal('100').equals(money.value()), true);
    });

    it('should create money from Decimal amount', () => {
      // Arrange
      const amount = new Decimal('99.99');

      // Act
      const money = Money.pln(amount);

      // Assert
      assert.strictEqual(amount.equals(money.value()), true);
    });

    it('should create money from number amount', () => {
      // Arrange
      const amount = 50.5;

      // Act
      const money = Money.pln(amount);

      // Assert
      assert.strictEqual(new Decimal('50.5').equals(money.value()), true);
    });

    it('should create zero PLN money', () => {
      // Act
      const money = Money.zeroPln();

      // Assert
      assert.strictEqual(new Decimal(0).equals(money.value()), true);
      assert.strictEqual(money.isZero(), true);
    });

    it('should create one PLN money', () => {
      // Act
      const money = Money.onePln();

      // Assert
      assert.strictEqual(new Decimal(1).equals(money.value()), true);
    });
  });

  describe('arithmetic', () => {
    it('should add two money amounts', () => {
      // Arrange
      const first = Money.pln(100);
      const second = Money.pln(50);

      // Act
      const result = first.add(second);

      // Assert
      assert.strictEqual(Money.pln(150).equals(result), true);
    });

    it('should subtract two money amounts', () => {
      // Arrange
      const first = Money.pln(100);
      const second = Money.pln(30);

      // Act
      const result = first.subtract(second);

      // Assert
      assert.strictEqual(Money.pln(70).equals(result), true);
    });

    it('should negate money amount', () => {
      // Arrange
      const money = Money.pln(50);

      // Act
      const result = money.negate();

      // Assert
      assert.strictEqual(Money.pln(-50).equals(result), true);
      assert.strictEqual(result.isNegative(), true);
    });

    it('should return absolute value of negative money', () => {
      // Arrange
      const negativeMoney = Money.pln(-100);

      // Act
      const result = negativeMoney.abs();

      // Assert
      assert.strictEqual(new Decimal('100').equals(result.value()), true);
      assert.strictEqual(result.isNegative(), false);
    });

    it('should return absolute value using static method', () => {
      // Arrange
      const negativeMoney = Money.pln(-75);

      // Act
      const result = Money.abs(negativeMoney);

      // Assert
      assert.strictEqual(new Decimal('75').equals(result.value()), true);
    });

    it('should divide and return quotient and remainder', () => {
      // Arrange
      const money = Money.pln(100);
      const divisor = new Decimal('3');

      // Act
      const result = money.divideAndRemainder(divisor);

      // Assert
      assert.strictEqual(result.length, 2);
      assert.strictEqual(new Decimal('33').equals(result[0].value()), true);
      assert.strictEqual(new Decimal('1').equals(result[1].value()), true);
    });

    it('should handle zero in arithmetic operations', () => {
      // Arrange
      const money = Money.pln(100);
      const zero = Money.zeroPln();

      // Act
      const addResult = money.add(zero);
      const subtractResult = money.subtract(zero);

      // Assert
      assert.strictEqual(money.equals(addResult), true);
      assert.strictEqual(money.equals(subtractResult), true);
    });

    it('should handle negative amounts in comparisons', () => {
      // Arrange
      const negative = Money.pln(-50);
      const positive = Money.pln(50);

      // Assert
      assert.strictEqual(negative.isNegative(), true);
      assert.strictEqual(positive.isNegative(), false);
      assert.strictEqual(positive.isGreaterThan(negative), true);
      assert.strictEqual(negative.isGreaterThan(positive), false);
    });
  });

  describe('predicates', () => {
    it('should return true when money is zero', () => {
      // Arrange
      const money = Money.zeroPln();

      // Assert
      assert.strictEqual(money.isZero(), true);
    });

    it('should return false when money is not zero', () => {
      // Arrange
      const money = Money.pln(1);

      // Assert
      assert.strictEqual(money.isZero(), false);
    });

    it('should return true when money is negative', () => {
      // Arrange
      const money = Money.pln(-10);

      // Assert
      assert.strictEqual(money.isNegative(), true);
    });

    it('should return false when money is positive', () => {
      // Arrange
      const money = Money.pln(10);

      // Assert
      assert.strictEqual(money.isNegative(), false);
    });

    it('should return true when first money is greater than second', () => {
      // Arrange
      const greater = Money.pln(100);
      const lesser = Money.pln(50);

      // Assert
      assert.strictEqual(greater.isGreaterThan(lesser), true);
    });

    it('should return false when first money is not greater than second', () => {
      // Arrange
      const lesser = Money.pln(50);
      const greater = Money.pln(100);

      // Assert
      assert.strictEqual(lesser.isGreaterThan(greater), false);
    });

    it('should return true when first money is greater than or equal to second', () => {
      // Arrange
      const first = Money.pln(100);
      const second = Money.pln(100);

      // Assert
      assert.strictEqual(first.isGreaterThanOrEqualTo(second), true);
    });

    it('should return true when first money is greater in greater than or equal comparison', () => {
      // Arrange
      const greater = Money.pln(150);
      const lesser = Money.pln(100);

      // Assert
      assert.strictEqual(greater.isGreaterThanOrEqualTo(lesser), true);
    });
  });

  describe('min/max', () => {
    it('should return minimum of two money amounts', () => {
      // Arrange
      const first = Money.pln(100);
      const second = Money.pln(50);

      // Act
      const result = Money.min(first, second);

      // Assert
      assert.strictEqual(second.equals(result), true);
    });

    it('should return minimum from set of money amounts', () => {
      // Arrange
      const amounts = new Set([
        Money.pln(100),
        Money.pln(25),
        Money.pln(50),
        Money.pln(75),
      ]);

      // Act
      const result = Money.minFromSet(amounts);

      // Assert
      assert.ok(result);
      assert.strictEqual(new Decimal('25').equals(result.value()), true);
    });

    it('should return undefined when min called on empty set', () => {
      // Arrange
      const emptySet = new Set<Money>();

      // Act
      const result = Money.minFromSet(emptySet);

      // Assert
      assert.strictEqual(result, undefined);
    });

    it('should return maximum of two money amounts', () => {
      // Arrange
      const first = Money.pln(100);
      const second = Money.pln(50);

      // Act
      const result = Money.max(first, second);

      // Assert
      assert.strictEqual(first.equals(result), true);
    });
  });

  describe('comparison', () => {
    it('should compare money amounts correctly', () => {
      // Arrange
      const smaller = Money.pln(50);
      const larger = Money.pln(100);
      const equal = Money.pln(50);

      // Assert
      assert.ok(smaller.compareTo(larger) < 0);
      assert.ok(larger.compareTo(smaller) > 0);
      assert.strictEqual(smaller.compareTo(equal), 0);
    });

    it('should be equal when money has same amount and currency', () => {
      // Arrange
      const first = Money.pln(100);
      const second = Money.pln(100);

      // Assert
      assert.strictEqual(first.equals(second), true);
    });

    it('should not be equal when money has different amount', () => {
      // Arrange
      const first = Money.pln(100);
      const second = Money.pln(50);

      // Assert
      assert.strictEqual(first.equals(second), false);
    });

    it('should not be equal when money has different currency', () => {
      // Arrange
      const first = Money.pln(100);
      const second = Money.usd(100);

      // Assert
      assert.strictEqual(first.equals(second), false);
    });

    it('should be equal to itself', () => {
      // Arrange
      const money = Money.pln(100);

      // Assert
      assert.strictEqual(money.equals(money), true);
    });
  });

  describe('string representation', () => {
    it('should have proper string representation', () => {
      // Arrange
      const money = Money.pln(new Decimal('123.45'));

      // Act
      const result = money.toString();

      // Assert
      assert.strictEqual(result, 'PLN 123.45');
    });

    it('should return correct value as Decimal', () => {
      // Arrange
      const expectedValue = new Decimal('99.99');
      const money = Money.pln(expectedValue);

      // Act
      const result = money.value();

      // Assert
      assert.strictEqual(expectedValue.equals(result), true);
    });
  });

  describe('multiply by percentage', () => {
    it('should multiply money by percentage', () => {
      // Arrange
      const money = Money.pln(1000);
      const percentage = Percentage.of(20); // 20%

      // Act
      const result = money.multiply(percentage);

      // Assert - 1000 * 20% = 200
      assert.strictEqual(new Decimal('200.00').equals(result.value()), true);
    });

    it('should multiply money by fifty percentage', () => {
      // Arrange
      const money = Money.pln(200);
      const percentage = Percentage.of(50); // 50%

      // Act
      const result = money.multiply(percentage);

      // Assert - 200 * 50% = 100
      assert.strictEqual(new Decimal('100.00').equals(result.value()), true);
    });

    it('should multiply money by one hundred percentage', () => {
      // Arrange
      const money = Money.pln(150);
      const percentage = Percentage.oneHundred(); // 100%

      // Act
      const result = money.multiply(percentage);

      // Assert - 150 * 100% = 150
      assert.strictEqual(new Decimal('150.00').equals(result.value()), true);
    });

    it('should multiply money by zero percentage', () => {
      // Arrange
      const money = Money.pln(500);
      const percentage = Percentage.zero(); // 0%

      // Act
      const result = money.multiply(percentage);

      // Assert - 500 * 0% = 0
      assert.strictEqual(new Decimal('0').equals(result.value()), true);
    });

    it('should multiply money by decimal percentage', () => {
      // Arrange
      const money = Money.pln(1000);
      const percentage = Percentage.of(new Decimal('12.5')); // 12.5%

      // Act
      const result = money.multiply(percentage);

      // Assert - 1000 * 12.5% = 125
      assert.strictEqual(new Decimal('125.00').equals(result.value()), true);
    });

    it('should multiply money by very small percentage', () => {
      // Arrange
      const money = Money.pln(10000);
      const percentage = Percentage.of(new Decimal('0.5')); // 0.5%

      // Act
      const result = money.multiply(percentage);

      // Assert - 10000 * 0.5% = 50
      assert.strictEqual(new Decimal('50.00').equals(result.value()), true);
    });

    it('should multiply money by percentage greater than hundred', () => {
      // Arrange
      const money = Money.pln(100);
      const percentage = Percentage.of(150); // 150%

      // Act
      const result = money.multiply(percentage);

      // Assert - 100 * 150% = 150
      assert.strictEqual(new Decimal('150.00').equals(result.value()), true);
    });

    it('should round result to two decimal places', () => {
      // Arrange
      const money = Money.pln(100);
      const percentage = Percentage.of(new Decimal('33.33')); // 33.33%

      // Act
      const result = money.multiply(percentage);

      // Assert - 100 * 33.33% = 33.33
      assert.strictEqual(new Decimal('33.33').equals(result.value()), true);
    });

    it('should multiply EUR money by percentage', () => {
      // Arrange
      const money = Money.eur(1000);
      const percentage = Percentage.of(25); // 25%

      // Act
      const result = money.multiply(percentage);

      // Assert - 1000 EUR * 25% = 250 EUR
      assert.strictEqual(new Decimal('250.00').equals(result.value()), true);
      assert.ok(
        result.toString().includes('EUR'),
        'Currency should be preserved as EUR',
      );
    });
  });

  describe('divide', () => {
    it('should divide money with default rounding', () => {
      // Arrange
      const money = Money.pln(100);
      const divisor = new Decimal('3');

      // Act
      const result = money.divide(divisor);

      // Assert - 100 / 3 = 33.33... (with default rounding)
      assert.strictEqual(result.currencyCode, 'PLN');
      assert.ok(result.value().comparedTo(new Decimal('33')) > 0);
      assert.ok(result.value().comparedTo(new Decimal('34')) < 0);
    });

    it('should divide money with specified rounding', () => {
      // Arrange
      const money = Money.pln(105);
      const divisor = new Decimal('15');

      // Act
      const result = money.divide(divisor, Decimal.ROUND_HALF_UP);

      // Assert - 105 / 15 = 7.00
      assert.strictEqual(new Decimal('7').equals(result.value()), true);
      assert.strictEqual(result.currencyCode, 'PLN');
    });

    it('should divide money preserving currency', () => {
      // Arrange
      const money = Money.eur(150);
      const divisor = new Decimal('10');

      // Act
      const result = money.divide(divisor);

      // Assert
      assert.strictEqual(result.currencyCode, 'EUR');
      assert.ok(result.value().comparedTo(new Decimal('14')) > 0);
      assert.ok(result.value().comparedTo(new Decimal('16')) < 0);
    });

    it('should divide money with different rounding modes', () => {
      // Arrange
      const money = Money.pln(100);
      const divisor = new Decimal('3');

      // Act
      const roundUp = money.divide(divisor, Decimal.ROUND_UP);
      const roundDown = money.divide(divisor, Decimal.ROUND_DOWN);
      const roundHalfUp = money.divide(divisor, Decimal.ROUND_HALF_UP);

      // Assert
      assert.strictEqual(new Decimal('33.34').equals(roundUp.value()), true);
      assert.strictEqual(new Decimal('33.33').equals(roundDown.value()), true);
      assert.strictEqual(
        new Decimal('33.33').equals(roundHalfUp.value()),
        true,
      );
    });

    it('should divide and preserve currency in arithmetic chain', () => {
      // Arrange
      const money = Money.eur(100);

      // Act
      const result = money
        .divide(new Decimal('2'))
        .multiply(new Decimal('3'))
        .divide(new Decimal('5'));

      // Assert - (100 / 2) * 3 / 5 = 50 * 3 / 5 = 150 / 5 = 30
      assert.strictEqual(result.currencyCode, 'EUR');
      assert.ok(result.value().comparedTo(new Decimal('29')) > 0);
      assert.ok(result.value().comparedTo(new Decimal('31')) < 0);
    });
  });

  describe('currency', () => {
    it('should return currency code', () => {
      // Arrange
      const pln = Money.pln(100);
      const eur = Money.eur(200);
      const usd = Money.usd(300);
      const gbp = Money.gbp(400);

      // Assert
      assert.strictEqual(pln.currencyCode, 'PLN');
      assert.strictEqual(eur.currencyCode, 'EUR');
      assert.strictEqual(usd.currencyCode, 'USD');
      assert.strictEqual(gbp.currencyCode, 'GBP');
    });

    it('should create zero money in specified currency', () => {
      // Act
      const zeroPln = Money.zero('PLN');
      const zeroEur = Money.zero('EUR');
      const zeroUsd = Money.zero('USD');

      // Assert
      assert.strictEqual(zeroPln.isZero(), true);
      assert.strictEqual(zeroPln.currencyCode, 'PLN');
      assert.strictEqual(new Decimal(0).equals(zeroPln.value()), true);

      assert.strictEqual(zeroEur.isZero(), true);
      assert.strictEqual(zeroEur.currencyCode, 'EUR');
      assert.strictEqual(new Decimal(0).equals(zeroEur.value()), true);

      assert.strictEqual(zeroUsd.isZero(), true);
      assert.strictEqual(zeroUsd.currencyCode, 'USD');
      assert.strictEqual(new Decimal(0).equals(zeroUsd.value()), true);
    });

    it('should create zero money equal to specific zero factories', () => {
      // Act
      const zeroPln = Money.zero('PLN');
      const zeroPlnFactory = Money.zeroPln();

      const zeroEur = Money.zero('EUR');
      const zeroEurFactory = Money.zeroEur();

      const zeroUsd = Money.zero('USD');
      const zeroUsdFactory = Money.zeroUsd();

      // Assert
      assert.strictEqual(zeroPlnFactory.equals(zeroPln), true);
      assert.strictEqual(zeroEurFactory.equals(zeroEur), true);
      assert.strictEqual(zeroUsdFactory.equals(zeroUsd), true);
    });
  });
});
