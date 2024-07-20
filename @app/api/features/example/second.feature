Feature: Example

    Scenario: Second
        Given Provide dummy data start count with 0 and name "test" :
            | name  | description | test |
            | test1 | test desc   | 0    |
        When The counter increase 1 and add " name" to name
        Then The result is 1 after increase and name is "test name"
