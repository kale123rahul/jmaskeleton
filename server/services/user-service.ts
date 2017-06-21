import * as mongoose from 'mongoose';
import {IUser, IUserModel, User, ADMIN_ROLE} from  '../models/user';
import * as logger from 'winston';

export async function getUserByEmail(email: string): Promise<IUserModel> {
  return User.findOne({ email: email })
    .populate("account")
    .exec()
    .then(user => {
      if (user) delete user.hashedPassword;
      return user;
    });
}

export async function setPassword(userIid: string,password:string): Promise<IUserModel>{
  return User.findById(userIid).exec()
  .then(user=>{
    user.setPassword(password);
    return user;
  })
}

export async function getUserModel(id: string): Promise<IUserModel> {
  return User.findById(id).exec();
}

export async function getUserById(id: string): Promise<IUser> {
  return User.findById(id)
    .lean()
    .exec()
    .then((user:IUser) => {
      return cleanupUser(user);
    });
} 

export async function deleteUser(userId: string): Promise<IUser> {
    return User.findOneAndRemove({_id: userId}).lean().exec()
    .then((user:IUser) => {
      return cleanupUser(user);
    });
}

function cleanupUser(user : IUser) : IUser{
    if (!user) return user;
    delete user.hashedPassword;
    delete user.salt;
    delete user.passwordResetEndDate;
    delete user.passwordResetToken;
    return user;
}

export async function storeUser(userDoc:IUser) : Promise<IUser>{
  return await new User(userDoc).save();
}

