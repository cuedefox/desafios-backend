import { Router } from "express";
import passport from "passport";

const router = Router();

router.post('/sign-in', passport.authenticate('sign-in', {
    failureRedirect: 'fail-sign-in',
}), (req, res) => {
    res.redirect('/');
})
  
router.post('/sign-up', passport.authenticate('sign-up', {
    failureRedirect: 'fail-sign-up'
}), (req, res) => {
    res.redirect('/');
})
  
router.get('/sign-out', (req, res, next) => {
    const { user } = req
    req.logout((error) => {
      if (error) {
        return next(error)
      }
    res.render('logout', { layout: 'main' , email: user.email});
    })
})

router.get('/', (req, res) => {
    if (!req.isAuthenticated()) {
        res.status(401).send('');
        return;
    }
    const { user } = req;
    res.status(200).send(user.email);
})

router.get('/login', (req, res) => {
    res.render('login', { layout: 'main' });
})

router.get('/register', (req, res) => {
    res.render('register', { layout: 'main' });
})

router.get('/fail-sign-in', (req, res) => {
    res.render('login-error', { layout: 'main' });
})

router.get('/fail-sign-up', (req, res) => {
    res.render('register-error', { layout: 'main' });
})

export default router;