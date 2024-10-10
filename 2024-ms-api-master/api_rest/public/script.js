function guardar() {
    let nombre_ = document.getElementById('nombre').value;
    let apellido_ = document.getElementById('apellido').value;

    let data = { nombre: nombre_, apellido: apellido_ };

    return new Promise((resolve, reject) => {
        const request_options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        };

        fetch('http://localhost:3000/usuario', request_options)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error en la red');
                }
                return response.json();
            })
            .then((data) => {
                listar(); // Actualiza la lista de usuarios después de guardar
                resolve(data);
            })
            .catch((error) => reject(`[error]: ${error}`));
    });
}

function guardar_usuario() {
    guardar()
        .then(() => {
            alert('Registro exitoso.');
            document.getElementById('nombre').value = ''; // Limpiar campos
            document.getElementById('apellido').value = '';
        })
        .catch((error) => {
            alert('Error al ingresar.');
            console.error(error);
        });
}

function listar() {
    fetch('http://localhost:3000/usuario')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error al obtener usuarios');
            }
            return response.json();
        })
        .then((data) => { // Cambié `usuarios` a `data`
            const usuarios = data.body; // Accedemos al array de usuarios en `body`
            const tabla = document.getElementById('tabla-usuarios').getElementsByTagName('tbody')[0];
            tabla.innerHTML = ''; // Limpiar tabla antes de rellenar

            // Verificamos que `usuarios` sea un array
            if (Array.isArray(usuarios)) {
                usuarios.forEach((usuario) => {
                    const fila = document.createElement('tr');
                    fila.innerHTML = `<td>${usuario.nombre}</td><td>${usuario.apellido}</td><td>${usuario._id}</td>`;
                    tabla.appendChild(fila);
                });
            } else {
                console.error('La respuesta no es un array:', usuarios);
            }
        })
        .catch((error) => {
            console.error(`[error]: ${error}`);
        });
}

// Llamar a listar al cargar la página para mostrar usuarios
document.addEventListener('DOMContentLoaded', listar);
