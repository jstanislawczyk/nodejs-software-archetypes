import type { UUID } from 'node:crypto';

export class ReverseTransactionCommand {
  constructor(
    readonly refTransactionId: UUID,
    readonly occuredAt: Date,
    readonly appliesAt: Date,
  ) {}
}
