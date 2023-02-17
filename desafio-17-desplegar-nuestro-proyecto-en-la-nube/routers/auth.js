import { Router } from "express"
import passport from "passport"

import logger from '../logger.js'

const router = Router();

router.post('/sign-in', passport.authenticate('sign-in', {
    failureRedirect: 'fail-sign-in',
}), (req, res) => {
    logger.info(`Ruta ${req.originalUrl} metodo POST`);
    res.redirect('/');
})
  
router.post('/sign-up', passport.authenticate('sign-up', {
    failureRedirect: 'fail-sign-up'
}), (req, res) => {
    logger.info(`Ruta ${req.originalUrl} metodo POST`);
    res.redirect('/');
})
  
router.get('/sign-out', (req, res, next) => {
    const { user } = req
    req.logout((error) => {
        if (error) {
            return next(error)
        }
        logger.info(`Ruta ${req.originalUrl} metodo GET`);
        res.render('logout', { layout: 'main' , email: user.email});
    })
})

router.get('/', (req, res) => {
    if (!req.isAuthenticated()) {
        res.status(401).send('');
        return;
    }
    const { user } = req;
    logger.info(`Ruta ${req.originalUrl} metodo GET`);
    res.status(200).send(user.email);
})

router.get('/login', (req, res) => {
    logger.info(`Ruta ${req.originalUrl} metodo GET`);
    res.render('login', { layout: 'main' });
})

router.get('/register', (req, res) => {
    logger.info(`Ruta ${req.originalUrl} metodo GET`);
    res.render('register', { layout: 'main' });
})

router.get('/fail-sign-in', (req, res) => {
    logger.info(`Ruta ${req.originalUrl} metodo GET`);
    res.render('login-error', { layout: 'main' });
})

router.get('/fail-sign-up', (req, res) => {
    logger.info(`Ruta ${req.originalUrl} metodo GET`);
    res.render('register-error', { layout: 'main' });
})

export default router;