import type { UUID } from 'node:crypto';

export interface PublishedEvent {
  readonly id: UUID;
  readonly type: string;
  readonly occurredAt: Date;
}
