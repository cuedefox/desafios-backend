import ContenedorArchivo from "../contenedores/ContenedorArchivo.js";

class mensajesApiArchivo extends ContenedorArchivo {
    constructor() {
        super('mensajes.json');
    }

}

export default mensajesApiArchivo;