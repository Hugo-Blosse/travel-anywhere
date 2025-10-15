# User Story: User Authentication

## Requirement
As a user, I want to log in securely, so that my bookings and personal information are protected.

## Use ATK
- type checkbox
- default: true
- label: "use ATK"
- when checked
  - the Atk Form is displayed
- when unchecked
  - the User Credentials Form is displayed

## User Credentials Form
- Username 
  - type: string
  - required 
- Password
  - type: password
    - required 
- Login button
  - type: button
  - label: "Login"
  - should trigger authentication process

## Atk Form
- ATK Token
    - type: string
    - required 
- Login button
  - type: button
  - label: "Login"
  - should trigger authentication process

## Details
- Failed login attempts show an error alert.
- Authentication is required for booking and viewing bookings.

