import { Router } from 'express';
import {
    githubCallbackControllers,
    registerControllers,
    loginControllers,
    logoutControllers,
    checkSessionControllers,
    failRegisterControllers,
    failLoginControllers
} from '../controllers/session.controller.js';
import passport from 'passport';

const router = Router();

router.get("/github", passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => { });

router.get("/githubcallback", passport.authenticate('github', { failureRedirect: '/github/error' }), githubCallbackControllers);

router.post("/register", passport.authenticate('register', { failureRedirect: '/api/sessions/fail-register' }), registerControllers);

router.post("/login", passport.authenticate('login', { failureRedirect: '/api/sessions/fail-register' }), loginControllers);

router.get("/logout", logoutControllers);

router.get("/current", checkSessionControllers);

router.get("/fail-register", failRegisterControllers);

router.get("/fail-login", failLoginControllers);

export default router;