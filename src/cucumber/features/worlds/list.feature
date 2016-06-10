Feature: List worlds

  Scenario: No worlds to find
    # We start with a blank database
    When I list worlds
    Then I get a successful response
    And I get 0 results
    And I have no next page
    And I have no previous page

  Scenario: One world to find, first page, no filtering
    Given I have worlds with:
      | ID      | 1                                    |
      | Name    | World 1                              |
      | Version | bf795571-d47b-4150-a84f-fbf88997c891 |
      | Created | 2016-09-06T12:48:00Z                 |
      | Updated | 2016-09-06T12:48:00Z                 |
    When I list worlds
    Then I get a successful result
    And I get 1 result
    And I have no next page
    And I have no previous page
    And Result 0 is:
      | ID      | 1                                        |
      | Name    | World 1                                  |
      | Created | 2016-09-06T12:48:00Z                     |
      | Offset  | 0                                        |
      | Cursor  | eyJ0eXBlIjoid29ybGRzIiwib2Zmc2V0IjowfQ== |
