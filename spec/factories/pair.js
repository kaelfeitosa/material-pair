var Factory = require('rosie').Factory;

Factory.define('committer')
  .sequence('name', (i) => `committer${('0'+i).slice(-2)}`)
  .attr('email', ['name'], (name) => `${name}@mail`)


Factory.define('pair')
  .attr('pilot', (i) => Factory.build('committer'))
  .attr('navigator', (i) => Factory.build('committer'))

Factory.define('pairing')
  .sequence('pilot', (i) => `pilot${('0'+i).slice(-2)}@mail`)
  .sequence('navigator', (i) => `navigator${('0'+i).slice(-2)}@mail`)
  .attr('pairings', () => 2)
