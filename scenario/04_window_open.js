const pageWalker = require('pagewalker');
const page = pageWalker.page;

describe("04.Window Open", ()=>{
  beforeEach(async ()=>{
    await page.load("http://localhost:3000");
  })

  it("window open example 1", async ()=>{

    // Menu Click
    await page.waitForPageLoad(async ()=>{
      await page.find("a").haveContent("Window open").click();
    })

    let window = await page.waitForNewWindow(async ()=>{
      await page.find("div.content a").indexOf(0).click();
    })
    window.page.find('div.content a').click();
  });

  it("window open example 2", async ()=>{

    // Menu Click
    await page.waitForPageLoad(async ()=>{
      await page.find("a").haveContent("Window open").click();
    })

    let window = await page.waitForNewWindow(async ()=>{
      await page.find("div.content a").indexOf(1).click();
    })
    window.page.find('div.content a').click();
  })

  it("window open example 3", async ()=>{

    // Menu Click
    await page.waitForPageLoad(async ()=>{
      await page.find("a").haveContent("Window open").click();
    })

    let window = await page.waitForNewWindow(async ()=>{
      await page.find("div.content a").indexOf(2).click();
    })
    window.page.find('div.content a').click();
  })

  it("window open example 4", async ()=>{

    // Menu Click
    await page.waitForPageLoad(async ()=>{
      await page.find("a").haveContent("Window open").click();
    })

    let window = await page.waitForNewWindow(async ()=>{
      await page.find("div.content a").indexOf(3).click();
    })
    window.page.find('div.content a').click();
  })
})
