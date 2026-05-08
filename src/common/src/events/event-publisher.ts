import type { EventHandler } from './event-handler.js';
import type { PublishedEvent } from './published-event.js';

export interface EventPublisher {
  publish(event: PublishedEvent): void;
  publish(events: PublishedEvent[]): void;
  register(eventHandler: EventHandler): void;
}
