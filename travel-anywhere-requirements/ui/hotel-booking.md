# User Story: Hotel Booking

## Requirement
As a user, I want to book a selected hotel by filling out a reservation form, so that I can secure accommodation for my trip.

## Required Fields
- First Name 
  - type: string
  - maxLength: 40
- Last Name 
  -  type: string
  - maxLength: 40
- Birth Date 
  - type: date
  - must be in the past
- Email
  - type: email
- Start Date 
  -  type: date
  - cannot be in the past
- End Date
  - type: date
  - cannot be in the past
  - must be after start date
- Number of Guests 
  - type: number
  - min: 1
  - max: 10
- Submit button
  - type: button
  - label: "Submit"
  - should trigger form submission
