Feature: As an employer
    I want to see a vehicle details

Scenario: Delete a vehicle
Given I'm in page of vehicle with license plate "PDY1234"
When I click on the button to delete "Deletar"
Then I can see an alert "Veiculo deletado com sucesso"

Scenario: Assign a tire to a vehicle
Given I'm in page of vehicle with plate "PDY2345"
When I click on the button to assign "+"
And I enter the tire's ID "1"
And Press the button to assign "Atribuir"
Then I can see the tire's ID on the page of vehicle with plate "PDY2345"

Scenario: Unassign a tire from a vehicle
Given I'm in page of the vehicle with plate "PDY2345" 
When I click the button to unassign "-"
And I enter the tire's ID  "2" 
And Press the button to unassing "Desatribuir"
Then I cannot see the tire's ID on the page of vehicle with plate "PDY2345"