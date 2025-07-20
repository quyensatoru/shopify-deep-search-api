
// rabbitmq.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import * as amqp from 'amqplib';
import {ConfigService} from "@nestjs/config";
import {AllConfig} from "../config/config.type";

@Injectable()
export class QueueService implements OnModuleInit {
    private connection: amqp.ChannelModel;
    private channel: amqp.Channel;

    constructor(private readonly configService: ConfigService<AllConfig>) {}

    async onModuleInit() {
        this.connection = await amqp.connect(this.configService.get("queue.uri", { infer: true }) as string);
        this.channel = await this.connection.createChannel();
    }

    async sendToQueue<T>(queueName: string, payload: T) {
        await this.channel.assertQueue(queueName, { durable: true });
        this.channel.sendToQueue(queueName, Buffer.from(JSON.stringify(payload)));
    }

     async consume<T>(queueName: string, handler: (channel: amqp.Channel, data: T) => void) {
        await this.channel.assertQueue(queueName, { durable: true });
        await this.channel.consume(queueName, (msg) => {
            if (msg !== null) {
                const data: T = JSON.parse(msg.content.toString());
                handler(this.channel, data);
                this.channel.ack(msg);
            }
        });
    }
}
