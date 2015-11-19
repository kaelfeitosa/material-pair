function AllPairs() {
};

AllPairs._extractPair = function(el, i, delta) {
  var e1 = el[i] || el[i + delta]
  var e2 = el[i + delta] || el[i]

  return [e1, e2]
}

AllPairs._rotate = function(elements) {
  var removeds = elements.splice(1, 1)
  return elements.concat(removeds)
}

AllPairs._getSimetric = function(elements, delta) {
  return function(pairs, i) {
    pairs.push(AllPairs._extractPair(elements, i, delta))
    return pairs
  }
}

AllPairs._getPairs = function(elements) {
  var half = elements.length / 2;
  return AllPairs._times(half).reduce(AllPairs._getSimetric(elements, half), [])
}

AllPairs._allPairs = function(elements) {
  return function(all) {
    all.push(AllPairs._getPairs(elements))
    elements = AllPairs._rotate(elements)
    return all
  }
}

AllPairs._times = function(size) {
  return Array.apply(null, Array(size)).map(function (x, i) { return i })
}

AllPairs._sumPoints = function(group) {
  return group.reduce(function(accum, pair) {
    return accum += pair.points
  }, 0)
}

AllPairs.get = function(elements) {
  if(elements.length == 0) return [[]]
  var el = elements.slice(0);

  if (el.length % 2) {
    el.push(null)
  }

  var count = el.length - 1;

  return AllPairs._times(count).reduce(AllPairs._allPairs(el), [])
}

AllPairs.variance = function(elements) {
  var medium = elements.reduce(function(accum, element){
    return accum += element.points
  }, 0) / elements.length

  return elements.reduce(function(accum, element){
    return accum += Math.pow(element.points - medium, 2)
  }, 0) / elements.length
}

AllPairs.smaller = function(groups) {
  groups.forEach(function(group){
    group.variance = AllPairs.variance(group)
    group.points = AllPairs._sumPoints(group)
  })

  groups.sort(function(a, b) {
    var variance = a.variance - b.variance
    if (variance) return variance
    return a.points - b.points
  })

  return groups
}

if (this == undefined) module.exports = AllPairs;
