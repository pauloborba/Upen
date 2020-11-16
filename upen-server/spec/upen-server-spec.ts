import request = require("request-promise");
import { closeServer } from '../upen-server';
import {Veiculo} from '../../common/veiculo'

var base_url = "http://localhost:3000/";

describe("O servidor", () => {
  var server:any;

  beforeAll(() => {server = require('../upen-server')});

  afterAll(() => {server.closeServer()});

  
})