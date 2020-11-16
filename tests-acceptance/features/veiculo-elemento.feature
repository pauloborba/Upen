Feature: As an employer
    I want to see a vehicle details

Scenario: Delete a vehicle
Given I'm in page of vehicle with plate "PDY1234"
When I click on the button "Deletar"
Then I can see an alert "Veiculo deletado com sucesso"