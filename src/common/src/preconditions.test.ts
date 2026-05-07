import { it, describe } from 'node:test';
import assert from 'node:assert';
import { Preconditions } from './preconditions.js';

describe('preconditions', () => {
  describe('checkState', () => {
    it('should throw error when expression is false', () => {
      // Act & Assert
      assert.throws(() => {
        Preconditions.checkState(false, 'This should throw');
      }, /This should throw/);
    });

    it('should not throw when expression is true', () => {
      assert.equal(1, 1);
      // Act & Assert
      assert.doesNotThrow(() => {
        Preconditions.checkState(true, 'This should not throw');
      });
    });
  });

  describe('checkArgument', () => {
    it('should throw error when expression is false', () => {
      // Act & Assert
      assert.throws(() => {
        Preconditions.checkArgument(false, 'This should throw');
      }, /This should throw/);
    });

    it('should not throw when expression is true', () => {
      assert.equal(1, 1);
      // Act & Assert
      assert.doesNotThrow(() => {
        Preconditions.checkArgument(true, 'This should not throw');
      });
    });
  });

  describe('checkNotEmpty', () => {
    it('should throw error when value is undefined', () => {
      // Act & Assert
      assert.throws(() => {
        Preconditions.checkNotEmpty(undefined, 'Value must not be empty');
      }, /Value must not be empty/);
    });

    it('should throw error when value is null', () => {
      // Act & Assert
      assert.throws(() => {
        Preconditions.checkNotEmpty(null, 'Value must not be empty');
      }, /Value must not be empty/);
    });

    it('should not throw when value is empty string', () => {
      // Act & Assert
      assert.doesNotThrow(() => {
        Preconditions.checkNotEmpty('', 'Value must not be empty');
      });
    });

    it('should not throw when value is not empty', () => {
      // Act & Assert
      assert.doesNotThrow(() => {
        Preconditions.checkNotEmpty('not empty', 'Value must not be empty');
      });
    });
  });

  describe('checkNotBlank', () => {
    it('should throw error when value is undefined', () => {
      // Act & Assert
      assert.throws(() => {
        Preconditions.checkNotBlank(
          undefined as unknown as string,
          'Value must not be blank',
        );
      }, /Value must not be blank/);
    });

    it('should throw error when value is null', () => {
      // Act & Assert
      assert.throws(() => {
        Preconditions.checkNotBlank(
          null as unknown as string,
          'Value must not be blank',
        );
      }, /Value must not be blank/);
    });

    it('should throw error when value is empty string', () => {
      // Act & Assert
      assert.throws(() => {
        Preconditions.checkNotBlank('', 'Value must not be blank');
      }, /Value must not be blank/);
    });

    it('should throw error when value is whitespace', () => {
      // Act & Assert
      assert.throws(() => {
        Preconditions.checkNotBlank('   ', 'Value must not be blank');
      }, /Value must not be blank/);
    });

    it('should not throw when value is not blank', () => {
      // Act & Assert
      assert.doesNotThrow(() => {
        Preconditions.checkNotBlank('not blank', 'Value must not be blank');
      });
    });
  });
});
