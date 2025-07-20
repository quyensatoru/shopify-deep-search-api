import { registerAs } from '@nestjs/config'

export type QueueConfig = {
    uri: string;
}

export default registerAs<QueueConfig>('queue', () => ({
    uri: process.env.AMQP_URI || ""
}))