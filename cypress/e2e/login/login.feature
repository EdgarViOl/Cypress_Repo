Feature: User Login
  As a user, I want to log in to the application
  So that I can access my account

  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I enter username "testuser" and password "password123"
    And I click the login button
    Then I should be logged in successfully
    And I should see "Welcome, testuser!"
  Examples:
    | username  | password     |
    | testuser  | password123  |
    | admin     | adminpass    |
    | student     | Pasword123    |