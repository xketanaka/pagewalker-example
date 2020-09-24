const fs = require('fs');
const util = require('util');
const assert = require('assert');
const path = require('path');
const pageWalker = require('pagewalker');
const page = pageWalker.page;
const fileReadPromise = util.promisify(fs.readFile);

describe("05.File Download Example", ()=>{
  beforeEach(async ()=>{
    await page.load("http://localhost:3000");

    await page.waitForPageLoad(async ()=>{
      await page.find("a").haveContent("File download").click();
    })
  })

  it("1. file download pdf, attachment", async ()=>{

    let file = await page.waitForDownload(async ()=>{
      await page.find("#pdf-form button").click();
    })

    assert.equal(file.filename, "default.pdf");
    assert.equal(Buffer.compare(
      await fileReadPromise(file.savedFilePath),
      await fileReadPromise(path.join(__dirname, '../app/views/file_download_example/download_file.pdf'))
    ), 0);
  });

  it("2. file download pdf, inline", async ()=>{

    await page.find("#pdf-form input[type=radio]").haveValue("inline").check();

    let file = await page.waitForDownload(async ()=>{
      await page.find("#pdf-form button").click();
    })

    assert.equal(file.filename, "default.pdf");
    assert(!file.savedFilePath);

    await page.assertScreen("inline content");
  });

  it("3. file download pdf, other tab", async ()=>{

    await page.find("#pdf-form input[type=radio]").haveValue("other-inline").check();

    const newWin = await page.waitForNewWindow(async ()=>{
      await page.find("#pdf-form button").click();
    })

    await newWin.page.assertScreen("other tab content");
  });
})
