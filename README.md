# Getting Started

## BE
### Setup
- Open the `travel-anywhere-be` as a separate inteliji project

- Install dependencies using build maven:
  - `maven -> travel-anywhere-be -> lifecycle -> clean, install`

- Add generated sources directory as a source root:
- Clidk right on `target/generated-sources` -> `Mark Directory as` -> `Generated Sources Root`

- Run the application:
  - Navigate to `TravelAnywhereBeApplication` class and run it.
## UI
### prerequisites

 - BE application running localy

### Setup

- Navigate to the `travel-anywhere-ui` directory
  - ```cd travel-anywhere-ui```

- Install dependencies:
  - ```npm install```

- Run the development server:
  - ```npm run dev ```

## QA
### prerequisites

- BE application running localy
- UI application running localy

### Setup
- Open the `travel-anywhere-ui-qa` as a separate inteliji project

- Install dependencies using build maven:
  - `maven -> travel-anywhere-be -> lifecycle -> clean, install`

- Run the tests 
  - Select the test you want to run
  - Right click and select `More Run/Debug` -> `Modify run configuration...`
  - In jdk setting vm options add `-DatkToken=<your_authorization_token>`