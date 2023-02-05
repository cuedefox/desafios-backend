process.on('message', (cant) => {
    console.log(`Llego la cantidad del padre: ${cant}`);
    
    let numeros = {};
    for (let i = 0; i < cant; i ++) {
        let num = generador(1, 10);
        if (!numeros[num]) {
            numeros[num] = 0;
        }
        numeros[num] = numeros[num] + 1;
    }

    process.send(numeros);

    process.exit();
})

function generador (inicio, fin) {
    return Math.floor(Math.random() * (fin - inicio + 1) + inicio);
}

process.send('ready');