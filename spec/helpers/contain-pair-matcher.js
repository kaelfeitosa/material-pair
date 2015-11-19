function format(pairs, pair) {
  var errors = pairs.map(formatPair)

  return `Expected pairs [ \n\t${errors.join(',\n\t')} \n] \nto contain pair: \n\t${formatPair(pair)}`
}

function formatPair(pair) {
  return `{pilot: ${pair.pilot.email}, navigator: ${pair.navigator.email}}`
}

var ContainPairMatcher = {
  compare: (actual, expected) => {

    var found = actual.findIndex((p) => {
      return p.pilot.email == expected.pilot.email &&
        p.navigator.email == expected.navigator.email
    }) != -1

    var result = {
      pass: found
    };

    if (!result.pass) {
      result.message = format(actual, expected);
    };
    return result;
  }
};

module.exports = ContainPairMatcher;
