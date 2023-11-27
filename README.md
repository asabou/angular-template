# AngularTemplate

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Internationalization and Localization
1. Install dependencies
    1. ng add @angular/localize
    2. in angular.json:
        1. add more locales at i18n property
        2. in architect.build.options.localize add the default preview i18n with ng serve. Adding multiple values will cause an error when serving application with ng serve. Multiple values can be added when deploying this app to nginx for example.

2. Internationalize the application 
    1. by adding i18n tag to each element we want to be internationalized
    2. for dates {{ "05/01/2023" | date }}
    3. for currency {{ "123" | currency }}
    4. for alt attributes of images: i18n-alt
    5. with $localize`${my-text}` you can i18n in TypeScript

3. Localize the application
    1. generate messages: ng extract-i18n --output-path src/locale 
    2. copy message file: cp .\src\locale\messages.xlf .\src\locale\messages.ro.xlf pay attention: old messages.ro.xlf will be overwritten

## Application language interactively change
1. Install dependencies: npm install --save @ngx-translate/core @ngx-translate/http-loader
2. Create module: ng g m modules/ngx-translate
3. Create message translations in assets/i18n/en/de/ro.json
4. Language can be changed dynamically by TranslateService.use(DESIRED-LANGUAGE)

## Add mat-icon css files and bootstrap
There are several methods you can benefit from using these css files:
1. Directly from google apis: in style.scss: @import "https://fonts.googleapis.com/icon?family=Material+Icons";
2. Having them self hosted:
    1. npm install material-icons --save
    2. in style.scss: @import 'material-icons/iconfont/material-icons.css';
3. Add boostrap: 
    1. npm install boostrap
    2. in style.scss: @import 'bootstrap/scss/bootstrap.scss';