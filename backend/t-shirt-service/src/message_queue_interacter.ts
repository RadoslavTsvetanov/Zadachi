import amqp from 'amqplib';

export interface OrderMessage {
  product_id: string;
  orderer: string;
}

const QUEUE_NAME = 'orders';

export async function consumeMessages(onMessageRecieved: (message: OrderMessage) => void ) {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME, { durable: true });

    console.log(`Waiting for messages in ${QUEUE_NAME}. To exit press CTRL+C`);

    channel.consume(QUEUE_NAME, (msg) => {
      if (msg !== null) {
        const orderMessage: OrderMessage = JSON.parse(msg.content.toString());
        console.log(`Received message: ${JSON.stringify(orderMessage)}`);
        onMessageRecieved(orderMessage)
        // Call the function to issue an order
        (orderMessage);

        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error('Error in consuming messages:', error);
  }
}
