import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let fs = require('fs');
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

defineSupportCode(function ({Given, When, Then}) {
    Given(/^I'm in page of vehicle with plate "([^\"]*)"$/, async (plate) => {
        await browser.get("http://localhost:4200/veiculos/" + plate)
    })

    When(/^I click on the button "([^\"]*)"$/, async(textBtn) => {
        await element.all(by.name('deletar-btn')).click();
    })

    Then(/^I can see an alert "([^\"]*)"$/, async (text) => {
        browser.sleep(4000);
        await expect((await (browser.switchTo().alert())).getText()).to.eventually.equal(text);
        browser.navigate().refresh();
        (await browser.switchTo().alert()).accept().catch(function(ex){

        });
    })

})

