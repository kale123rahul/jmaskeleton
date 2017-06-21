// export * from 'local files here'

export * from "./IMediaObject";
export * from "./IMediaContainer";
export * from "./IMediaProvider";

import * as Jma from './all-interfaces';

export interface IUser{
    id?:any;
    _id?: any;
    firstName : string;
    lastName? : string;
    email : string;
    preferredLanguage : string;
};

export interface IUiService {
}


export interface IApiClient {
    getCurrentUser(): Promise<Jma.IUser>;
    getAllProviders(): Promise<Jma.IMediaProvider[]>;
    getSingleProviders(id: string): Promise<Jma.IMediaProvider>;
    getContainersByProvider(providerId): Promise<Jma.IMediaContainer[]>;
}


