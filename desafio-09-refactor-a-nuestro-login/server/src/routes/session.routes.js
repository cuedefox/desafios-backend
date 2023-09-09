import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get("/github", passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => { });

router.get("/githubcallback", passport.authenticate('github', { failureRedirect: '/github/error' }), async (req, res) => {
    const user = req.user;
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
    };
    req.session.admin = true;
    res.redirect('http://localhost:3000/products');
});

router.post("/register", passport.authenticate('register', { failureRedirect: '/api/sessions/fail-register' }), async (req, res) => {
    res.status(201).send({ status: "success", message: "Usuario creado con extito." })
});

router.post("/login", passport.authenticate('login', { failureRedirect: '/api/sessions/fail-register' }), async (req, res) => {
    const user = req.user;
    if (!user) return res.status(401).send({ status: "error", error: "credenciales incorrectas" });
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
    }
    res.send({ status: "success", payload: req.session.user, message: "logueo realizado" });
});

router.get("/logout", (req, res) => {
    req.session.destroy(error => {
        if (error){
            res.status(400).json({error: "error logout", mensaje: "Error al cerrar la sesion"});
        }
        res.status(200).json({message: "Sesion cerrada correctamente."});
    });
});

router.get("/current", (req, res) => {
    if (req.session.user) {
      res.status(200).json({ user: req.session.user });
    } else {
      res.status(401).json({ error: 'No hay sesión activa' });
    }
});

router.get("/fail-register", (req, res) => {
    res.status(401).send({ error: "Failed to process register!" });
});

router.get("/fail-login", (req, res) => {
    res.status(401).send({ error: "Failed to process login!" });
});

export default router;