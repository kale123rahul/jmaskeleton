// export * from 'local files here'

export * from "./IMediaObject";
export * from "./IMediaContainer";
export * from "./IMediaProvider";

export interface IUser{
    id?:any;
    _id?: any;
    firstName : string;
    lastName? : string;
    hashedPassword? : string;
    email : string;
    passwordResetToken : string;
    passwordResetEndDate : Date;
    preferredLanguage : string;
};

export interface IUiService {
}



