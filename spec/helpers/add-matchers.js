beforeEach(() => {
  jasmine.addMatchers(
    {
      toGeneratePattern: () => {
        return require('./pattern-matcher.js');
      }
    }
  );
  jasmine.addMatchers(
    {
      toContainPair: () => {
        return require('./contain-pair-matcher.js');
      }
    }
  );
});
