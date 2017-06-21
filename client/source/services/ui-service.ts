import {bindable, inject, customElement} from 'aurelia-framework';
import * as Jma from '../interfaces/all-interfaces';
declare var Materialize : any;

export class UiService  implements Jma.IUiService {
    public static notify(message:string, status? : string){

        if (status && (status=='info' || status=='success' || status=='warning' || status=='danger')){
            Materialize.toast(message, 3000, status)
        } else {
            Materialize.toast(message, 3000)
        }            
    } 

    public notify(message:string, status? : string){
        UiService.notify(message, status);
    }

}