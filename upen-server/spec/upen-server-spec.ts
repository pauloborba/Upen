import request = require("request-promise");
import { closeServer } from '../upen-server';
import {Veiculo} from '../../common/veiculo'

var base_url = "http://localhost:3000/";

describe("O servidor", () => {
  var server:any;

  beforeAll(() => {server = require('../upen-server')});

  afterAll(() => {server.closeServer()});

  function fillVehicle (v: Veiculo, placa: string, modelo: string, marca: string, ano: number, funcao: string): void {
      v.placa = placa;
      v.modelo = modelo;
      v.marca = marca;
      v.ano = ano;
      v.funcao = funcao;
   }

  it("inicialmente retorna uma lista de veiculos vazia", () => {
    return request.get(base_url + "veiculos")
            .then(body => 
               expect(body).toBe("[]")
             )
            .catch(e => 
               expect(e).toEqual(null)
             );
  })

  it("inicialmente retorna uma lixeira de veiculos vazia", () => {
   return request.get(base_url + "lixeiraveiculos")
           .then(body => 
              expect(body).toBe("[]")
            )
           .catch(e => 
              expect(e).toEqual(null)
            );
 })

  it("só cadastra veiculos", () => {
   var options:any = {method: 'POST', uri: (base_url + "veiculos"), body: {pnome:"Hélio" , unome:"Gracie" }, json: true};

   return request(options)
            .then(body =>
               expect(body).toEqual({falha: "Cadastro de veiculo falhou"})
            ).catch(e =>
               expect(e).toEqual(null)
            )
 });
  

  it("não cadastra veiculos com placa duplicada", () => {

   var veiculo1: Veiculo = new Veiculo();
   fillVehicle(veiculo1, "RJX6236", "Corcel", "Ford", 1973, "Revisão");

   var veiculo2: Veiculo = new Veiculo();
   fillVehicle(veiculo2, "RJX6236", "Uno","Fiat", 1976, "Tunagem");

   var resposta1 = '{"marca":"Ford","ano":1973,"placa":"RJX6236","modelo":"Corcel","funcao":"Revisão","eventos":[],"pneus":[]}';
   var resposta2 = '{"marca":"Fiat","ano":1976,"placa":"RJX6236","modelo":"Uno","funcao":"Tunagem","eventos":[],"pneus":[]}';

  return request.post(base_url + "veiculos", {"json":veiculo1})
             .then(body => {
                expect(body).toEqual({success: "Veiculo cadastrado com sucesso"});
                return request.post(base_url + "veiculos", {"json":veiculo2})
                         .then(body => {
                            expect(body).toEqual({falha: "Cadastro de veiculo falhou"});
                            return request.get(base_url + "veiculos")
                                     .then(body => {
                                        expect(body).toContain(resposta1);
                                        expect(body).not.toContain(resposta2);
                                      });
                          });
              })
              .catch(err => {
                 expect(err).toEqual(null)
              });
   })

   it("deleta veiculos da lista e os adiciona na lixeira corretamente", () => {

      var veiculo1: Veiculo = new Veiculo();

      fillVehicle(veiculo1, "RJX1234", "Corcel", "Ford", 1983, "Tunagem");


      var resposta1 = '{"marca":"Ford","ano":1983,"placa":"RJX1234","modelo":"Corcel","funcao":"Tunagem","eventos":[],"pneus":[]}';
      
      return request.post(base_url + "veiculos", {"json":veiculo1})
         .then(body => {
            expect(body).toEqual({success: "Veiculo cadastrado com sucesso"});
                  return request.delete(base_url + "veiculos/RJX1234")
                     .then(body =>{
                        return request.get(base_url + "veiculos").then( body => {
                           expect(body).not.toContain(resposta1);
                           return request.get(base_url + "lixeiraveiculos").then( body => {
                              expect(body).toContain(resposta1);
                           })
                        })
                     })                            
               })
         .catch(err => {
            expect(err).toEqual(null)
         });
      })

      it("deleta veiculos da lixeira permanentemente", () => {

         var veiculo1: Veiculo = new Veiculo();
   
         fillVehicle(veiculo1, "RJX1212", "488", "Ferrari", 2020, "Tunagem");
   
   
         var resposta1 = '{"marca":"Ferrari","ano":2020,"placa":"RJX1212","modelo":"488","funcao":"Tunagem","eventos":[],"pneus":[]}';
         
         return request.post(base_url + "veiculos", {"json":veiculo1})
            .then(body => {
               expect(body).toEqual({success: "Veiculo cadastrado com sucesso"});
                     return request.delete(base_url + "veiculos/RJX1212")
                        .then(body =>{
                           return request.get(base_url + "veiculos").then( body => {
                              expect(body).not.toContain(resposta1);
                              return request.get(base_url + "lixeiraveiculos").then( body => {
                                 expect(body).toContain(resposta1);
                                 return request.delete(base_url+ "lixeiraveiculos/RJX1212").then(body =>{
                                    return request.get(base_url + "lixeiraveiculos").then( body => {
                                       expect(body).not.toContain(resposta1);
                                    })
                                 })
                              })
                           })
                        })                            
                  })
            .catch(err => {
               expect(err).toEqual(null)
            });
         })


         it("restaura veiculos da lixeira para a lista de veiculos corretamente", () => {

            var veiculo1: Veiculo = new Veiculo();
      
            fillVehicle(veiculo1, "RJX4321", "Corcel", "Ford", 1980, "Tunagem");
      
      
            var resposta1 = '{"marca":"Ford","ano":1980,"placa":"RJX4321","modelo":"Corcel","funcao":"Tunagem","eventos":[],"pneus":[]}';
            
            return request.post(base_url + "veiculos", {"json":veiculo1})
               .then(body => {
                  expect(body).toEqual({success: "Veiculo cadastrado com sucesso"});
                        return request.delete(base_url + "veiculos/RJX4321")
                           .then(body =>{
                              return request.get(base_url + "veiculos").then( body => {
                                 expect(body).not.toContain(resposta1);
                                 return request.get(base_url + "lixeiraveiculos").then( body => {
                                    expect(body).toContain(resposta1);
                                    return request.post(base_url + "lixeiraveiculos",{"json":veiculo1}).then( body => {
                                       return request.get(base_url + "lixeiraveiculos").then( body =>{
                                          expect(body).not.toContain(resposta1);
                                          return request.get(base_url + "veiculos").then( body =>{
                                             expect(body).toContain(resposta1);
                                          })
                                       })
                                    })
                                 })
                              })
                           })                            
                     })
               .catch(err => {
                  expect(err).toEqual(null)
               });
            })

  

})