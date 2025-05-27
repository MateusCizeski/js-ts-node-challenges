function createPluginSystem() {
    const context = {
        log: console.log,
        version: '1.0.0',
        utils: {
            sum: (a, b) => a +b
        }
    };

    return function loadPlugin(pluginFn) {
        const sandbox = Object.create(context);

        pluginFn(sandbox);
    };
}

const plugin = (ctx) => {
    ctx.log('Plugin carregado');
    ctx.log('Versão:', ctx.version);
    ctx.log('Soma:', ctx.utils.sum(2, 3));
};

const load = createPluginSystem();

load(plugin);