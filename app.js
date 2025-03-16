// Array para almacenar los nombres de amigos
let amigos = [];

// Función para agregar un amigo
function agregarAmigo() {
    const inputAmigo = document.getElementById('amigo');
    const nombreAmigo = inputAmigo.value.trim();
    
    // Validar que el campo no esté vacío
    if (nombreAmigo === "") {
        alert("Por favor, inserte un nombre.");
        return; // Detiene la ejecución de la función
    }
    
    // Validar que el nombre no esté duplicado
    if (amigos.includes(nombreAmigo)) {
        alert(`El nombre "${nombreAmigo}" ya está en la lista.`);
        return;
    }
    
    // Agregar el nombre al array de amigos
    amigos.push(nombreAmigo);
    
    // Limpiar el campo de entrada
    inputAmigo.value = "";
    
    // Actualizar la lista en el HTML
    actualizarLista();
}

// Función para actualizar la lista de amigos en la interfaz
function actualizarLista() {
    const listaAmigos = document.getElementById('listaAmigos');
    
    // Limpiar el contenido actual de la lista
    listaAmigos.innerHTML = ""; // Borra cualquier contenido previo dentro del contenedor de la lista
    
    // Recorrer el array con un ciclo for
    for (let i = 0; i < amigos.length; i++) {
        const li = document.createElement('li');
        li.textContent = amigos[i];
        
        // Agregar botón para eliminar este amigo
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "Eliminar";
        deleteBtn.className = "delete-button";
        deleteBtn.onclick = function() {
            eliminarAmigo(i);
        };
        
        li.appendChild(deleteBtn);
        listaAmigos.appendChild(li);
    }
    
    // Mostrar u ocultar el botón de borrar todo según si hay amigos en la lista
    const borrarTodoBtn = document.getElementById('borrarTodoBtn');
    if (borrarTodoBtn) {
        borrarTodoBtn.style.display = amigos.length > 0 ? 'block' : 'none';
    }
}

// Función para eliminar un amigo de la lista
function eliminarAmigo(index) {
    amigos.splice(index, 1); // Elimina el amigo del array
    actualizarLista(); // Actualiza la interfaz
    
    // Limpiar el resultado anterior si existe
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = "";
}

// Función para borrar todos los amigos de la lista
function borrarTodo() {
    amigos = []; // Vacía el array
    actualizarLista(); // Actualiza la interfaz
    
    // Limpiar el resultado anterior
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = "";
}

// Función para seleccionar un amigo aleatorio
function sortearAmigo() {
    // Validar que haya amigos disponibles
    if (amigos.length === 0) { // Comprueba si el array 'amigos' está vacío
        alert("No hay amigos disponibles para sortear. Agrega al menos uno.");
        return;
    }
    
    // Genera un índice aleatorio
    const indiceAleatorio = Math.floor(Math.random() * amigos.length); // Genera un número aleatorio entre 0 y la longitud del array mencionado
    
    // Obtener el nombre sorteado
    const amigoSorteado = amigos[indiceAleatorio]; // Usa el índice aleatorio para obtener un nombre del array
    
    // Mostrar el resultado en el HTML con animación
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = `<div class="winner-announcement">¡Amigo sorteado: <strong>${amigoSorteado}</strong>!</div>`;
    
    // Agregar animación
    const winnerAnnouncement = resultado.querySelector('.winner-announcement');
    winnerAnnouncement.classList.add('animate');
}

// Agregar evento de tecla para el input (presionar Enter para agregar)
document.addEventListener('DOMContentLoaded', function() {
    const inputAmigo = document.getElementById('amigo');
    inputAmigo.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            agregarAmigo();
        }
    });
    
    // Crear y agregar el botón para borrar todo
    const buttonContainer = document.querySelector('.button-container');
    const borrarTodoBtn = document.createElement('button');
    borrarTodoBtn.id = 'borrarTodoBtn';
    borrarTodoBtn.className = 'button-clear';
    borrarTodoBtn.textContent = 'Borrar Todo';
    borrarTodoBtn.onclick = borrarTodo;
    borrarTodoBtn.style.display = 'none'; // Oculto inicialmente
    buttonContainer.appendChild(borrarTodoBtn);
});