# User Story: Location Search

## Requirement
As a user, I want to search for all locations in selected area.
They should be displayed on the right panel in form of the list. 

## Locations panel
- A panel on the right side of the screen displays search results.
- Results can be filtered using radio buttons for category selection.
- Categories:
  - hotel
  - air
  - rail
  - car
- Each result consist of field:
  - Title
    - value: `"<Name>"`
  - Distance
    - value: `"Distance: <distance> KM"`
  - Address
    - value: `"Address: <street>"`
  - country
    - value: `"Country: <country>"`
  - Order button
    - visible only for category `hotel`
    - type: button
    - label: `"Order"`
    - should trigger navigation to booking form
- If field is missing it should not be displayed.

## Error handling
- If there is an error fetching locations, an error message is displayed: `"Failed to fetch locations. You may not be logged in."`

## No results found
- If no locations are found, a message is displayed: `"No results found. Click on map to select different location."`