global.given = (name, block) => {
  beforeEach(() => {
    var cache;
    cache = null;
    Object.defineProperty(global, name, {
      configurable: true,
      get: () => {
        return cache != null ? cache : cache = block.call(global);
      }
    });
  });
  return afterEach(() => {
    delete global[name];
  });
};

global.subject = (name, block) => {
  var _, ref;
  if (name == null) {
    name = null;
  }
  if (typeof name === 'function') {
    ref = [block, name], _ = ref[0], block = ref[1];
  }
  given('subject', block);
  if (name != null) {
    given(name, block);
  }
  given('isExpected', () => {
    return expect(subject);
  });
};
