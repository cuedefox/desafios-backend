import ContenedorMemoria from "../contenedores/ContenedorMemoria.js";
import { generarProductosFake } from "../routers/productosTest.js";

class productosAPIMock extends ContenedorMemoria {
    crearObjetos (num) {
        this.elementos = [];
        for (let index = 0; index < num; index++) {
            this.guardar(generarProductosFake());
        }
        return this.elementos;
    }

    actualizar(id, req) {
        let { body : data } = req;
        data = {id: parseInt(id), ...data}
        return super.actualizar(id, data);
    }

}

export default productosAPIMock