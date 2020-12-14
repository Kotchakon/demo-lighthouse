const fs = require('fs');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const reportGenerator = require('lighthouse/lighthouse-core/report/report-generator');


function launchChromeAndRunLighthouse(url, opts, config = null) {
  return chromeLauncher.launch({ chromeFlags: opts.chromeFlags }).then(chrome => {
    opts.port = chrome.port;
    return lighthouse(url, opts, config).then(results => {

      return chrome.kill().then(() => results)
    });
  });
}

const opts = {
  chromeFlags: [
    '--show-paint-rects',
    '--headless'],
  output: ['html'],
  onlyCategories: ['performance']

};

// Usage:
launchChromeAndRunLighthouse('https://m.facebook.com/', opts).then(results => {
  // Use results!
  const html = reportGenerator.generateReport(results.lhr, 'html');
  const json = reportGenerator.generateReport(results.lhr, 'json');

  //Create Folders
  if (!fs.existsSync('./reports/perfs')) {
    console.log('no folder')
    fs.mkdirSync('./reports/perfs', { recursive: true });
  }

  //Write report html to the file
  fs.writeFile('./reports/perfs/report.html', html, (err) => {
    if (err) {
      console.error(err);
    }
  });

  //Write report json to the file
  fs.writeFile('./reports/perfs/report.json', json, (err) => {
    if (err) {
      console.error(err);
    }
  });
  
  const scoresPerformance = JSON.parse(json).categories.performance.score;
  console.log("Performance scores = " + scoresPerformance)

});



