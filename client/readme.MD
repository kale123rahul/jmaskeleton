# JMA
## JMA skeleton project

### Get started:

>npm install

NB: breaking changes made it nesssesary to fix the extract-text-plugin @2.1.0 
Keep an eye on issues : [https://github.com/webpack-contrib/extract-text-webpack-plugin/issues](https://github.com/webpack-contrib/extract-text-webpack-plugin/issues)

>npm run watch

To browse the application do one of these

#### Using the server project
 - Start the server ([instructions here](../server/readme.MD))
 - Browse to the host and port specified in the APP_HOST and APP_PORT environment variables

#### Using the mocked services of the `ApiClient`
 - Install a webserver like:
 - >npm install http-server -g or
 - >npm install live-server -g
 - start the webserver by running
 - >http-server ./dist


### Stack
The following stack is used:

 - Aurelia as a SPA framework
 - Typescript for javascript development
 - Pug/Jade for templates to be used
 - Less for css stylesheets 

Webpack for compilation and bundling: 
 - typescript -> javascript
 - pug -> html
 - less -> css

### Extra info: Aurelia bootstrap sequence

 - Aurelia is looking for the body attribute aurelia-app="" and finds "main"
 - Aurelia bootstraps with the main module
 - In the main module there is a method `configure()`. This is used to configure aurelia for this application;
 - In the main module there is a method `start()`. This starts the application;
 - In the main module there is also a configuration of the ViewLocator, telling aurelia not to look for HTML files (as is default) but to look for .pug files The pug files are compiled by webpack from jade/pug;
 - The main module checks if the user is logged in on the server by checking if there is a `currentUser`;
 - If there is a currentUser the application starts by setting the root (the body tag in this case) to the app module (app.ts and app.pug)
 - If there is no currentUser the application starts the public part of the app (for example showing a way to login on the server, creating an account etc)
 - The app module is a very simple one : it configures a router and that takes care of the viewport(s) in the template (app.pug);
 - The default route is 'main', it defines a main-page module: Main Page is the first actual page of the application


