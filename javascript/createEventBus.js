function createEventBus() {
    const listeners = {};

    const bus = {
        on(event, callback) {
            listeners[event] ||= [];
            listeners[event].push(callback);
        },

        off(event, callback) {
            listeners[event] = (listeners[event] || [].filter(cb => cb !== callback));
        },

        emit(event, ...args) {
            (listeners[event] || []).forEach(cb => cb(...args));
        }
    };

    return new Proxy(bus, {
        get(target, prop) {
            if(prop in target) return target[prop];
            return (...args) => target.emit(prop, ...args); 
        }
    });
}

const bus = createEventBus();

bus.on('hello', (msg) => console.log('Evento:', msg));
bus.hello('Mundo');