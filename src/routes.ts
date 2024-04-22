import express from "express";
import UserController from './controllers/user'
import MiddlewareAuth from "./middleware/auth";
import auth from "./controllers/auth";

const router = express.Router();

router.post("/login", auth.login)
router.post("/register", auth.register)

const authorizedRoute = router.use(MiddlewareAuth as () => {})
authorizedRoute.get('/users', UserController.getAllUsers);
authorizedRoute.get('/users/accountNumber/:id', UserController.getUserByAccountNumber);
authorizedRoute.get('/users/identityNumber/:id', UserController.getUserByIdentityNumber);
authorizedRoute.post('/users', UserController.createUser);
authorizedRoute.put('/users/:id', UserController.updateUser);
authorizedRoute.delete('/users/:id', UserController.deleteUser);

export default router