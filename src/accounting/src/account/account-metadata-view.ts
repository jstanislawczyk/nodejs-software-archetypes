import type { AccountId } from './account-id.js';

export class AccountMetadataView {
  constructor(
    readonly id: AccountId,
    readonly name: string,
    readonly type: string,
  ) {}
}
