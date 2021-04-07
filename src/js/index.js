const verbs = require('./lists/power_verbs.json').map(e => e.toLowerCase());
const adjectives = require('./lists/adjectives.json').map(e => e.toLowerCase());
const adverbs = require('./lists/adverbs.json').map(e => e.toLowerCase());
const terms = require('./lists/terms.json').map(e => e.toLowerCase());
const metrics = require('./lists/metrics.json').map(e => e.toLowerCase());
const units = ['k USD', 'M USD', '%',];

/**
 * @param {string[]} arr
 */
function getRandomElement(arr) {
  const n = Math.floor(Math.random() * arr.length);
  return arr[n];
}

function setRandomValues() {
  const verb1 = getRandomElement(verbs);
  const adjective = getRandomElement(adjectives);
  const term = getRandomElement(terms);
  const adverb = getRandomElement(adverbs);
  const verb2 = getRandomElement(verbs);
  const metric = getRandomElement(metrics);
  const amount = Math.round(Math.random() * 100);
  const unit = getRandomElement(units)

  $('#verb1').val(verb1);
  $('#adjective').val(adjective);
  $('#term').val(term);
  $('#adverb').val(adverb);
  $('#verb2').val(verb2);
  $('#metric').val(metric);
  $('#amount').val(amount);
  $('#unit').val(unit);
}

function generate() {
  $('#output').val(setRandomValues());
  update();
}

function update() {
  const verb1 = $('#verb1').val() || '';
  const adjective = $('#adjective').val() || '';
  const term = $('#term').val() || '';
  const adverb = $('#adverb').val() || '';
  const verb2 = $('#verb2').val() || '';
  const metric = $('#metric').val() || '';
  const amount = $('#amount').val() || '';
  const unit = $('#unit').val() || '';

  const text = `${verb1} ${adjective} ${term} and ${adverb} ${verb2} ${metric} by ${amount}${unit}`;
  $('#output').val(text);
}

verbs.sort((a, b) => a > b ? 1 : -1).forEach(v => $("#verb1, #verb2").append(new Option(v, v)));
adjectives.sort((a, b) => a > b ? 1 : -1).forEach(v => $("#adjective").append(new Option(v, v)));
terms.sort((a, b) => a > b ? 1 : -1).forEach(v => $("#term").append(new Option(v, v)));
adverbs.sort((a, b) => a > b ? 1 : -1).forEach(v => $("#adverb").append(new Option(v, v)));
metrics.sort((a, b) => a > b ? 1 : -1).forEach(v => $("#metric").append(new Option(v, v)));
units.sort((a, b) => a > b ? 1 : -1).forEach(v => $("#unit").append(new Option(v, v)));

$('.form-control').each(function(_i, element) {
  $(element).bind('change', update);
});

$('.btn#generate').click(function(e) {
  e.preventDefault();
  generate();
});