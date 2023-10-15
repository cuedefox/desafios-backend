export function authAdmin(req, res, next) {
    if (req?.session?.user?.admin) {
        return next();
    } else {
        return res.status(403).send("Usuario no autorizado para ingresar a este recurso.");
    }
}

export function authUser(req, res, next) {
    if (!req?.session?.user?.admin) {
        return next();
    } else {
        return res.status(403).send("Usuario no autorizado para ingresar a este recurso.");
    }
}