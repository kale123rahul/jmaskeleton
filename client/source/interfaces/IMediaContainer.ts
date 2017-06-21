import { ILatLong } from "./ILatLong";
import { IMediaObject } from "./IMediaObject";


export interface IMediaContainer {    
    id : string;
    title:string;
    description:string;
    validFrom : Date;
    validTo : Date;
    location : ILatLong;    
    media : IMediaObject[];    
    providerId : string;    
}

