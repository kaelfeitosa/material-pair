describe('MaterialColors', () => {
  var MaterialColors = require('../../../../app/scripts/lib/material-colors.js');

  describe('.byIndex', () => {
    it('returns color', () => {
      var i = 0;
      for (var colorName in MaterialColors.byName) {
        expect(MaterialColors.byIndex[i]).toEqual(MaterialColors.byName[colorName]);
        i++;
      }
    });
  });

  describe('.getByHash', () => {
    subject('getByHash', () => MaterialColors.getByHash('michael', 'color'))

    given('index', () => 2);
    given('hash', () => index)

    beforeEach(() =>
      spyOn(MaterialColors, '_hashCode').and.returnValue(hash)
    );

    it('returns color', () => {
      isExpected.toEqual(MaterialColors.byIndex[index].color);
    });

    describe('when it passes length', () => {
      given('hash', () => index + MaterialColors.byIndex.length);

      it('returns same color', () => {
        isExpected.toEqual(MaterialColors.byIndex[index].color);
      });
    });
  });
});
