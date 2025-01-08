const fs = require('fs');
const util = require('util');
const assert = require('assert');
const path = require('path');
const pageWalker = require('pagewalker');
const page = pageWalker.page;

describe("07.Iframe Example", ()=>{

  it("1. load iframe example page", async ()=>{
    await page.load("http://localhost:3000");
    await page.waitForPageLoad(async ()=>{
      await page.find("a").haveContent("Iframe").click();
    })
  })

  it("2. Inspect iframe", async ()=>{

    const iframePage = page.inIframe(page.find('iframe').first());
    await iframePage.waitForPageLoad();

    await iframePage.waitForPageLoad(async ()=>{
      await iframePage.find("input[name=field]").setValue("some value one");
      await iframePage.find("textarea[name=area]").setContent("some content two")
      await iframePage.find("form button").click();
    })

    assert.equal(await iframePage.find("input[name=field]").value(), 'some value one')
    assert.equal(await iframePage.find("textarea[name=area]").content(), 'some content two')
  });

  it("3. Inspect iframe through finder", async ()=>{
    const iframeFinder = page.find('iframe').first();

    assert.equal(await page.inIframe(iframeFinder).find("input[name=field]").find(elm => elm.disabled == true).count(), 1);
    assert.equal(await page.inIframe(iframeFinder).find("textarea[name=area]").find(elm => elm.disabled == true).count(), 1);

    await page.inIframe(iframeFinder).waitForPageLoad(async ()=>{
      await page.inIframe(iframeFinder).find("a").haveText('back').click();
    })

    assert.equal(await page.inIframe(iframeFinder).find("input[name=field]").find(elm => elm.disabled == true).count(), 0);
    assert.equal(await page.inIframe(iframeFinder).find("textarea[name=area]").find(elm => elm.disabled == true).count(), 0);
  });
})
