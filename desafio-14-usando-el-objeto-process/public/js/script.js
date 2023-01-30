(function () {
    const centroDeMensajes = document.getElementById('centroDeMensajes');

    const formMessage = document.getElementById('form-message');
    const inputEmail = document.getElementById('input-email');
    const inputNombre = document.getElementById('input-nombre');
    const inputApellido = document.getElementById('input-apellido');
    const inputEdad = document.getElementById('input-edad');
    const inputAlias = document.getElementById('input-alias');
    const inputAvatar = document.getElementById('input-avatar');

    const inputMessage = document.getElementById('input-message');
    const listMessages = document.getElementById('list-messages');

    const tableProducts = document.getElementById('table-products');

    const productosFaker = document.getElementById('generarFaker');

    const usuario = document.getElementById('usuario');
    const logout = document.getElementById('logout-boton');

    const socket = io();

    let messages = [];
    let products = []; 
    let user = '';

    //Si estoy logueado, lo renderizo, sino redirijo al login
    (function () {
        fetch(`http://localhost:8080/api`)
        .then(res => res.text())
        .then(data => {
            console.log(data)
            if (data === '') {
                location.href = 'http://localhost:8080/api/login'
            }
            user = data;
            const span = document.createElement('span');
            span.innerText = ` ${data}`
            usuario.appendChild(span);
        })
        .catch(error => console.log(error.message));
    })();

    logout.addEventListener('click', () => {
        location.href = 'http://localhost:8080/api/sign-out'
    })

    function showMessage(data) {
        const li = document.createElement('li');
        li.innerHTML = `<span style="color: blue"><strong>${data.author.id}</strong></span>
                        <span style="color: brown">[${data.date}] :</span>
                        <span style="color: green"><i> ${data.text}</i></span>
                        <img style="width: 50px" src=${data.author.avatar}>`
        listMessages.appendChild(li);
    }

    function showProduct(data) {
        let tr = tableProducts.insertRow();
        tr.innerHTML = `<td class="align-middle">${data.nombre}</td>
                        <td class="text-center align-middle">${data.precio}</td>
                        <td class="text-center align-middle"><img style="width: 25%" src=${data.foto} alt=""></td>`
    }

    formMessage.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const data = {
            email: inputEmail.value,
            author: {
                id: inputEmail.value,
                nombre: inputNombre.value,
                apellido: inputApellido.value,
                edad: inputEdad.value,
                alias: inputAlias.value,
                avatar: inputAvatar.value,
            },
            text: inputMessage.value,
            date: '',
        };
        socket.emit('new-message', data);
        inputMessage.value = '';
        inputMessage.focus();
    })

    productosFaker.addEventListener('click', (event) => {
        event.preventDefault();

        fetch(`http://localhost:8080/api/productos-test`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(res => res.json())
        .then(res => {
            while (tableProducts.hasChildNodes()) {
                tableProducts.removeChild(tableProducts.lastChild);
            }
            
            res.forEach(product => {
                socket.emit('new-product', product);
            })
        })
        .catch(error => console.log(error));
    })

    socket.on('connect', () => {
        console.log("Conectado al servidor");
    });

    socket.on('history-messages', (dataNormalizada) => {
        const dataDesnormalizada = desnormalizar(dataNormalizada);
        listMessages.innerText = '';
        dataDesnormalizada.mensajes.forEach((message) => {
            showMessage(message);
        });
    });

    socket.on('notification', (data) => {
        messages.push(data);
        showMessage(data);
    });

    socket.on('history-products', (data) => {
        products = data;
        products.forEach((product) => {
            showProduct(product);  
        });
    });

    socket.on('table-update', (data) => {
        products.push(data);
        showProduct(data);
    });

    function desnormalizar(data) {
        const userSchema = new normalizr.schema.Entity('users');

        const authorSchema = new normalizr.schema.Entity('authors', {
            author: userSchema,
        }, { idAttribute: 'email' });
        
        const messageSchema = new normalizr.schema.Entity('messages', {
            mensajes: [authorSchema]
        });

        const dataReversed = normalizr.denormalize(data.result, messageSchema, data.entities);

        console.log('Data Normalized Size', JSON.stringify(data).length);

        console.log('Data Reversed Size', JSON.stringify(dataReversed).length);

        // console.log('Data Reversed', JSON.stringify(dataReversed));

        const result = ((JSON.stringify(data).length) * 100) / (JSON.stringify(dataReversed).length);

        console.log('Porcentaje de compresion:', result.toFixed(2),'%');

        if (centroDeMensajes.firstElementChild) {
            centroDeMensajes.firstElementChild.innerText = `(Compresion: ${result.toFixed(2)}%)`;
        } else {
            const span = document.createElement('span');
            span.innerText = `(Compresion: ${result.toFixed(2)}%)`;
            centroDeMensajes.appendChild(span);
        }

        return dataReversed;
    }
})();