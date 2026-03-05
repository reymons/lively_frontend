type EventListener<T = any> = (data: T) => void;

type EventMap = Record<string, any>;

type EventListeners<T extends EventMap> = { [E in keyof T]?: Set<EventListener<T[E]>> };

export class EventEmitter<T extends EventMap = EventMap> {
    private readonly listeners: EventListeners<T> = {};

    on<E extends keyof T>(event: E, listener: EventListener<T[E]>) {
        const listeners = this.listeners[event] ?? new Set();
        listeners.add(listener);
        this.listeners[event] = listeners;
        return () => this.off(event, listener);
    }

    off<E extends keyof T>(event: E, listener: EventListener<T[E]>) {
        const listeners = this.listeners[event];
        if (listeners) {
            listeners.delete(listener);
            if (listeners.size === 0) {
                delete this.listeners[event];
            }
        }
    }

    emit<E extends keyof T>(event: E, data: T[E]) {
        this.listeners[event]?.forEach(listener => listener(data));
    }
}
