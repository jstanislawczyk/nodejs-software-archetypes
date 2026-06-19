import { Preconditions } from '@archetypes/common';

export class AccountName {
  private static readonly DEFAULT_DELIMITER = ':';

  private constructor(readonly value: string) {
    Preconditions.checkNotBlank(value, 'Account name cannot be blank');
  }

  static of(value: string): AccountName {
    return new AccountName(value);
  }

  static compositeFrom(...components: string[]): AccountName {
    return AccountName.compositeFromWithDelimiter(
      AccountName.DEFAULT_DELIMITER,
      ...components,
    );
  }

  static compositeFromWithDelimiter(
    delimiter: string,
    ...components: string[]
  ): AccountName {
    Preconditions.checkArgument(
      components?.length > 0,
      'Account name cannot be built from an empty array',
    );

    components.forEach((value) => {
      Preconditions.checkNotBlank(
        value,
        'Account name component cannot be blank',
      );
    });

    return new AccountName(components.join(delimiter));
  }
}
