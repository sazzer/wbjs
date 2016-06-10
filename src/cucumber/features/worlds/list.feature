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
    Then I get a successful response
    And I get 1 result
    And I have no next page
    And I have no previous page
    And World 0 is:
      | ID      | eyJ0eXBlIjoid29ybGQiLCJpZCI6MX0=         |
      | Name    | World 1                                  |
      | Created | 2016-09-06T12:48:00Z                     |
      | Offset  | 0                                        |
      | Cursor  | eyJ0eXBlIjoid29ybGRzIiwib2Zmc2V0IjowfQ== |


  Scenario: Two worlds to find, first page, no filtering
  Given I have worlds with:
    | ID      | 1                                    | 2                                    |
    | Name    | World 1                              | World 2                              |
    | Version | bf795571-d47b-4150-a84f-fbf88997c891 | 18c64b31-53e2-4161-8836-58c89e08dcd7 |
    | Created | 2016-09-06T12:48:00Z                 | 2016-10-06T16:57:00Z                 |
    | Updated | 2016-09-06T12:48:00Z                 | 2016-10-06T16:57:00Z                 |
  When I list worlds
  Then I get a successful response
  And I get 2 result
  And I have no next page
  And I have no previous page
  And World 0 is:
    | ID      | eyJ0eXBlIjoid29ybGQiLCJpZCI6MX0=         |
    | Name    | World 1                                  |
    | Created | 2016-09-06T12:48:00Z                     |
    | Offset  | 0                                        |
    | Cursor  | eyJ0eXBlIjoid29ybGRzIiwib2Zmc2V0IjowfQ== |
  And World 1 is:
    | ID      | eyJ0eXBlIjoid29ybGQiLCJpZCI6Mn0=         |
    | Name    | World 2                                  |
    | Created | 2016-10-06T16:57:00Z                     |
    | Offset  | 1                                        |
    | Cursor  | eyJ0eXBlIjoid29ybGRzIiwib2Zmc2V0IjoxfQ== |
