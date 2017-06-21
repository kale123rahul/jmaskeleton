import 'aurelia-polyfills';
import { PLATFORM } from "aurelia-pal";
import * as Jma from './interfaces/all-interfaces';
import {Aurelia, ViewLocator} from 'aurelia-framework';

import 'materialize-css/bin/materialize.css';


import {UiService} from './services/ui-service';
import {ApiClient} from './services/api-client';
import {MockService} from './services/mock-service';

import * as bluebird from 'bluebird';


bluebird.config({warnings:false});

export function configure(aurelia: Aurelia) {
    var resources = [
        PLATFORM.moduleName('custom-elements/time-display'),
    ];

    aurelia.use
        .standardConfiguration()
        .plugin(PLATFORM.moduleName("aurelia-validation"))
        .developmentLogging()        
        .globalResources(resources); 

    aurelia.container.autoRegister('UiService', UiService);
    aurelia.container.autoRegister('ApiClient', ApiClient);
    aurelia.container.autoRegister('MockService', MockService);

    ViewLocator.prototype.convertOriginToViewUrl = function (origin) {
        let moduleId = origin.moduleId
        let id = (moduleId.endsWith('.js') || moduleId.endsWith('.ts')) ? moduleId.substring(0, moduleId.length - 3) : moduleId
        return id + '.pug'
    }

    aurelia.start()
        .then(a => {
            var client = <Jma.IApiClient>aurelia.container.get('ApiClient');
            return client.getCurrentUser()
        })
        .then((user) => {
            if (user != null) {
                aurelia.start().then(a => a.setRoot(PLATFORM.moduleName("app")));
            } else {
                aurelia.start().then(a => a.setRoot(PLATFORM.moduleName("public-app")));
            }
        },
        error => {
            console.error(error);
            aurelia.start().then(a => a.setRoot(PLATFORM.moduleName("public-app")));
        }); 
}

