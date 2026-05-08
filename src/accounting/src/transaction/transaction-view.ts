import type { Dayjs } from 'dayjs';
import type { TransactionId } from './transaction-id.js';
import type { TransactionType } from './transaction-type.js';
import type { TransactionAccountEntriesView } from './transaction-account-entries-view.js';

export class TransactionView {
  constructor(
    readonly id: TransactionId,
    readonly refId: TransactionId,
    readonly type: TransactionType,
    readonly occurredAt: Dayjs,
    readonly appliesAt: Dayjs,
    readonly entries: readonly TransactionAccountEntriesView[],
  ) {}
}
