const Puppeteer = require("puppeteer");
const getAvatar = async (req, res) => {
  const { twitterUsername } = req.body;
  const browser = await Puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  try {
    await page.goto(`https://twitter.com/${twitterUsername}`);
  } catch (error) {
    console.log("goto problem");
  }
  try {
    await page.waitForSelector('a[href$="/photo"] img[src]');
  } catch (error) {
    console.log("Waiting for selector problem");
  }
  try {
    const url = await page.evaluate(
      () => document.querySelector('a[href$="/photo"] img').src
    );
    await browser.close();
    res.send(url);
  } catch (error) {
    console.log("url prblem");
  }
};
module.exports = { getAvatar };
