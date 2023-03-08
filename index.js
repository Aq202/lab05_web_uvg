'use strict'

const messagesData = []

/*Estilos de la página */
document.body.style.cssText = `
    display:flex;
    justify-content:center;
    align-items:center;
    
`;




const addPhoneComponent = (container) => {

    const $phone = document.createElement("div")

    $phone.style.cssText = `
    width: 350px;
    height: 600px;
    background-color: black;
    border-radius:20px;
    padding:7px;
    `

    const $phoneContainer = document.createElement("div")

    $phoneContainer.style.cssText = `
    background-color:white;
    width:100%;
    height:100%;
    border-radius:inherit;
    overflow:hidden;    
    `
    $phone.appendChild($phoneContainer)


    addCamera($phoneContainer)

    addChatApp($phoneContainer)


    container.appendChild($phone)
}

const addCamera = container => {
    const $cameraContainer = document.createElement("div")

    $cameraContainer.style.cssText = `
    background-color:black;
    width: 40%;
    height: 20px;
    margin:auto;
    border-radius: 0  0 10px 10px;
    display:flex;
    justify-content:center;
    align-items:center;
    gap: 15px;
    box-sizing: border-box;
    padding-bottom:3px;
    z-index:1;
    position:relative;
    `

    const $camera = document.createElement("div")

    $camera.style.cssText = `
    background-color:#223657;
    width: 10px;
    height: 10px;
    border-radius:50%;
    `

    const $microphone = document.createElement("div")

    $microphone.style.cssText = `
    background-color:#2f3134;
    width: 60px;
    height: 5px;
    border-radius: 10px;
    `



    $cameraContainer.appendChild($camera)
    $cameraContainer.appendChild($microphone)
    container.appendChild($cameraContainer)

}


const addChatApp = (container) => {

    const $chatAppContainer = document.createElement("div")

    $chatAppContainer.style.cssText = `
  
    width:100%;
    height: 100%;
    margin-top: -20px;
    display:grid;
    grid-template-rows: min-content 1fr min-content;
    
    
    `
    addChatHeader($chatAppContainer)
    addChatMessagesList($chatAppContainer)
    addChatInputSection($chatAppContainer)

    container.appendChild($chatAppContainer)

}

const addChatHeader = container => {
    const $chatHeader = document.createElement("div")

    $chatHeader.style.cssText = `
    background-color:#00425A;
    height:55px;

    `
    container.appendChild($chatHeader)
}

const addChatMessagesList = container => {
    const $messagesListContainer = document.createElement("div")
    $messagesListContainer.classList.add("messages-list-container")

    $messagesListContainer.style.cssText = `
    overflow-y:auto;
    overflow-x:none;
    `

    const $messagesList = document.createElement("ul")
    $messagesList.classList.add("messages-list")

    $messagesList.style.cssText = `
    width:100%;
    display:flex;
    flex-direction:column;
    list-style-type: none;
    padding: 10px 25px;
    box-sizing:border-box;
    gap:10px;
    margin:0;
    min-height:calc(100% - 20px);
    justify-content:flex-end;
    `



    $messagesListContainer.appendChild($messagesList)
    container.appendChild($messagesListContainer)

}


const addChatInputSection = container => {

    const $chatInputSection = document.createElement("div")

    $chatInputSection.style.cssText = `
    display:grid;
    grid-template-columns: 1fr min-content;
    padding: 15px 20px;
    gap: 15px;
    background-color:#f2f2f2;
    height:fit-content;
    box-sizing:border-box;
    `

    const $chatInput = document.createElement("textarea")

    $chatInput.style.cssText = `
    outline:none;
    border:none;
    border-radius: 7px;
    box-shadow: 0 0 3px 1px #0000001d;
    resize:vertical;
    min-height: 50px;
    max-height:200px;
    `

    $chatInput.addEventListener("keyup", e => {
        if (e.key === "Enter") addNewMessageEvent()
    })


    const $sendButton = document.createElement("button")

    $sendButton.style.cssText = `
    outline: none;
    padding: 0;
    cursor: pointer;
    background: none;
    border: 0;
    background-image: url(./icons/send.svg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    width:25px;
    `

    $sendButton.addEventListener("click", e => addNewMessageEvent())


    $chatInputSection.appendChild($chatInput)
    $chatInputSection.appendChild($sendButton)
    container.appendChild($chatInputSection)
}

const ensureDoubleNumber = number => number < 10 ? "0" + number : number

const areEqualsDate = (date1, date2) => {
    const parsedDate1 = new Date(date1)
    const parsedDate2 = new Date(date2)

    if (parsedDate1.getDate() !== parsedDate2.getDate()) return false
    if (parsedDate1.getMonth() !== parsedDate2.getMonth()) return false
    if (parsedDate1.getFullYear() !== parsedDate2.getFullYear()) return false

    return true
}
/**
 * 
 * @param {*} ownMesage True: es un mensaje enviado por el usuario.
 */
const addMessageComponent = (ignoreScrollPosition, ...messages ) => {

    const $messagesList = document.querySelector(".messages-list")
    const $messagesListContainer = document.querySelector(".messages-list-container")

    if (!$messagesList || !$messagesListContainer) return

    const fragment = document.createDocumentFragment()
    console.log(messages)
    messages?.forEach(msg => {

        const { user, message, date, ownMesage } = msg

        const parsedMessage = parsedMessage?.trim()

        const lastMessageData = messagesData[messagesData.length - 1] || null

        if (!(parsedMessage.length > 0)) return //Evitar mensajes vacios

        const $message = document.createElement("li")

        $message.style.cssText = `
        max-width:85%;
        width:fit-content;
        padding: 10px;
        background-color:#e3e3e3;
        border-radius:10px;
        box-shadow: 0 0 3px 1px #0000001d;
        display: flex;
        flex-direction: column;
        gap:5px;
        position:relative;
        text-transform: capitalize;
        overflow:none;
        word-break:break-all;
    `

        if (ownMesage) {
            $message.style.backgroundColor = "rgb(189 214 223)"
            $message.style.alignSelf = "end"
        }

        //añadir usuario si no es consecutivo a otro mensaje del mismo usuario
        if (!lastMessageData || lastMessageData.user !== user || !areEqualsDate(lastMessageData.date, date)) {
            const $userName = document.createElement("span")
            $userName.style.cssText = `
        font-family:helvetica;
        font-weight:bold;
        `
            $userName.innerText = user
            $message.appendChild($userName)
        }


        //añadir cuerpo del mensaje

        const $messageText = document.createElement("p")
        $messageText.innerText = parsedMessage
        $messageText.style.cssText = `
    margin:0;
    font-family:helvetica;

    `
        $message.appendChild($messageText)


        //añadir hora
        const parsedDate = new Date(date)
        if (!isNaN(parsedDate)) {

            const $messageTime = document.createElement("span")
            $messageTime.innerText =
                `${ensureDoubleNumber(parsedDate.getHours())}:${ensureDoubleNumber(parsedDate.getMinutes())}`
            $messageTime.style.cssText = `
        font-family:helvetica;
        font-size:12px;
        align-self: end;
        font-weight:bold;
        color:#666666;
        `
            $message.appendChild($messageTime)
        }


        //agregar elemento de fecha (si no existe y hay algun mensaje)
        if (!lastMessageData || !areEqualsDate(lastMessageData.date, date))
            addDateSeparator(fragment, date)

        //añadir data a la lista de mensajes
        messagesData.push({ user, message: parsedMessage, date, ownMesage })

        fragment.appendChild($message) //agregar mensaje al fragment




    })

    //Si se especifico ignorar la posicion del scroll o cuando se encuentra hasta el fondo
    const sendScrollToBottom = ignoreScrollPosition === true || ($messagesListContainer.clientHeight + $messagesListContainer.scrollTop) >= $messagesListContainer.scrollHeight - 5


    $messagesList.appendChild(fragment) //Agregar conjunto de mensajes al dom

    //Enviar scroll al fondo si corresponde
    if (sendScrollToBottom)
        $messagesListContainer.scrollTop = $messagesListContainer.scrollHeight
}




//

const getStoredUsers = () => {
    const users = localStorage.getItem("users") //Obtener valores anteriores del ls
    return users?.split(",") || []
}

const saveNewUser = userName => {
    const usersSet = new Set(getStoredUsers())
    usersSet.add(userName.trim().toLowerCase())
    localStorage.setItem("users", Array.from(usersSet).join(",")) //guardar en ls incluyendo al nuevo
}

const addNewMessageEvent = () => {
    const textarea = document.querySelector("textarea")

    if (!textarea) return

    const text = textarea.value.trim()

    if (text.length === 0) return

    const usersList = getStoredUsers()
    let user = usersList[usersList.length - 1]
    if (!user) {
        user = prompt("Ingresa tu nombre de usuario:")
        saveNewUser(user)
    }

    uploadMessageToServer(user, text).then(res => {
        if(res) loadDataFromServer()
    })


    textarea.value = "" //limpiar caja de texto
}

const addDateSeparator = (container, date) => {

    const parsedDate = new Date(date)
    if (isNaN(parsedDate)) return

    const $dateSeparator = document.createElement("li")
    $dateSeparator.innerText = `${ensureDoubleNumber(parsedDate.getDate())}/${ensureDoubleNumber(parsedDate.getMonth() + 1)}/${ensureDoubleNumber(parsedDate.getFullYear())}`

    $dateSeparator.style.cssText = `
    width:fit-content;
    align-self:center;
    background-color:rgb(0 66 90);
    color:white;
    font-family:helvetica;
    padding:5px 10px;
    font-size:14px;
    border-radius:15px;
    `

    container.appendChild($dateSeparator)
}


const loadDataFromServer = async () => {

    const usersList = getStoredUsers()
    const currentUser = usersList[usersList.length - 1]

    try {
        const r = await fetch("http://uvgenios.online/api/messages")
        const res = await r.json()
       
        const messages = res.map(msg => ({ user: msg.user, message: msg.text, date: msg.created_on, ownMesage: currentUser === msg.user?.trim().toLowerCase() }))

        addMessageComponent(false, ...messages)

    } catch (ex) {
        console.error("Error al obtener data del servidor. ", ex)
    }

}

const uploadMessageToServer = async (user, text) => {

    try {
        const body = {
            text,
            user
        }
        const response = await fetch('http://uvgenios.online/api/messages', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.ok === true
    } catch (ex) {
        console.error("Error al crear nuevo mensaje. ", ex)
        return false
    }
}


const userName = "anonimo"

saveNewUser(userName)

addPhoneComponent(document.body)

loadDataFromServer()