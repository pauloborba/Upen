import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

var {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(60 * 1000);


async function assertElements(n,value,type) {

    var search = "detail-"+type
    var allTexts  = await element.all(by.className(search))
    var sameRes = allTexts.filter(async elem => await elem.getText() == value);

    expect(sameRes.length).to.equal(n)

}

async function checkEntrie(elem,date,op,type,id): Promise<boolean> {
    let res = false
    let text = await elem.getText()
    text = text.split(/[ ,]+/)
    let dateEl = text[0]+" "+text[1]+" "+text[2]
    if (date == dateEl) {
        res = op == text[4] && type == text[5] && "\""+id+  "\"" == text[8]
    }
    return res
}

async function assertHistory(date,op,type,id) {
    var allTexts  = await element.all(by.css('.historico p'))
    let res = 0
    for (let i = 0; i < allTexts.length; i++) {
        await checkEntrie(allTexts[i],date,op,type,id) ? res++ : null
    }
    await expect(res).to.equal(1)

}

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

    Given(/^I'm in page “Relatorio de Pesquisa”$/, async () => {
        await browser.get('http://localhost:4200/dashboard');
        await expect(browser.getTitle()).to.eventually.equal('Upen');
    })

    Given(/^I see a pie chart with a title of “([^\"]*)”$/, async (tipoChart) => {
        if(tipoChart == "Tipos Pneus") {
            await expect(element(by.id('porcentPneuChart')).isPresent()).to.eventually.equal(true)
        }
        
    })

    When(/^I ask to the system a detailed visualization of the "([^\"]*)"$/, async (tipoChart) => {
        
        var buttons = await element.all(by.css('.graphPorcent button'))

        if(tipoChart == "Tipos Pneus") {
            await buttons[0].click()
        }
    });

    Then(/^I'm redirected to the page "([^\"]*)"$/, async (route) => {
        browser.sleep(3000)
        if (route == "Relatorio de Pesquisa") {
            await expect(browser.getCurrentUrl()).to.eventually.equal('http://localhost:4200/dashboard');
        } else if (route == "Visualização Pneus") {
            await expect(browser.getCurrentUrl()).to.eventually.equal('http://localhost:4200/dashboard/pneu');
        }
    });

    Then(/^I can visualize the total of "(\d*)" tyres registered$/, async (total) => {
        var text = await element(by.css('.detail-title h3')).getText()
        await expect(text).include(total.toString())
    })

    Then(/^A table with "(\d*)" entry with the headings "Marca", "Porcentagem", "Cadastrados", with values of "([^\"]*)", "([^\"]*)", "(\d*)"$/, async (total,marca,prt,rg) => {
        // checar se existe uma entrada do histórico com esses valores
        await assertElements(1,marca,"brand")
        await assertElements(1,prt,"por")
        await assertElements(1,rg,"length")
    })

    Then(/^I can see a history entry with the values "([^\"]*)", "([^\"]*)", "([^\"]*)", "(\d*)"$/, async (date,op,type,id) => {
        await assertHistory(date,op,type,id.toString())
        
    })


})