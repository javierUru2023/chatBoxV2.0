const socket = io()


let user;
const input = document.getElementById("chatBox")
const logHbs = document.getElementById("messageLogs")


/* SweetAlert2 */

Swal.fire({
    icon: 'info',
    title: "Identifícate con un nickname",
    input: "text",
    text: "Ingresa tu nombre de usuario para identificarte en el chat",

    inputValidator: (value) => {
        if (!value) {
            return 'Por favor ingresa un nickname';
        } else {

            socket.emit("NewUser connected", {user: value});
 
        }
    },

    allowOutsideClick: false,

  
}).then((result) => {
    user = result.value;

    // Cargar el nombre en el html

    document.getElementById("myName").innerHTML = user;

});

// Evento para capturar el enter y enviar el mensaje

input.addEventListener("keyup", evt => {
    if (evt.key === "Enter") {

        let newData = chatBox.value.trim();

        if (newData.length > 0) {

            socket.emit("message", { user: user, message: newData });
            chatBox.value = "";

        } else {

            Swal.fire({

                icon: 'warning',
                title: "Mensaje vacío",
                text: "No puedes enviar un mensaje vacío.",

            })

        }

    }
})

// Escuchar los mensajes del servidor

socket.on("messageLogs", data => {

    let logs = "";

    data.forEach(log => {

        logs += `<div><span><strong>${log.user}</strong></span>: ${log.message}<br/></div>`;

    })
    
    document.getElementById("messageLogs").innerHTML = logs;
    
});

// Escuchar cuando un nuevo usuario se conecta

socket.on("NewUser connected", (data) => {

    let message = `<div><em>El usuario <strong>${data.user}</strong> se ha unido al chat.</em><br/></div>`;

    document.getElementById("messageLogs").innerHTML += message;

});

// Close chatBox when user presses button Close ChatBox

const closeChatBox = document.getElementById("CloseChatBox");

closeChatBox.addEventListener("click", evt => {

    socket.emit('CloseChatBox', { close: "true"});
    logHbs.innerHTML = "";

});



