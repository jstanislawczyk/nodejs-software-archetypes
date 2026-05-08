import type { TransactionId } from './transaction-id.js';
import type { TransactionType } from './transaction-type.js';
import type { TransactionAccountEntriesView } from './transaction-account-entries-view.js';

export class TransactionView {
  constructor(
    readonly id: TransactionId,
    readonly refId: TransactionId,
    readonly type: TransactionType,
    readonly occurredAt: Date,
    readonly appliesAt: Date,
    readonly entries: readonly TransactionAccountEntriesView[],
  ) {}
}
