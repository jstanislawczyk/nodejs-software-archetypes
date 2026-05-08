import { AccountId } from '../account/account-id.js';

export class CreateAccount {
  constructor(
    readonly accountId: AccountId,
    readonly name: string,
    readonly type: string,
  ) {}

  static generateAssetAccount(
    accountId?: AccountId,
    name?: string,
  ): CreateAccount {
    const accountIdToApply = accountId ?? AccountId.generate();
    return new CreateAccount(accountIdToApply, name ?? '', 'ASSET');
  }

  static generateOffBalanceAccount(
    accountId: AccountId,
    name?: string,
  ): CreateAccount {
    const accountIdToApply = accountId ?? AccountId.generate();
    return new CreateAccount(accountIdToApply, name ?? '', 'OFF_BALANCE');
  }

  static generate(type?: string, name?: string): CreateAccount {
    const accountIdToApply = AccountId.generate();
    return new CreateAccount(accountIdToApply, name ?? '', type ?? '');
  }
}
