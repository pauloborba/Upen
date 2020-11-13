import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

var {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(60 * 1000);


defineSupportCode(function ({ Given, When, Then}) {

    Given(/^I'm in page "Geral"$/, async () => {
        await browser.get("http://localhost:4200");
        await expect(browser.getTitle()).to.eventually.equal('Upen');
    })

    Given(/^I see a option of "Generate general graph"$/, async () => {
        await expect(element(by.name('dashboard')).isPresent()).to.eventually.equal(true)
    });

    When(/^I ask to the system to generate a graph with the general data of the company$/, async () => {
        await $("a[name='dashboard']").click();
    });

    Then(/^I'm redirected to the page "Relatorio de Pesquisa"$/, async () => {
        await expect(browser.getCurrentUrl()).to.eventually.equal('http://localhost:4200/dashboard');
    });


    Then(/^I can visualize the graphic data of the company, "Historico de Registros e Remoções", "Tipo Pneus", "Tipo Veiculos"$/, async () => {
        
        await expect(element(by.id('registerChart')).isPresent()).to.eventually.equal(true)
        await expect(element(by.id('porcentPneuChart')).isPresent()).to.eventually.equal(true)
        await expect(element(by.id('porcentVeiChart')).isPresent()).to.eventually.equal(true)

    });

    Then(/^I can visualize "([^\"]*)" with value "(\d*)" in a total of "(\d*)" registered$/, async (problems, problemsLength, listLength) => {
        
        var allValues = await element.all(by.css('.problems h1'))
        var list = await element.all(by.css('.problems p'))

        if (problems == "Problemas Pneus") {
            var problemPneu = await allValues[0].getText()
            var listPneu = await list[0].getText()
            await expect(problemPneu).to.equal(problemsLength)
            await expect(listPneu).to.include(listLength.toString())
        } else {
            var problemVeic = await allValues[1].getText()
            var listVeic = await list[1].getText()
            await expect(problemVeic).to.equal(problemsLength)
            await expect(listVeic).to.include(listLength.toString())
        }

    });
})