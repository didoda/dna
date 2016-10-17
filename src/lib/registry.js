class Registry {
    get native() {
        return self.customElements;
    }

    constructor() {
        this.components = {};
    }

    define(name, Ctr, config) {
        this.components[name.toLowerCase()] = {
            Ctr,
            config,
        };
    }

    get(name) {
        return this.components[name.toLowerCase()];
    }
}

export const registry = new Registry();