Feature: As a user of the system
         I want to register vehicles
         So that I can manage their informations

Scenario: Registering vehicles with non registered plate
Given I am at the vehiclesList page
Given I cannot see a vehicle with registration plate "RJR1162" in the vehicles list
When I try to register vehicle "Corcel" with year "1973", brand "Ford", function "Revisão" and plate "RJR1162"
Then I can see vehicle "Corcel" with year "1973", brand "Ford", function "Revisão" and plate "RJR1162" in the vehicles list