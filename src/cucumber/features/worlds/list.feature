Feature: List worlds

  Scenario: No worlds to find
    # We start with a blank database
    When I list worlds
    Then I get a successful response
    And I get 0 results
    And I have no next page
    And I have no previous page

  Scenario: Two worlds to find, first page, no filtering
    Even though World 2 is created second, it has an earlier Updated Date, Created Date and ID so is guaranteed to be returned first
  Given I have worlds with:
    | ID      | 1                                    | 0                                    |
    | Name    | World 1                              | World 2                              |
    | Version | bf795571-d47b-4150-a84f-fbf88997c891 | 18c64b31-53e2-4161-8836-58c89e08dcd7 |
    | Created | 2016-09-06T12:48:00Z                 | 2016-04-06T16:57:00Z                 |
    | Updated | 2016-09-06T12:48:00Z                 | 2016-04-06T16:57:00Z                 |
  When I list worlds
  Then I get a successful response
  And I get 2 results
  And I have no next page
  And I have no previous page
  And World 0 is:
    | ID      | eyJ0eXBlIjoid29ybGQiLCJpZCI6MH0=         |
    | Name    | World 2                                  |
    | Created | 2016-04-06T16:57:00Z                     |
    | Offset  | 0                                        |
    | Cursor  | eyJ0eXBlIjoid29ybGRzIiwib2Zmc2V0IjowfQ== |
  And World 1 is:
    | ID      | eyJ0eXBlIjoid29ybGQiLCJpZCI6MX0=         |
    | Name    | World 1                                  |
    | Created | 2016-09-06T12:48:00Z                     |
    | Offset  | 1                                        |
    | Cursor  | eyJ0eXBlIjoid29ybGRzIiwib2Zmc2V0IjoxfQ== |

Scenario: Two worlds to find, cursor based pagination from second record
  Given I have worlds with:
    | ID      | 1                                    | 0                                    |
    | Name    | World 1                              | World 2                              |
    | Version | bf795571-d47b-4150-a84f-fbf88997c891 | 18c64b31-53e2-4161-8836-58c89e08dcd7 |
    | Created | 2016-09-06T12:48:00Z                 | 2016-04-06T16:57:00Z                 |
    | Updated | 2016-09-06T12:48:00Z                 | 2016-04-06T16:57:00Z                 |
  When I list 10 worlds starting from cursor "eyJ0eXBlIjoid29ybGRzIiwib2Zmc2V0IjowfQ=="
  Then I get a successful response
  And I get 2 results
  And I have no next page
  And I have a previous page
  And World 0 is:
    | ID      | eyJ0eXBlIjoid29ybGQiLCJpZCI6MX0=         |
    | Name    | World 1                                  |
    | Created | 2016-09-06T12:48:00Z                     |
    | Offset  | 1                                        |
    | Cursor  | eyJ0eXBlIjoid29ybGRzIiwib2Zmc2V0IjoxfQ== |

Scenario: Two worlds to find, offset based pagination from second record
  Given I have worlds with:
  | ID      | 1                                    | 0                                    |
  | Name    | World 1                              | World 2                              |
  | Version | bf795571-d47b-4150-a84f-fbf88997c891 | 18c64b31-53e2-4161-8836-58c89e08dcd7 |
  | Created | 2016-09-06T12:48:00Z                 | 2016-04-06T16:57:00Z                 |
  | Updated | 2016-09-06T12:48:00Z                 | 2016-04-06T16:57:00Z                 |
  When I list 10 worlds starting from offset "1"
  Then I get a successful response
  And I get 2 results
  And I have no next page
  And I have a previous page
  And World 0 is:
  | ID      | eyJ0eXBlIjoid29ybGQiLCJpZCI6MX0=         |
  | Name    | World 1                                  |
  | Created | 2016-09-06T12:48:00Z                     |
  | Offset  | 1                                        |
  | Cursor  | eyJ0eXBlIjoid29ybGRzIiwib2Zmc2V0IjoxfQ== |

Scenario: Two worlds to find, page based pagination from second record
  Given I have worlds with:
  | ID      | 1                                    | 0                                    |
  | Name    | World 1                              | World 2                              |
  | Version | bf795571-d47b-4150-a84f-fbf88997c891 | 18c64b31-53e2-4161-8836-58c89e08dcd7 |
  | Created | 2016-09-06T12:48:00Z                 | 2016-04-06T16:57:00Z                 |
  | Updated | 2016-09-06T12:48:00Z                 | 2016-04-06T16:57:00Z                 |
  When I list 1 worlds starting from page "1"
  Then I get a successful response
  And I get 2 results
  And I have no next page
  And I have a previous page
  And World 0 is:
  | ID      | eyJ0eXBlIjoid29ybGQiLCJpZCI6MX0=         |
  | Name    | World 1                                  |
  | Created | 2016-09-06T12:48:00Z                     |
  | Offset  | 1                                        |
  | Cursor  | eyJ0eXBlIjoid29ybGRzIiwib2Zmc2V0IjoxfQ== |

Scenario: Two worlds to find, only getting first record
  Given I have worlds with:
  | ID      | 1                                    | 0                                    |
  | Name    | World 1                              | World 2                              |
  | Version | bf795571-d47b-4150-a84f-fbf88997c891 | 18c64b31-53e2-4161-8836-58c89e08dcd7 |
  | Created | 2016-09-06T12:48:00Z                 | 2016-04-06T16:57:00Z                 |
  | Updated | 2016-09-06T12:48:00Z                 | 2016-04-06T16:57:00Z                 |
  When I list 1 worlds starting from offset "0"
  Then I get a successful response
  And I get 2 results
  And I have a next page
  And I have no previous page
  And World 0 is:
  | ID      | eyJ0eXBlIjoid29ybGQiLCJpZCI6MH0=         |
  | Name    | World 2                                  |
  | Created | 2016-04-06T16:57:00Z                     |
  | Offset  | 0                                        |
  | Cursor  | eyJ0eXBlIjoid29ybGRzIiwib2Zmc2V0IjowfQ== |

Scenario: Providing an invalid cursor
  When I list 10 worlds starting from cursor "I'mInvalid"
  Then I get an error response with:
    | Error Code  | INVALID_CURSOR |
    | Status Code | Bad Request    |

Scenario: Providing an invalid type of cursor
  When I list 10 worlds starting from cursor "eyJ0eXBlIjoicmVzdWx0cyIsIm9mZnNldCI6NX0="
  Then I get an error response with:
    | Error Code  | INVALID_CURSOR |
    | Status Code | Bad Request    |
