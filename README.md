# Angular Material Table

This custom wrapper for Angular Material Table provides a flexible and extensible way of implementing a custom
DataSource using the Strategy Design Pattern. The GridDataComponent uses the GridDataSource to load data from various
data sources, such as REST APIs or mock data. The GridDataSource implementation uses the Strategy Design Pattern to
allow for different data loading strategies depending on the specific requirements of the application.

This code provides an example of how to use the custom wrapper to implement a ConfigAudit component that loads data from
a mock API service and allows the user to filter the results based on specific columns. The GridDataComponent and
GridDataSource classes are used to provide a flexible and extensible solution that can be easily modified and reused for
other components that require a custom implementation of the Angular Material Table.

## Development server

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.2.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you
change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also
use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a
package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out
the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
