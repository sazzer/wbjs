@wip
Feature: Get worlds

  Scenario: No worlds to find
    # We start with a blank database
    When I retrieve the world with ID "eyJ0eXBlIjoid29ybGQiLCJpZCI6MH0="
    Then I get an error response with:
      | Error Code  | UNKNOWN_WORLD |
      | Status Code | Not Found     |

  Scenario: Invalid ID
    When I retrieve the world with ID "I'mInvalid"
    Then I get an error response with:
      | Error Code  | INVALID_ID  |
      | Status Code | Bad Request |

  Scenario: Invalid ID Type
    # Type = "results"
    When I retrieve the world with ID "eyJ0eXBlIjoicmVzdWx0cyIsImlkIjo1fQ=="
    Then I get an error response with:
      | Error Code  | INVALID_ID  |
      | Status Code | Bad Request |

  Scenario: Load World - no caching
    Given I have worlds with:
      | ID      | 0                                    |
      | Name    | World 1                              |
      | Version | bf795571-d47b-4150-a84f-fbf88997c891 |
      | Created | 2016-09-06T12:48:00Z                 |
      | Updated | 2016-09-06T12:48:00Z                 |
    When I retrieve the world with ID "eyJ0eXBlIjoid29ybGQiLCJpZCI6MH0="
    Then I get a successful response
    And the retrieved World is:
      | ID       | eyJ0eXBlIjoid29ybGQiLCJpZCI6MX0=         |
      | Name     | World 1                                  |
      | Created  | 2016-09-06T12:48:00Z                     |
      | Version  | "bf795571-d47b-4150-a84f-fbf88997c891"   |
      | Modified | 2016-09-10T12:48:00Z                     |
