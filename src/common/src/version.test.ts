import { describe, it } from 'node:test';
import assert from 'node:assert';
import { Version } from './version.js';

describe('Version', () => {
  it('should create initial version with zero value', () => {
    // Act
    const version = Version.initial();

    // Assert
    assert.equal(version.value, 0);
  });

  it('should create version with specific value', () => {
    // Arrange
    const value = 42;

    // Act
    const version = Version.of(value);

    // Assert
    assert.equal(version.value, value);
  });

  it('should create version with zero value', () => {
    // Arrange
    const value = 0;

    // Act
    const version = Version.of(value);

    // Assert
    assert.equal(version.value, 0);
  });

  it('should create version with negative value', () => {
    // Arrange
    const value = -1;

    // Act
    const version = Version.of(value);

    // Assert
    assert.equal(version.value, value);
  });

  it('should create version with max safe integer value', () => {
    // Arrange
    const value = Number.MAX_SAFE_INTEGER;

    // Act
    const version = Version.of(value);

    // Assert
    assert.equal(version.value, value);
  });

  it('should create version with min safe integer value', () => {
    // Arrange
    const value = Number.MIN_SAFE_INTEGER;

    // Act
    const version = Version.of(value);

    // Assert
    assert.equal(version.value, value);
  });

  it('should be equal when versions have same value', () => {
    // Arrange
    const firstVersion = Version.of(10);
    const secondVersion = Version.of(10);

    // Act & Assert
    assert.equal(firstVersion.value, secondVersion.value);
  });

  it('should not be equal when versions have different values', () => {
    // Arrange
    const firstVersion = Version.of(10);
    const secondVersion = Version.of(20);

    // Act & Assert
    assert.notEqual(firstVersion.value, secondVersion.value);
  });

  it('should have proper to string representation', () => {
    // Arrange
    const value = 123;
    const version = Version.of(value);

    // Act
    const result = version.toString();

    // Assert
    assert.equal(result, `Version[value=${value}]`);
  });

  it('should initial version be equal to version of zero', () => {
    // Arrange
    const initialVersion = Version.initial();
    const zeroVersion = Version.of(0);

    // Act & Assert
    assert.equal(initialVersion.value, zeroVersion.value);
  });

  it('should create multiple initial versions with same value', () => {
    // Arrange
    const firstInitial = Version.initial();
    const secondInitial = Version.initial();

    // Act & Assert
    assert.equal(firstInitial.value, secondInitial.value);
    assert.equal(firstInitial.value, 0);
    assert.equal(secondInitial.value, 0);
  });
});
