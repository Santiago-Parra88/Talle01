const storage = require('./storage')

function insertar_usuario( dato ) {
    return new Promise( (resolve, reject) => {
        if (!dato.nombre || !dato.apellido ) {
            reject( 'Los datos se encuentran incompletos.' )
        } else {
            resolve( storage.insertar( dato ) )
        }
    } )
}

function obtener_usuario( dato ) {
    return new Promise( (resolve, reject) => {
        if (!dato) {
            reject( 'No existen datos' )
        } else {
            resolve( storage.obtener( dato ) )
        }
    } )
}

/*function actualizar_usuario( dato ) {
    return new Promise((resolve, reject) => {
        let resultado = storage.actualizar( dato )
        if (resultado) {
            return resolve( dato )
        } else {
            return reject('No existe usuario actualizar.')
        }
    })
}*/

async function actualizar_usuario(apellido, datosActualizacion) {
    const objeto = await model.findOne({ apellido });

    if (objeto) {
        // Actualiza los campos según los datos proporcionados
        objeto.nombre = datosActualizacion.nombre || objeto.nombre;
        objeto.apellido = datosActualizacion.apellido || objeto.apellido;

        return await objeto.save();
    } else {
        throw new Error('Usuario no encontrado');
    }
}

function eliminar_usuario( dato ) {
    return new Promise((resolve, reject) => {
        storage.eliminar( dato )
        resolve( dato )
    })
}

module.exports = {
    insertar_usuario,
    obtener_usuario,
    actualizar_usuario,
    eliminar_usuario
}