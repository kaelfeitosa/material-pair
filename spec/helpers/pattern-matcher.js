function newError(x, y, actual, expected) {
  return {
    x: x,
    y: y,
    actual: actual,
    expected: expected
  }
}

function validate(generator, pattern) {
  var errors = [];
  pattern.forEach((line, x) => {
    line.forEach((pattern, y) => {
      var value = generator(x, y);
      if (value != pattern) {
        errors.push(newError(x, y, value, pattern));
      }
    });
  });

  return errors;
}

function format(errors) {
  var details = errors.map(value => {
    return `at [${value.x},${value.y}]: expected ${value.expected}, actual ${value.actual}`;
  });

  return `Expected generated pattern are equal, but:\n\t${details.join('\n\t')}`
}

var PatternMatcher = {
  compare: (actual, expected) => {

    var errors = validate(actual, expected);

    var result = {
      pass: errors.length == 0
    };

    if (!result.pass) {
      result.message = format(errors);
    };
    return result;
  }
};

module.exports = PatternMatcher;
