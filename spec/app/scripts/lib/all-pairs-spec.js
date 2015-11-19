describe('AllPairs', () => {
  var AllPairs = require('../../../../app/scripts/lib/all-pairs.js');

  describe('.get', () => {
    subject('get', () => AllPairs.get(elements))

    given('elements', () => ['a']);

    it('returns', () => {
      isExpected.toContain([['a', 'a']])
    });

    describe('given two elements', () => {
      given('elements', () => ['a', 'b']);

      it('returns', () => {
        isExpected.toContain([['a', 'b']])
      });
    })

    describe('given three elements', () => {
      given('elements', () => ['a', 'b', 'c']);

      it('returns', () => {
        isExpected.toContain([['a', 'c'], ['b', 'b']])
        isExpected.toContain([['a', 'a'], ['c', 'b']])
        isExpected.toContain([['a', 'b'], ['c', 'c']])
      });
    })

    describe('given four elements', () => {
      given('elements', () => ['a', 'b', 'c', 'd']);

      it('returns', () => {
        isExpected.toContain([['a', 'c'], ['b', 'd']])
        isExpected.toContain([['a', 'd'], ['c', 'b']])
        isExpected.toContain([['a', 'b'], ['d', 'c']])
      });
    })
  });

  describe('.variance', () => {
    subject('variance', () => AllPairs.variance(group))

    given('group', () => [{points: 1}, {points: 2}, {points: 3}]);

    it('returns', () => {
      isExpected.toEqual(1/1.5)
    });
  })

  describe('smaller', () => {
    subject('smaller', () => AllPairs.smaller(groups))

    given('smaller', () => [{points: 2}, {points: 2}])

    given('groups', () => [
      [{points: 1}, {points: 3}],
      smaller,
      [{points: 2}, {points: 1}]
    ]);

    it('returns', () => {
      isExpected.toEqual(smaller)
    });

    describe('when the variance is tie', function() {
      given('smaller', () => [{points: 0}, {points: 0}])

      given('groups', () => [
        [{points: 1}, {points: 1}],
        smaller,
        [{points: 2}, {points: 2}]
      ]);

      it('returns', () => {
        isExpected.toEqual(smaller)
      });
    })
  })
});
