describe('StairFitter', () => {
  var StairFitter = require('../../../../app/scripts/lib/stair-fitter.js');

  subject('stairFitter', () => new StairFitter(committers));

  given('committers', () => (
    [
      {
        'email': 'aduarte@thoughtworks.com'
      },
      {
        'email': 'narciso@thoughtworks.com'
      }
    ]
  ));

  describe('#getMatrix', () => {
    subject('getMatrix', () => stairFitter.getMatrix());

    it('returns a matrix with one more element that committers', () => {
      expect(getMatrix.length).toEqual(committers.length + 1);
    });

    it('first element is undefined', () => {
      expect(getMatrix[0]).toBeUndefined();
    });

    it('returns elements on same order', () => {
      expect(getMatrix[1]).toBe(committers[0]);
      expect(getMatrix[2]).toBe(committers[1]);
    });

    describe('when the committers is not given', () => {
      given('committers', () => undefined)

      it('returns a empty matrix', () => {
        expect(getMatrix).toEqual([undefined]);
      });
    });
  });

  describe('#isPilot', () => {
    subject('isPilot', () => stairFitter.isPilot);

    given('stair', () => (
      [
        [0, 0, 0],
        [1, 0, 0],
        [1, 0, 0]
      ]
    ));

    it('is truthy for pilot slots', () => {
      isExpected.toGeneratePattern(stair);
    });
  });

  describe('#isNavigator', () => {
    subject('isNavigator', () => stairFitter.isNavigator);

    given('stair', () => (
      [
        [0, 1, 0],
        [0, 0, 1],
        [0, 0, 0]
      ]
    ));

    it('is truthy for navigator slots', () => {
      isExpected.toGeneratePattern(stair);
    });
  });

  describe('#isPairing', () => {
    subject('isPairing', () => stairFitter.isPairing);

    given('stair', () => (
      [
        [0, 0, 0],
        [0, 1, 0],
        [0, 1, 1]
      ]
    ));

    it('is truthy for pairing slots', () => {
      isExpected.toGeneratePattern(stair);
    });
  });

  describe('#isTop', () => {
    subject('isTop', () => stairFitter.isTop);

    given('stair', () => (
      [
        [1, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ]
    ));

    it('is truthy for top slots', () => {
      isExpected.toGeneratePattern(stair);
    });
  });
});
