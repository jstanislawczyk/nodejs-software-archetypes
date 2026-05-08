import type { EventHandler } from './event-handler.js';
import type { EventPublisher } from './event-publisher.js';
import type { PublishedEvent } from './published-event.js';

export class InMemoryEventsPublisher implements EventPublisher {
  private readonly observers: EventHandler[] = [];

  publish(event: PublishedEvent): void;
  publish(events: PublishedEvent[]): void;
  publish(eventOrEvents: PublishedEvent | PublishedEvent[]): void {
    if (Array.isArray(eventOrEvents)) {
      eventOrEvents.forEach((event) => this.publishEvent(event));
    } else {
      this.publishEvent(eventOrEvents);
    }
  }

  register(eventHandler: EventHandler): void {
    this.observers.push(eventHandler);
  }

  private publishEvent(event: PublishedEvent): void {
    this.observers.forEach((observer) => {
      if (observer.supports(event)) {
        observer.handle(event);
      }
    });
  }
}
