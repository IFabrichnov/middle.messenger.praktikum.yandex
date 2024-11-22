type EventCallback<T extends unknown[] = any[]> = (...args: T) => void;
type EventKeys<P> = P[keyof P];

export default class EventBus<
  EventType extends Record<string, string> = Record<string, string>,
  Data extends Record<EventKeys<EventType>, unknown[]> = Record<string, any[]>
> {
  private readonly eventListeners: {
    [K in EventKeys<EventType>]?: EventCallback<Data[K]>[];
  } = {};

  on<Event extends EventKeys<EventType>>(event: Event, callback: EventCallback<Data[Event]>) {
    if (!this.eventListeners[event]) {
      this.eventListeners[event] = [];
    }
    this.eventListeners[event]?.push(callback);
  }

  off<Event extends EventKeys<EventType>>(event: Event, callback: EventCallback<Data[Event]>) {
    if (!this.eventListeners[event]) {
      console.warn(`Попытка удалить слушателя для несуществующего события: ${event}`);
      return;
    }
    this.eventListeners[event] = this.eventListeners[event]!.filter(
      (listener) => listener !== callback
    );
  }

  emit<Event extends EventKeys<EventType>>(event: Event, ...args: Data[Event]) {
    if (!this.eventListeners[event]) {
      console.warn(`Нет подписчиков на событие: ${event}`);
      return;
    }
    this.eventListeners[event]!.forEach((listener) => {
      listener(...args);
    });
  }
}

