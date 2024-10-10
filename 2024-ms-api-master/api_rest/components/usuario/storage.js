const model = require('./model')

async function insertar_usuario(dato) {
    const resultado = await new model(dato)
    return resultado.save()
}

async function obtener_usuario(dato) {
     let filter = {}

     if (dato.apellido) {
        filter = { apellido: dato.apellido }
     }
     
     const resultado = await model.find( filter )
     return resultado
}

async function actualizar_usuario( dato ) {
    const objeto = await model.findOne( {_id: dato.id} )

    if ( objeto ) {
        objeto.nombre = dato.nombre
    
        return resultado = await objeto.save()    
    } else {
        return null
    }
}

async function eliminar_usuario( dato ) {
    return await model.deleteOne({apellido: dato.apellido})
}

async function deleteUser(dato) {
    let filter = {}

    if (dato.apellido) {
       filter = { apellido: dato.apellido }
    }

    console.log("ENTRA DELETE0");
    const resultado = await db.collection('Usuario').deleteOne(filter);
    return resultado;
}

module.exports = {
    insertar:insertar_usuario,
    obtener:obtener_usuario,
    actualizar:actualizar_usuario,
    eliminar:eliminar_usuario,
}