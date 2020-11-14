Feature: As an employer
         I want to see the company statistics 
         So that I can improve the company efficiecy

Scenario: Generate general graph
Given I'm in page "Geral"
And I see a option of "Generate general graph"
When I ask to the system to generate a graph with the general data of the company
Then I'm redirected to the page "Relatorio de Pesquisa"
And I can visualize the graphic data of the company, "Historico de Registros e Remoções", "Tipo Pneus", "Tipo Veiculos"
And I can visualize "Problemas Pneus" with value "3" in a total of "1" registered
And I can visualize "Problemas Veiculo" with value "1" in a total of "2" registered

Scenario: Detailed visualization “Pneus”
Given I'm in page “Relatorio de Pesquisa”
And I see a pie chart with a title of “Tipos Pneus”
When I ask to the system a detailed visualization of the "Tipos Pneus"
Then I'm redirected to the page "Visualização Pneus"
And I can visualize the total of "1" tyres registered 
And A table with "1" entry with the headings "Marca", "Porcentagem", "Cadastrados", with values of "ThunderBolt", "100%", "1"
And I can see a history entry with the values "14/11/2020 8:23:12 AM", "Removeu", "Pneu", "2"
And I can see a history entry with the values "12/11/2020 11:40:23 AM", "Cadastrou", "Pneu", "2"
And I can see a history entry with the values "12/11/2020 9:40:23 AM", "Cadastrou", "Pneu", "1"

Scenario: Detailed visualization "Veiculos"
Given I'm in page “Relatorio de Pesquisa”
And I see a pie chart with a title of “Tipos Veiculos”
When I ask to the system a detailed visualization of the "Tipos Veiculos"
Then I'm redirected to the page "Visualização Veiculos"
And I can visualize the total of "2" vehicles registered 
And A table with "2" entry with the headings "Marca", "Porcentagem", "Cadastrados", with values of "Ferrari", "50%", "1"
And "Volwsvagem", "50%", "1"
And I can see a history entry with the values "14/11/2020 10:33:12 AM", "Removeu", "Veiculo", "3"
And I can see a history entry with the values "14/11/2020 8:44:23 AM", "Cadastrou", "Veiculo", "3"
And I can see a history entry with the values "13/11/2020 11:44:23 PM", "Cadastrou", "Veiculo", "2"
And I can see a history entry with the values "12/11/2020 11:44:23 AM", "Cadastrou", "Veiculo", "1"