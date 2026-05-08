import { IllegalArgumentException } from '@archetypes/common';

export class MetaData {
  static readonly EMPTY = new MetaData(new Map());

  private constructor(readonly metadata: Map<string, string>) {
    this.metadata = new Map(Object.entries(metadata));
  }

  static empty(): MetaData {
    return MetaData.EMPTY;
  }

  static of(metadata: Map<string, string> | null | undefined): MetaData {
    return metadata ? new MetaData(metadata) : MetaData.EMPTY;
  }

  static fromKeyValues(...keyValues: string[]): MetaData {
    if (keyValues.length % 2 !== 0) {
      throw new IllegalArgumentException(
        'MetaData must have even number of elements (key-value pairs).',
      );
    }

    const map: Map<string, string> = new Map();

    for (let i = 0; i < keyValues.length; i += 2) {
      const keyValue = keyValues[i];

      if (!keyValue) {
        throw new IllegalArgumentException(
          `MetaData key at index ${i} is empty.`,
        );
      }

      const nextKeyValue = keyValues[i + 1];

      if (!nextKeyValue) {
        throw new IllegalArgumentException(
          `MetaData value at index ${i + 1} is empty.`,
        );
      }

      map.set(keyValue, nextKeyValue);
    }

    return new MetaData(map);
  }
}
