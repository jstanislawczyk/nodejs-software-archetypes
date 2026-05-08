import { it, describe } from 'node:test';
import assert from 'node:assert';
import { Validity } from './validity.js';
import dayjs from 'dayjs';

describe('Validity', () => {
  const past = dayjs('2026-01-10T12:00:00').toDate();
  const now = dayjs('2026-01-15T12:00:00').toDate();
  const future = dayjs('2026-01-20T12:00:00').toDate();
  const forever = dayjs('9999-12-31T23:59:59.999Z')
    .subtract(1, 'second')
    .toDate();
  const epoch = dayjs(0).toDate();

  describe('creation', () => {
    it('should create validity until specific date', () => {
      // Act
      const validity = Validity.until(now);

      // Assert
      assert.equal(validity.getValidFrom().valueOf(), epoch.valueOf());
      assert.equal(validity.getValidTo().valueOf(), now.valueOf());
    });

    it('should create validity from specific date', () => {
      // Act
      const validity = Validity.from(now);

      // Assert
      assert.equal(validity.getValidFrom().valueOf(), now.valueOf());
      assert.equal(
        validity.getValidTo().valueOf(),
        Validity.ALWAYS.getValidTo().valueOf(),
      );
    });

    it('should create validity between dates', () => {
      // Act
      const validity = Validity.between(past, future);

      // Assert
      assert.equal(validity.getValidFrom().valueOf(), past.valueOf());
      assert.equal(validity.getValidTo().valueOf(), future.valueOf());
    });

    it('should create always valid validity', () => {
      // Act
      const validity = Validity.always();

      // Assert
      assert.equal(validity.getValidFrom().valueOf(), epoch.valueOf());
      assert.equal(
        validity.getValidTo().valueOf(),
        Validity.ALWAYS.getValidTo().valueOf(),
      );
    });
  });

  it('should be valid at instant within range', () => {
    // Act
    const validity = Validity.between(past, future);

    // Assert
    assert.equal(validity.isValidAt(now), true);
    assert.equal(validity.isValidAt(past), true);
    assert.equal(validity.isValidAt(future), false);
  });

  it('should not be valid before valid from', () => {
    // Act
    const validity = Validity.between(now, future);

    // Assert
    assert.equal(validity.isValidAt(past), false);
  });

  it('should not be valid after valid to', () => {
    // Act
    const validity = Validity.between(past, now);

    // Assert
    assert.equal(validity.isValidAt(future), false);
  });

  it('should be always valid when created as always', () => {
    // Act
    const validity = Validity.always();

    // Assert
    assert.equal(validity.isValidAt(epoch), true);
    assert.equal(validity.isValidAt(past), true);
    assert.equal(validity.isValidAt(now), true);
    assert.equal(validity.isValidAt(future), true);
    assert.equal(validity.isValidAt(forever), true);
  });

  it('should be valid from specified date onwards', () => {
    // Act
    const validity = Validity.from(now);

    // Assert
    assert.equal(validity.isValidAt(past), false);
    assert.equal(validity.isValidAt(now), true);
    assert.equal(validity.isValidAt(future), true);
  });

  it('should be valid until specified date', () => {
    // Act
    const validity = Validity.until(now);

    // Assert
    assert.equal(validity.isValidAt(past), true);
    assert.equal(validity.isValidAt(now), false);
    assert.equal(validity.isValidAt(future), false);
  });

  it('should not have expired when always valid', () => {
    // Act
    const validity = Validity.always();

    // Assert
    assert.equal(validity.hasExpired(now), false);
    assert.equal(validity.hasExpired(future), false);
  });

  it('should have expired exactly at valid to', () => {
    // Act
    const validity = Validity.until(now);

    // Assert
    assert.equal(validity.hasExpired(past), false);
    assert.equal(validity.hasExpired(now), true);
    assert.equal(validity.hasExpired(future), true);
  });

  it('should handle instant range in the same moment', () => {
    // Act
    const validity = Validity.between(now, now);

    // Assert
    assert.equal(validity.isValidAt(now), false);
    assert.equal(validity.isValidAt(past), false);
    assert.equal(validity.isValidAt(future), false);
  });

  it('should handle epoch to max range', () => {
    // Act
    const validity = Validity.between(epoch, Validity.ALWAYS.getValidTo());

    // Assert
    assert.equal(validity.isValidAt(epoch), true);
    assert.equal(validity.isValidAt(now), true);
    assert.equal(validity.isValidAt(Validity.ALWAYS.getValidTo()), false);
  });
});
