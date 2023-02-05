import { schema, normalize } from 'normalizr'

function normalizarMensajes (dataInArray) {
    const dataInObject = dataInArray.find(obj => obj.id === 'mensajes')

    const userSchema = new schema.Entity('users');
    
    const authorSchema = new schema.Entity('authors', {
        author: userSchema,
    }, { idAttribute: 'email' });
    
    const messageSchema = new schema.Entity('messages', {
        mensajes: [authorSchema]
    })

    const dataNormalized = normalize(dataInObject, messageSchema);

    return dataNormalized;
}

export default normalizarMensajes;