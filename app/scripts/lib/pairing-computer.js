if (this == undefined) var AllPairs = require('./all-pairs.js');

function PairingComputer(pairings) {
  this.pairings = pairings || [];
};

PairingComputer.prototype.getPoints = function(pilot, navigator) {
  return this.pairings
    .filter(function(pairing) {
      return isPair(pairing, pilot, navigator);
    })
    .reduce(sumPoints, 0);
};

PairingComputer.prototype.getPairPoints = function(pair) {
  return this.getPoints(pair.pilot, pair.navigator)
};

PairingComputer.prototype.getBestPairs = function(committers) {
  if (!committers.length) return []

  committers = committers.slice(0)

  var self = this
  var allPairs = AllPairs.get(committers)
  allPairs.forEach(function(pairs){
    pairs.forEach(function(pair){
      pair.points = self.getPoints(pair[0], pair[1])
    })
  })

  var best = AllPairs.smaller(allPairs).map(function(group){
    return group.map(function(pairs) {
      var orded = pairs.sort(byName)
      return buildPair(orded[0], orded[1])
    })
  })
  return best
};

function isPair(pairing, pilot, navigator) {
  return isMatchedPair(pairing, pilot, navigator) ||
    isMatchedPair(pairing, navigator, pilot);
};

function isMatchedPair(pairing, pilot, navigator) {
  return pairing.pilot == pilot.email &&
    pairing.navigator == navigator.email;
};

function sumPoints(acumulator, pairing) {
  return acumulator += pairing.pairings;
};

function buildPair(pilot, navigator) {
  return {
    pilot: pilot,
    navigator: navigator
  }
}

var byName = function(committer1, committer2) {
  return committer1.email.localeCompare(committer2.email)
}

if (this == undefined) module.exports = PairingComputer;
