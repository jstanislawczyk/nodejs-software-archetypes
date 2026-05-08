import type { AccountMetadataView } from '../account/account-metadata-view.js';
import type { EntryView } from '../entry/entry-view.js';

export class TransactionAccountEntriesView {
  constructor(
    readonly account: AccountMetadataView,
    readonly entries: readonly EntryView[],
  ) {}
}
