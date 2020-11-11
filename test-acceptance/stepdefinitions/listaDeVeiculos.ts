import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

var {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(80 * 1000);

let samePlaca = ((elem, placa) => elem.element(by.name('placalist')).getText().then(text => text === placa));
let sameModelo = ((elem, modelo) => elem.element(by.name('modelolist')).getText().then(text => text === modelo));
let sameMarca = ((elem, marca) => elem.element(by.name('marcalist')).getText().then(text => text === marca));
let sameAno = ((elem, ano) => elem.element(by.name('anolist')).getText().then(text => text === ano));
let sameFuncao = ((elem, funcao) => elem.element(by.name('funcaolist')).getText().then(text => text === funcao));


let pAND = ((p,q,r,s,t) => p.then(a => q.then(b => r.then(c => s.then(d => t.then( e => (a && b && c && d && e) ))))))


defineSupportCode(function ({ Given, When, Then }) {

    Given(/^I am at the vehiclesList page$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('Upen');
        await $("a[name='ListaVeiculos']").click();
    });   

    Given(/^I cannot see a vehicle with registration plate "([^\"]*)" in the vehicles list$/, async (plate) => {
        var allPlates : ElementArrayFinder = element.all(by.name('placalist'));
        var sameplates = allPlates.filter(elem =>
                                      elem.getText().then(text => text === plate));
        await sameplates.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));
    });

    
    When(/^I try to register vehicle "([^\"]*)" with year "(\d*)", brand "([^\"]*)", function "([^\"]*)" and plate "([^\"]*)"$/, async (modelo, ano, marca, funcao, placa) => {
        await element(by.name('botaoInserir')).click();

        await $("input[name='placabox']").sendKeys(<string> placa);
        await $("input[name='modelobox']").sendKeys(<string> modelo);
        await $("input[name='marcabox']").sendKeys(<string> marca);
        await $("input[name='anobox']").sendKeys(<string>  ano);
        await $("input[name='funcaobox']").sendKeys(<string> funcao);

        await element(by.name('botaoCadastrar')).click();
    });

    Then(/^I can see vehicle "([^\"]*)" with year "(\d*)", brand "([^\"]*)", function "([^\"]*)" and plate "([^\"]*)" in the vehicles list$/, async (modelo, ano, marca, funcao, placa) => {
        var allvehicles : ElementArrayFinder = element.all(by.name('vehiclelist'));

        await allvehicles.filter(elem => pAND(samePlaca(elem,placa),sameModelo(elem,modelo),sameMarca(elem,marca), sameAno(elem, ano), sameFuncao(elem, funcao))).then
                   (elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });

})