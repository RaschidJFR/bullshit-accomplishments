require('./job-title');
const verbs = require('./lists/power_verbs.json').map(e => e.toLowerCase());
const adjectives = require('./lists/adjectives.json').map(e => e.toLowerCase());
const adverbs = require('./lists/adverbs.json').map(e => e.toLowerCase());
const terms = require('./lists/terms.json').map(e => e.toLowerCase());
const metrics = require('./lists/metrics.json').map(e => e.toLowerCase());
const units = ['k USD', 'M USD', '%', '%'];
const preps = ['of', 'up to', 'about', 'by', 'nearly'];

/**
 * @param {string[]} arr
 */
function getRandomElement(arr) {
  const n = Math.floor(Math.random() * arr.length);
  return arr[n];
}

function randomize() {
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

  updateOutput();
}

function updateOutput() {
  const verb1 = $('#verb1').val() || '';
  const adjective = $('#adjective').val() || '';
  const term = $('#term').val() || '';
  const adverb = $('#adverb').val() || '';
  const verb2 = $('#verb2').val() || '';
  const metric = $('#metric').val() || '';
  const amount = $('#amount').val() || '';
  const unit = $('#unit').val() || '';
  const prep = getRandomElement(preps);
  const _ = '______'

  const invalid = (!verb1 || !adjective || !term || !adverb || !verb2 || !metric || !amount || !unit || !preps);
  $('.btn#add').prop('disabled', invalid);

  const text = `${verb1 || _} ${adjective || _} ${term || _} and `
    + `${adverb || _} ${verb2 || _} ${metric || _} ${prep || _} ${amount || _}${unit || _}`;
  $('#output').val(text);
}

/**
 * @param {string} text 
 */
function appendBullet(text) {
  $('ul').append(`<li>${text}</li>`)
}

function init() {
  verbs.sort((a, b) => a > b ? 1 : -1).forEach(v => $("#verb1, #verb2").append(new Option(v, v)));
  adjectives.sort((a, b) => a > b ? 1 : -1).forEach(v => $("#adjective").append(new Option(v, v)));
  terms.sort((a, b) => a > b ? 1 : -1).forEach(v => $("#term").append(new Option(v, v)));
  adverbs.sort((a, b) => a > b ? 1 : -1).forEach(v => $("#adverb").append(new Option(v, v)));
  metrics.sort((a, b) => a > b ? 1 : -1).forEach(v => $("#metric").append(new Option(v, v)));
  units.sort((a, b) => a > b ? 1 : -1).forEach(v => $("#unit").append(new Option(v, v)));

  $('.form-control').each(function(_i, element) {
    $(element).bind('change', updateOutput);
  });

  $('.btn#randomize').click(function(e) {
    e.preventDefault();
    randomize();
  });

  $('.btn#add').click(function(e) {
    e.preventDefault();
    const text = $('#output').val()
    if (text) appendBullet(text);
    $('#output').val('');
    $('.btn#add').prop('disabled', true);
  });

  $('#jobTitle').text(window.getJobTitle());
}

init();