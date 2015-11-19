describe('PairingComputer', () => {
  var Factory = require('rosie').Factory;
  var PairingComputer =
    require('../../../../app/scripts/lib/pairing-computer.js');

  subject('pairingComputer', () => new PairingComputer(pairings));

  given('cA', () => Factory.build('committer'))
  given('cB', () => Factory.build('committer'))

  given('pairing', () => Factory.build('pairing',
    {
      pilot: cA.email,
      navigator: cB.email,
      pairings: 3
    }
  ))

  given('pairings', () => ( [ pairing ] ));

  describe('#getPoints', () => {
    subject('getPoints', () => pairingComputer.getPoints(cA, cB));

    it('returns pair points', () => isExpected.toEqual(pairing.pairings));

    describe('when there is no pair', () => {
      given('pairing', () => Factory.build('pairing',
        {
          pilot: cA.email,
          navigator: 'nopair@mail'
        }
      ))

      it('returns 0 points', () => isExpected.toEqual(0));
    });

    describe('when no pairings is given', () => {
      given('pairings', () => undefined)

      it('returns 0 points', () => isExpected.toEqual(0));
    });

    describe('when there is a inverse pair', () => {

      given('pairings', () => (
        [
          {
            "pilot": cA.email,
            "navigator": cB.email,
            "pairings": 3
          },
          {
            "pilot": cB.email,
            "navigator": cA.email,
            "pairings": 2
          }
        ]
      ));

      it('returns the sum of pairings', () => isExpected.toEqual(5));
    });
  });

  describe('getBestPairs', () => {
    subject('getBestPairs', () => pairingComputer.getBestPairs(committers))

    given('cA', () => Factory.build('committer', {email: 'a'}))
    given('cB', () => Factory.build('committer', {email: 'b'}))
    given('cC', () => Factory.build('committer', {email: 'c'}))
    given('cD', () => Factory.build('committer', {email: 'd'}))

    given('committers', () => (
      [cA, cB, cC, cD]
    ));

    given('pairings', () => ( [] ));

    it('returns pairs', () => {
      expect(getBestPairs.length).toEqual(2)
      expect(getBestPairs).toContainPair({ pilot: cA, navigator: cB })
      expect(getBestPairs).toContainPair({ pilot: cC, navigator: cD })
    });

    describe('when committers is even', () => {
      given('committers', () => (
        [cA, cB, cC]
      ));

      it('returns a committer alone', () => {
        expect(getBestPairs.length).toEqual(2)
        expect(getBestPairs).toContainPair({ pilot: cA, navigator: cB })
        expect(getBestPairs).toContainPair({ pilot: cC, navigator: cC })
      });
    })

    describe('when theres pairings', () => {
      given('pairings', () => (
        [
          {
            "pilot": cA.email,
            "navigator": cB.email,
            "pairings": 1
          }
        ]
      ));

      it('returns pairs with less pointers', () => {
        expect(getBestPairs.length).toEqual(2)
        expect(getBestPairs).not.toContainPair({ pilot: cA, navigator: cB })
        expect(getBestPairs).not.toContainPair({ pilot: cB, navigator: cA })
      });

      describe('when committers is even', () => {
        given('committers', () => (
          [cA, cB, cC]
        ));

        it('returns a committer alone with less points', () => {
          expect(getBestPairs.length).toEqual(2)
          expect(getBestPairs).not.toContainPair({ pilot: cA, navigator: cB })
          expect(getBestPairs).not.toContainPair({ pilot: cB, navigator: cA })
        });
      })
    })

    describe('when theres a trick pairing', () => {
      given('pairings', () => (
        [
          {
            "pilot": cA.email,
            "navigator": cD.email,
            "pairings": 2
          },
          {
            "pilot": cB.email,
            "navigator": cC.email,
            "pairings": 2
          },
          {
            "pilot": cC.email,
            "navigator": cD.email,
            "pairings": 1
          }
        ]
      ));

      it('returns pairs with less pointers', () => {
        expect(getBestPairs.length).toEqual(2)
        expect(getBestPairs).toContainPair({ pilot: cA, navigator: cC })
        expect(getBestPairs).toContainPair({ pilot: cB, navigator: cD })
      });
    })
  });
});
