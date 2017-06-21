import * as mongoose from 'mongoose';
import * as validators from 'mongoose-validators';
import * as uniqueValidator from 'mongoose-unique-validator';
import crypto = require('crypto');
import * as logger from 'winston';

export const ADMIN_ROLE = "admin";

export interface IUser{
    id?:any;
    _id?: any;
    firstName : string;
    lastName? : string;
    email : string;
    hashedPassword? : string;
    salt:string;
    passwordResetToken : string;
    passwordResetEndDate : Date;
    preferredLanguage : string;
    roles : string[];
};

export interface IUserModel extends IUser, mongoose.Document {
  _id:any; 
  validatePassword(passWord:string) : boolean;
  setPassword(passWord:string) : IUserModel;
  createPasswordResetToken() : IUserModel;
  makeAdmin(doMake:boolean) : IUserModel;    
}

export const UserSchema = new mongoose.Schema({
  firstName : {type:String},
  lastName : {type:String},
  salt : {type:String,default:createRandomString(10)},
  hashedPassword : {type:String},
  preferredLanguage : {type:String, default:'nl'},
  email: {type: String, required: true, unique: true, validate: validators.isEmail()},
  roles :{type: [String] },
});

UserSchema.plugin(uniqueValidator);

function createHash(user : IUser, password : string) : string {
  var iterations = 37;
  var keyLength = 512;
  var digest = 'sha512';
  return crypto.pbkdf2Sync(password,user.salt,iterations,keyLength ,digest ).toString('hex');
}


UserSchema.methods.makeAdmin = function (doMake : boolean){
  var index = (<IUserModel>this).roles.indexOf(ADMIN_ROLE);
  if (doMake && index==-1){
    (<IUserModel>this).roles.push(ADMIN_ROLE);
  } else if (!doMake && index!=-1){
    (<IUserModel>this).roles.splice(index,1);
  } 
  return this;
};

UserSchema.methods.validatePassword = function (password){
  return this.hashedPassword === createHash(this.toJSON(),password);
};

function createRandomString(count:number=5):string{
    let letters = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    while (result.length<count){
        result += letters.charAt(Math.floor(Math.random()*letters.length));
    }
    return result;
}

UserSchema.methods.createPasswordResetToken = function (){
  (<IUserModel>this).passwordResetToken = createHash(this.toJSON(),createRandomString(15));
  (<IUserModel>this).passwordResetEndDate = new Date(new Date().valueOf() + 24*60*60*1000);
  return this;  
};

UserSchema.methods.setPassword = function (password){
  (<IUserModel>this).hashedPassword = createHash(this,password);
  (<IUserModel>this).passwordResetToken = null;
  (<IUserModel>this).passwordResetEndDate = null;  
  return this;
};

export const User = mongoose.model<IUserModel>('User', UserSchema);

