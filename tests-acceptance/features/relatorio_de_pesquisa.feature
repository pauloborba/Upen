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