import { consumeMessages, OrderMessage } from "./message_queue_interacter";



function onMessageRecieved(message: OrderMessage){
    console.log(message)
}



await consumeMessages(onMessageRecieved)