const assert = require('assert');
const pageWalker = require('pagewalker');
const page = pageWalker.page;

describe("08.Table Example", ()=>{
  beforeEach(async ()=>{
    await page.load("http://localhost:3000");

    await page.waitForPageLoad(async ()=>{
      await page.find("a").haveContent("Table").click();
    })
  })

  it("1. Inspect table", async ()=>{

    assert(await page.find('tbody td:nth-child(3)').every(el => el.textContent.trim() == "0" ));
    assert.equal(await page.find('tbody tr:first-child td:nth-child(2)').text(), "Apple");
    assert.equal(await page.find('tbody tr:nth-child(2) td:nth-child(2)').text(), "Orange");
    assert.equal(await page.find('tbody tr:nth-child(3) td:nth-child(2)').text(), "Banana");
  });
  it("2. Input and apply", async ()=>{

    for (let i = 1; i <= 8; i++) {
      await page.find(`tbody tr:nth-child(${i}) input[type=number]`).setValue(i);
    }
    
    await page.find(`form input[type=submit]`).click();
    await page.waitForPageLoad();

    assert(await page.find('tbody td:nth-child(3)').every(el => parseInt(el.textContent.trim()) > 0 ));
  });
})
