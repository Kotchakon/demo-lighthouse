const lighthouseOutput = require ('./reports/perfs/report.json')
const assert = require('chai').assert;

const  performanceScore = lighthouseOutput.categories.performance.score


describe("performance", () => {
  it("performance score should be more or equal 0.90", () => {
    console.log(performanceScore)
    assert.isAtLeast(performanceScore,0.90,'Performance score should be more or equal 0.90');
  });
});