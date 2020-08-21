const {page} = require('pagewalker');
const assert = require('assert');

describe("01.BrowsePage", ()=>{

  it("1. Load dialog example page.", async ()=>{
    try {
      await page.load("http://localhost:3000");
      page.openDevTools();

    }catch(e){
      console.log("------------------------!!!!!!!!");
      console.log(e.toString().split("\n").slice(0, 10).join("\n"));
    }
  })
  it("2.", async () =>{
    try {
      await page.find("a").haveContent("Dialog").click();

      await page.waitForPageLoad();

console.log(`2.page.url: ${page.url}`);
    }catch(e){
      console.log("Oh,,, -----------------------------------------------!!!!!!!!");
      console.log(e.toString().split("\n").slice(0, 10).join("\n"));
    }
  });

  it("3. click a button with popping up 'alert' dialog", async ()=>{

console.log(`3.page.url: ${page.url}`);

    await page.waitForAlert({ message: 'This is a message.' }, async ()=>{
      await page.find("input[type=button]").haveValue("alert(1)").click();
    })
  });
});
