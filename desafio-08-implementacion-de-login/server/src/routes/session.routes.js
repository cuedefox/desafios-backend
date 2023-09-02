import { Router } from 'express';
import SessionManager from '../services/db/session.service.js';

const router = Router();
const manager = new SessionManager();

router.post("/register", async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;
    try {
        let result = await manager.register(first_name, last_name, email, age, password);
        res.status(result.code).json({message: result.status})
    } catch (error) {
        res.status(500).json({ error: `Ocurrió un error en el servidor: ${error}` });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        let result = await manager.login(email, password);
        let payload;
        if (result.code === 200) {
            req.session.user = result.sessionUser;
            payload = req.session;
        }
        res.status(result.code).json({status: result.status, payload})
    } catch (error) {
        res.status(500).json({ error: `Ocurrió un error en el servidor: ${error}` });
    }
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

export default router;