import {EventAggregator} from 'aurelia-event-aggregator';
import {bindable, inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import { PLATFORM } from "aurelia-pal";

import './assets/body.less';

export class App {
    private router: Router

    constructor(
        
    ) {

    }

    configureRouter(routerConfig, router) {
        this.router = router;
        this.doConfigureRouter(routerConfig);
    }

    attached(){
        console.log('Attached')
        // console.clear();
        // console.log("Let's start:")
    }

    private doConfigureRouter(routerConfig){    
        var routes=[
        {
            name: "main",
            route: ['/'],
            viewPorts: {
                menu: {
                    moduleId: PLATFORM.moduleName("modules/main-page/main-menu")
                },
                main: {
                    moduleId: PLATFORM.moduleName("modules/main-page/main-page")
                }
            },
            title: 'Welcome'
        }
        ];
        routerConfig.title = "Jma Skeleton";
        routerConfig.options.pushStat = true;
        routerConfig.map(routes)
    }

  }

  