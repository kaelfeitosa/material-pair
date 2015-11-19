function StairFitter(comitters) {
  var pilots = comitters ? comitters.slice(0) : []
  pilots.unshift(undefined)

  this.matrix = pilots
};

StairFitter.prototype.getMatrix = function() {
  return this.matrix;
};

StairFitter.prototype.isPilot = function(x, y) {
  return (x > 0) && (y == 0);
}

StairFitter.prototype.isNavigator = function(x, y) {
  return (x + 1) == y;
}

StairFitter.prototype.isPairing = function(x, y) {
  return (x > 0) && (y > 0) && (x >= y);
}

StairFitter.prototype.isTop = function(x, y) {
  return x == 0 && y == 0;
}

if (this == undefined) module.exports = StairFitter
