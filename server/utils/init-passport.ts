import * as passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import * as userService from '../services/user-service';
import {IUser, IUserModel, User} from  '../models/user';

export function initPassport() {
  passport.use(new LocalStrategy(
    function(username, password, done) {
      userService.getUserByEmail(username).then(
        (user) => {
          if (user) {
            if (user.validatePassword(password)) {
              return done(null, user);
            }
            else {
              return done(null, false, { message: 'Incorrect username password combination.' });
            }
          }
          else {
            return done(null, false, { message: 'Incorrect username password combination.' });
          }
        },
        // maybe database error
        (err) => { return done('Something errored'); }
      );
    }
  ));

  //user storage in session
  passport.serializeUser(function(user: IUser, done) {
    done(null, user._id);
  });

  //user retrieval within session
  passport.deserializeUser(function(id, done) {
    userService.getUserById(id.toString()).then(user=> { 
      done(null, user) }, 
      err=> done(err, null));
  });
}