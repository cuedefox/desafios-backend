export const githubCallbackControllers = async (req, res) => {
    const user = req.user;
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
    };
    req.session.admin = true;
    res.redirect('http://localhost:3000/products');
};

export const registerControllers = async (req, res) => {
    res.status(201).send({ status: "success", message: "Usuario creado con extito." })
};

export const loginControllers = async (req, res) => {
    const user = req.user;
    if (!user) return res.status(401).send({ status: "error", error: "credenciales incorrectas" });
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age,
        admin: user.role === 'admin'
    }
    res.send({ status: "success", payload: req.session.user, message: "logueo realizado" });
};

export const logoutControllers = (req, res) => {
    req.session.destroy(error => {
        if (error){
            res.status(400).json({error: "error logout", mensaje: "Error al cerrar la sesion"});
        }
        res.status(200).json({message: "Sesion cerrada correctamente."});
    });
};

export const checkSessionControllers = (req, res) => {
    if (req.session.user) {
      res.status(200).json({ user: req.session.user });
    } else {
      res.status(401).json({ error: 'No hay sesión activa' });
    }
};

export const failRegisterControllers = (req, res) => {
    res.status(401).send({ error: "Failed to process register!" });
};

export const failLoginControllers = (req, res) => {
    res.status(401).send({ error: "Failed to process login!" });
};