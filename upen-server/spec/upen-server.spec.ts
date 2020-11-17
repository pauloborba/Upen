import request = require("request-promise");
import {
    closeServer
} from '../upen-server';

var base_url = "http://localhost:3000/";


describe("The server", () => {

    async function deleteMockedValues() { // deletar funcao apos validacao dos testes
        let his = []

        his.push({
            "timeStamp": "1605184823000",
            "operacao": "Cadastrou",
            "qualElemento": "Pneu",
            "id": "1"
        })

        his.push({
            "timeStamp": "1605192023000",
            "operacao": "Cadastrou",
            "qualElemento": "Pneu",
            "id": "2"
        })

        his.push({
            "timeStamp": "1605192263000",
            "operacao": "Cadastrou",
            "qualElemento": "Veiculo",
            "id": "1"
        })

        his.push({
            "timeStamp": "1605321863000",
            "operacao": "Cadastrou",
            "qualElemento": "Veiculo",
            "id": "2"
        })

        his.push({
            "timeStamp": "1605354263000",
            "operacao": "Cadastrou",
            "qualElemento": "Veiculo",
            "id": "3"
        })

        his.push({
            "timeStamp": "1605352992000",
            "operacao": "Removeu",
            "qualElemento": "Pneu",
            "id": "2"
        })

        his.push({
            "timeStamp": "1605360792000",
            "operacao": "Removeu",
            "qualElemento": "Veiculo",
            "id": "3"
        })

        for (let i = 0; i < 7; i++) {
            await request.delete(base_url +
                `historicos?id=${his[i].id}&op=${his[i].operacao}&el=${his[i].qualElemento}&tS=${his[i].timeStamp}`)
        }
    }


    var server: any;

    beforeAll(async () => {
        server = require('../upen-server')
        await deleteMockedValues() // apagar linha depois de validacao dos testes


    });

    afterAll(() => {
        server.closeServer()
    });

    it("is initially empty", () => {
        return request.get(base_url + "historicos")
            .then(body =>
                expect(body).toBe("[]")
            )
            .catch(e =>
                expect(e).toEqual(null)
            );
    })

    it("only register historics", () => {
        var historic1 = {
            "json": {
                "operacao": "Cadastrou",
                "qualElemento": "Pneu",
                "id": "1"
            }
        };
        var historic2 = {
            "json": {
                "operacao": "Cadastrou",
            }
        }

        return request.post(base_url + "historicos", historic1)
            .then(body => {
                expect(body).toEqual({
                    success: "o historico foi devidamente cadastrado."
                });
                return request.post(base_url + "historicos", historic2)
            })
            .catch(err => {
                expect(err.error).toEqual({
                    failure: 'o historico nao pode ser cadastrado'
                })
                return request.get(base_url + "historicos")
                    .then(body => {
                        let list = JSON.parse(body)
                        expect(list.length).toBe(1)
                        expect(list[0].id).toBe(historic1.json.id)
                        expect(list[0].operacao).toBe(historic1.json.operacao)
                        expect(list[0].qualElemento).toBe(historic1.json.qualElemento)
                    });
            });
    })

    it("doesn't allow register a history with operation 'Removeu' from a specific element without have a register before", () => {

        var historic1 = {
            "json": {
                "operacao": "Removeu",
                "qualElemento": "Pneu",
                "id": "2"
            }
        };

        return request.post(base_url + "historicos", historic1)
            .catch(err => {
                expect(err.error).toEqual({
                    failure: 'o historico nao pode ser cadastrado'
                })
                return request.get(base_url + "historicos")
                    .then(body => {
                        expect(body).not.toContain('"operacao": "Removeu", "qualElemento": "Pneu","id": "2"}]')
                    });
            });

    })

    it("doesn't allow register duplicate history without do the oposite operation before", () => {
        var historic1 = {
            "json": {
                "operacao": "Cadastrou",
                "qualElemento": "Pneu",
                "id": "3"
            }
        };
        var historic2 = {
            "json": {
                "operacao": "Cadastrou",
                "qualElemento": "Pneu",
                "id": "3"
            }
        }
        var historic3 = {
            "json": {
                "operacao": "Removeu",
                "qualElemento": "Pneu",
                "id": "3"
            }
        };
        var historic4 = {
            "json": {
                "operacao": "Removeu",
                "qualElemento": "Pneu",
                "id": "3"
            }
        }

        return request.post(base_url + "historicos", historic1)
            .then(body => {
                expect(body).toEqual({
                    success: "o historico foi devidamente cadastrado."
                });
                return request.post(base_url + "historicos", historic2)
            })
            .catch(err => {
                expect(err.error).toEqual({
                    failure: 'o historico nao pode ser cadastrado'
                })
                return request.get(base_url + "historicos")
                    .then(body => {
                        let list = JSON.parse(body)
                        list = list.filter((el: {
                            id: string;operacao: string;qualElemento: string;
                        }) => el.id == historic1.json.id && el.operacao == historic1.json.operacao && el.qualElemento == historic1.json.qualElemento)
                        expect(list.length).toBe(1)
                        return request.post(base_url + "historicos", historic3).then(body => {
                                expect(body).toEqual({
                                    success: "o historico foi devidamente cadastrado."
                                });
                                return request.post(base_url + "historicos", historic4)
                            })
                            .catch(err => {
                                expect(err.error).toEqual({
                                    failure: 'o historico nao pode ser cadastrado'
                                })
                                return request.get(base_url + "historicos").then(body => {
                                    let list = JSON.parse(body)
                                    list = list.filter((el: {
                                        id: string;operacao: string;qualElemento: string;
                                    }) => el.id == historic3.json.id && el.operacao == historic3.json.operacao && el.qualElemento == historic3.json.qualElemento)
                                    expect(list.length).toBe(1)
                                })
                            })
                    });
            });

    })

    it("deletes a register historic with no-dependecy", () => {

        var historic1 = {
            "json": {
                "operacao": "Cadastrou",
                "qualElemento": "Pneu",
                "id": "4"
            }
        };

        return request.post(base_url + "historicos", historic1)
            .then(body => {
                expect(body).toEqual({
                    success: "o historico foi devidamente cadastrado."
                });
                return request.get(base_url + "historicos").then(body => {
                    let list = JSON.parse(body)
                    list = list.filter((el: {
                        id: string;operacao: string;qualElemento: string;
                    }) => el.id == historic1.json.id && el.operacao == historic1.json.operacao && el.qualElemento == historic1.json.qualElemento)
                    return request.delete(base_url +
                        `historicos?id=${list[0].id}&op=${list[0].operacao}&el=${list[0].qualElemento}&tS=${list[0].timeStamp}`).then(body =>{
                            expect(body).toEqual('{"success":"o funcionario foi devidamente removido."}');
                        })
                })
            })
            .catch(err => {
                expect(err).toBe(null)
            })
    })

    it("doesn't delete a non-register historic", () => {
        var historic1 = {
            "json": {
                "operacao": "Cadastrou",
                "qualElemento": "Pneu",
                "id": "4",
                "timeStamp": "12121212"
            }
        };
        return request.delete(base_url +
            `historicos?id=${historic1.json.id}&op=${historic1.json.operacao}&el=${historic1.json.qualElemento}&tS=${historic1.json.timeStamp}`).then(body =>{
                
            })
            .catch(err => {
                expect(err.erro).toBe(null)
            })
    })

})