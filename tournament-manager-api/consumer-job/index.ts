import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "tournament-consumer",
  brokers: ["kafka:9092"],
});

const consumer = kafka.consumer({ groupId: "tournament-group" });

async function run() {
  await consumer.connect();
  await consumer.subscribe({ topic: "mi-topic", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const value = message.value?.toString();
      console.log(`Registros encolados: ${value}`);
    },
  });

  process.stdin.resume();
}

run().catch(error => {
  console.error("Error in consumer:", error);
  process.exit(1);
});