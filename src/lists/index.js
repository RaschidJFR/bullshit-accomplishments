const verbs = require('./lists/power_verbs.json');
const adjectives = require('./lists/adjectives.json');
const adverbs = require('./lists/adverbs.json');
const terms = require('./lists/terms.json');
const metrics = require('./lists/metrics.json');
const units = ['k USD', 'M USD', '%',];

/**
 * @param {string[]} arr
 */
function getRandomElement(arr) {
  const n = Math.floor(Math.random() * arr.length);
  return arr[n];
}

function getAchievement() {
  const verb1 = getRandomElement(verbs);
  const adjective = getRandomElement(adjectives).toLowerCase();
  const term = getRandomElement(terms).toLowerCase();
  const adverb = getRandomElement(adverbs).toLowerCase();
  const verb2 = getRandomElement(verbs).toLowerCase();
  const metric = getRandomElement(metrics).toLowerCase();
  const amount = Math.round(Math.random() * 100);
  const unit = getRandomElement(units)

  return `${verb1} ${adjective} ${term} and ${adverb} ${verb2} ${metric} by ${amount}${unit}`;
}

$('.btn#generate').click(function(e) {
  e.preventDefault();
  $('#output').val(getAchievement());
});