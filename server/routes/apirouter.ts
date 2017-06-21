import * as express from 'express';
import * as auth from '../utils/authentication';
import * as routes from './api/all-routes';
import * as passport from 'passport';
import * as multer from 'multer';
var storage = multer.diskStorage({})
var upload = multer({ storage: storage })

export var apiRouter = express.Router();
// disable autorization during development by commenting out the following line with authorization middleware
apiRouter.use("/", auth.verifyUser);


apiRouter.post("/login",passport.authenticate('local'), (req,res)=>res.json(req.user));
apiRouter.get('/logout', function(req, res) { req.logout(); res.sendStatus(200) });
apiRouter.get("/user",routes.getCurrentUser);

apiRouter.get("/providers",routes.getAllProviders);
apiRouter.get("/providers/:id",routes.getSingleProvider);
apiRouter.get("/providers/:id/container",routes.getProviderContainers);



