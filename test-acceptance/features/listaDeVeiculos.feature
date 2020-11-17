Feature: As a user of the system
         I want to register vehicles
         So that I can manage their informations

Scenario: Registering vehicles with non registered plate
Given I am at the "Vehicles List" page
Given I cannot see a vehicle with registration plate "RJR1162" in the vehicles list
When I try to register vehicle "Corcel" with year "1973", brand "Ford", function "Revisão" and plate "RJR1162"
Then I can see vehicle "Corcel" with year "1973", brand "Ford", function "Revisão" and plate "RJR1162" in the vehicles list

Scenario: Deleting vehicles with registered plate
Given I am at the "Vehicles List" page
Given I can see a vehicle with registration plate "RJR1652" in the vehicles list
When I try to delete vehicle with plate "RJR1652"
Then I can no longer see vehicle with plate "RJR1652" in the vehicles list

Scenario: Restoring vehicle from the Trash
Given Vehicle with registration plate "RJR7751" is in the "VihecleTrashList"
Given I am at the "VihecleTrashList" page
When I try to restore the vehicle with plate "RJR7751"
Then I can no longer see vehicle with plate "RJR7751" in the "VihecleTrashList"

Scenario: Searching vehicle in the list
Given I am at the "Vehicles List" page
Given There is only one vehicle with "RJR4421" in their text fields in the vehicles list
When I type "RJR4421" in the "SearchBar"
Then the vehicle with registration plate "RJR4421" is the only one displayed in the list