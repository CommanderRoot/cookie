/**
 * Module dependencies.
 */

var benchmark = require('benchmark')
var benchmarks = require('beautify-benchmark')
var top = require('./parse-top.json')

/**
  * Globals for benchmark.js
  */

global.cookie = require('..')

var suite = new benchmark.Suite()

Object.keys(top).forEach(function (domain) {
  suite.add({
    name: 'parse ' + domain,
    minSamples: 100,
    fn: 'var val = cookie.parse(' + JSON.stringify(top[domain]) + ')'
  })
})

suite.on('start', function onCycle (event) {
  process.stdout.write('  cookie.parse - top sites\n\n')
})

suite.on('cycle', function onCycle (event) {
  benchmarks.add(event.target)
})

suite.on('complete', function onComplete () {
  benchmarks.log()
})

suite.run({async: false})

function gencookies (num) {
  var str = ''

  for (var i = 0; i < num; i++) {
    str += '; foo' + i + '=bar'
  }

  return str.substr(2)
}
