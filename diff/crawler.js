const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const outputDir = path.resolve(__dirname);
const screenshotDir = path.join(outputDir, 'screenshots');
if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

const DEFAULT_TARGET_URL = 'http://localhost:5500/admission.html';
const EDUCATION = ['high_school', 'bachelors', 'masters', 'phd'];
const PROGRAM = ['computer_science', 'business', 'engineering', 'medicine', 'law'];

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomItem(arr) {
  return arr[randomInt(0, arr.length - 1)];
}

function randomString(length = 6) {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  return Array.from({ length }, () => chars[randomInt(0, chars.length - 1)]).join('');
}

function randomPhone() {
  return `+1${randomInt(200, 999)}${randomInt(200, 999)}${randomInt(1000, 9999)}`;
}

function randomEmail() {
  return `${randomString(8)}@${randomString(5)}.com`;
}

function randomBirthdate() {
  const year = randomInt(1990, 2005);
  const month = String(randomInt(1, 12)).padStart(2, '0');
  const day = String(randomInt(10, 28)).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

async function runVisitor(visitorId, pageUrl) {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768 });

  const visitor = {
    firstName: `User${randomString(5)}`,
    lastName: `Test${randomString(4)}`,
    email: randomEmail(),
    phone: randomPhone(),
    dob: randomBirthdate(),
    education: randomItem(EDUCATION),
    gpa: (Math.random() * 1.5 + 2.5).toFixed(2),
    program: randomItem(PROGRAM),
    country: 'USA',
    city: 'SampleCity',
    message: `Auto-generated simulation user #${visitorId}`,
    terms: true
  };

  try {
    await page.goto(pageUrl, { waitUntil: 'networkidle2', timeout: 60000 });

    await page.type('#firstName', visitor.firstName);
    await page.type('#lastName', visitor.lastName);
    await page.type('#email', visitor.email);
    await page.type('#phone', visitor.phone);
    await page.type('#dob', visitor.dob);

    await page.select('#education', visitor.education);
    await page.type('#gpa', visitor.gpa);
    await page.select('#program', visitor.program);

    await page.type('#country', visitor.country);
    await page.type('#city', visitor.city);
    await page.type('#message', visitor.message);

    await page.click('#terms');

    await page.click('#submit-btn');

    await page.waitForSelector('#form-success-message', { visible: true, timeout: 15000 });

    const screenshotPath = path.join(screenshotDir, `submission-${visitorId}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });

    const logLine = `${new Date().toISOString()},${visitorId},success,${visitor.firstName},${visitor.lastName},${visitor.email},${visitor.program},${screenshotPath}\n`;
    fs.appendFileSync(path.join(outputDir, 'results.csv'), logLine);

    console.log(`Visitor ${visitorId} submitted successfully: ${visitor.email}`);
  } catch (error) {
    const failureLine = `${new Date().toISOString()},${visitorId},fail,${error.message}\n`;
    fs.appendFileSync(path.join(outputDir, 'results.csv'), failureLine);
    console.error(`Visitor ${visitorId} failed:`, error.message);
  } finally {
    await browser.close();
  }
}

(async () => {
  const visitors = 10;
  const pageUrl = process.env.TARGET_URL || process.argv[2] || DEFAULT_TARGET_URL;

  console.log(`Crawler target URL: ${pageUrl}`);

  if (!fs.existsSync(path.join(outputDir, 'results.csv'))) {
    fs.writeFileSync(path.join(outputDir, 'results.csv'), 'timestamp,visitorId,status,firstName,lastName,email,program,screenshot\n');
  }

  for (let i = 1; i <= visitors; i += 1) {
    await runVisitor(i, pageUrl);
  }

  console.log('Crawl complete. Data and screenshots are in diff/');
})();
