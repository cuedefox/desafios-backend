class User {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName() {
        return `${this.nombre} ${this.apellido}`
    }

    addMascota(mascota) {
        this.mascotas.push(mascota);
    }

    countMascotas() {
        return this.mascotas.length;
    }

    addBook(nombre, autor) {
        this.libros.push({nombre: nombre, autor: autor});
    }

    getBookNames() {
        let arr = [];
        for(let i = 0; i < this.libros.length; i++) {
            arr.push(this.libros[i].nombre);
        }
        return arr;
    }
}

let Rodrigo = new User("Rodrigo", "Vergara", [
    {nombre: "La divina comedia", autor: "Dante Alighieri"},
    {nombre: "Catalyst", autor: "James Luceno"}
], ["Piyo", "Link"]);

console.log(Rodrigo.getFullName());
Rodrigo.addMascota("Sirius");
console.log(Rodrigo.countMascotas());
Rodrigo.addBook("Lost Stars", "Claudia Gray");
console.log(Rodrigo.getBookNames());