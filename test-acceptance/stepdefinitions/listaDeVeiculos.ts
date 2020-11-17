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

let check = ((p) => p.then( a => a))

let pAND = ((p,q,r,s,t) => p.then(a => q.then(b => r.then(c => s.then(d => t.then( e => (a && b && c && d && e) ))))))

let register = (async( placa:string , modelo:string, marca:string, ano:string, funcao:string) => {
    await element(by.name('botaoInserir')).click();

    await $("input[name='placabox']").sendKeys(<string> placa);
    await $("input[name='modelobox']").sendKeys(<string> modelo);
    await $("input[name='marcabox']").sendKeys(<string> marca);
    await $("input[name='anobox']").sendKeys(<string>  ano);
    await $("input[name='funcaobox']").sendKeys(<string> funcao);

    await element(by.name('botaoCadastrar')).click();
})

let openUpen = async () => {
    await browser.get("http://localhost:4200/");
    await expect(browser.getTitle()).to.eventually.equal('Upen');
}

let GoToVehicleList = async () =>{
    await openUpen();
    await $("a[name='ListaVeiculos']").click();
}

let deleteVehicle = async(placa) => {
    var allveiculos : ElementArrayFinder = element.all(by.name('vehiclelist'));// FINISH HERE  

    var vehicleInfo = allveiculos.filter(elem => check(samePlaca(elem, placa))); // verify whether you really need to use the check function

    await vehicleInfo.all(by.name('removerButton')).click();
}


defineSupportCode(function ({ Given, When, Then }) {

    Given(/^I am at the "Vehicles List" page$/, async () => {
        await GoToVehicleList();
    });   

    Given(/^I cannot see a vehicle with registration plate "([^\"]*)" in the vehicles list$/, async (plate) => {
        var allPlates : ElementArrayFinder = element.all(by.name('placalist'));
        var sameplates = allPlates.filter(elem =>
                                      elem.getText().then(text => text === plate));
        await sameplates.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));
    });

    
    When(/^I try to register vehicle "([^\"]*)" with year "(\d*)", brand "([^\"]*)", function "([^\"]*)" and plate "([^\"]*)"$/, async (modelo, ano, marca, funcao, placa) => {
        await register( placa.toString(), modelo.toString(), marca.toString(), ano.toString(), funcao.toString());
    });

    Then(/^I can see vehicle "([^\"]*)" with year "(\d*)", brand "([^\"]*)", function "([^\"]*)" and plate "([^\"]*)" in the vehicles list$/, async (modelo, ano, marca, funcao, placa) => {
        var allvehicles : ElementArrayFinder = element.all(by.name('vehiclelist'));

        await allvehicles.filter(elem => pAND(samePlaca(elem,placa),sameModelo(elem,modelo),sameMarca(elem,marca), sameAno(elem, ano), sameFuncao(elem, funcao))).then
                   (elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });

    
    Given(/^I can see a vehicle with registration plate "([^\"]*)" in the vehicles list$/, async (placa) => {

        await register( placa.toString(), "Fusca", "Volkswagen", "2010", "Revisão");

        await element(by.name('botaoFecharPopUp')).click();

        var allplacas : ElementArrayFinder = element.all(by.name('placalist'));
        var sameplacas = allplacas.filter(elem =>
                                      elem.getText().then(text => text === placa));
        await sameplacas.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });


    When(/^I try to delete vehicle with plate "([^\"]*)"$/, async(placa) =>{
        await deleteVehicle(placa);
    });

    Then(/^I can no longer see vehicle with plate "([^\"]*)" in the vehicles list$/, async (placa) => {
        var allveiculos : ElementArrayFinder = element.all(by.name('vehiclelist'));
        var sameplacas = allveiculos.filter(elem =>
            elem.getText().then(text => text === placa));
        await sameplacas.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));    
    });

    Given(/^I am at the "VihecleTrashList" page$/, async () => {
        //await element(by.name('botaoInserir')).click();

        await element(by.name('LixeiraVeiculos')).click();
    });

    Given(/^Vehicle with registration plate "([^\"]*)" is in the "VihecleTrashList"$/, async (placa)=>{
        await GoToVehicleList();
        await register(placa.toString(), "488", "Ferrari", "2020", "Tunagem");
        await element(by.name('botaoFecharPopUp')).click();
        await deleteVehicle(placa);
    })

    When(/^I try to restore the vehicle with plate "([^\"]*)"$/, async (placa) => {

        var allveiculos : ElementArrayFinder = element.all(by.name('vehicleTrashList'));// FINISH HERE  

        var vehicleInfo = allveiculos.filter(elem => check(samePlaca(elem, placa))); // verify whether you really need to use the check function
    
        await vehicleInfo.all(by.name('restoreButton')).click();


    });

    Then(/^I can no longer see vehicle with plate "([^\"]*)" in the "VihecleTrashList"$/, async (placa) =>{
        var allveiculos : ElementArrayFinder = element.all(by.name('vehicleTrashList'));
        var sameplacas = allveiculos.filter(elem =>
            elem.getText().then(text => text === placa));
        await sameplacas.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));   
    })


    Given(/^all other vehicles in the list do not have "([^\"]*)" in their text fields$/,async (placa) =>{
        var allveiculos : ElementArrayFinder = element.all(by.name('vehiclelist'));
        var sameplacas = allveiculos.filter(elem =>
            elem.getText().then(text => text.includes(placa.toString())));
        await sameplacas.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));     
    })

    Given(/^There is only one vehicle with "([^\"]*)" in their text fields in the vehicles list$/, async(placa) =>{
        await register( placa.toString(), "Uno", "Fiat", "2014", "Revisão");

        await element(by.name('botaoFecharPopUp')).click();

        var allveiculos : ElementArrayFinder = element.all(by.name('vehiclelist'));
        var sameplacas = allveiculos.filter(elem =>
            elem.getText().then(text => text.includes(placa.toString())));
        await sameplacas.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));   
    })



    When(/^I type "([^\"]*)" in the "SearchBar"$/, async(placa) =>{
        await $("input[name='searchBar']").sendKeys(<string> placa);
    })


    Then(/^the vehicle with registration plate "([^\"]*)" is the only one displayed in the list$/, async (placa) => {
        var allveiculos : ElementArrayFinder = element.all(by.name('vehiclelist'));
        allveiculos.then( elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        var sameplacas = allveiculos.filter(elem =>
            elem.getText().then(text => text.includes(placa.toString())));
        sameplacas.then( elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    })


})