# User Story: View Bookings

## Requirement
As a user, I want to view all my bookings to help me better manage my travel plans.

## Details
For authenticated users, a "Bookings" link is available on navigation header. 
The booking page displays all current and past bookings, including details such as destination, dates, and booking status.

### Booking Details
 - Title 
   - value: `"<hotelName>"`
 - Row 1
   - value: `"From: <startDate> to: <endDate>, for <numberOfGuests> guests"`
 - Row 2
   - value: `"Booked by <firstName> <lastName>, email: <email>"`

 ### No Bookings
If there are no bookings, the panel displays a message: `"No bookings found..."`

### Error Handling
If there is an error fetching bookings, an error message is displayed: `"Error! Can't get Bookings!"`

