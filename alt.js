import Alt from 'alt';
import React from 'react';

class AltResolver {
  _toResolve = [];

  resolve(promise) {
    return this._toResolve.push(promise);
  }

  mapPromises() {
    return this._toResolve.map((promise) => {
      return promise;
    });
  }

  async render(Handler, locals) {
    React.renderToString(Handler, locals);
    const promises = this.mapPromises();
    await Promise.all(promises);
    const app = React.renderToString(Handler, locals);

    return app;
  }
}

class Flux extends Alt {
  constructor(config = {}) {
    super(config);
    this._resolver = new AltResolver();
  }
  resolve(result) {
    this._resolver.resolve(result);
  }
  render(handler) {
    return this._resolver.render(handler, this);
  }
}

export default new Flux();