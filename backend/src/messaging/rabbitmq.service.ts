import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { env } from '../config/env';

@Injectable()
export class RabbitMQService implements OnModuleInit, OnModuleDestroy {
  private connection: any;
  private channel: any;
  private readonly logger = new Logger(RabbitMQService.name);

  async onModuleInit() {
    try {
      const amqp = await import('amqplib');
      this.connection = await amqp.connect(env.rabbitMqUrl);
      this.channel = await this.connection.createChannel();
    } catch (err) {
      this.logger.error('Failed to connect to RabbitMQ', err as Error);
    }
  }

  async onModuleDestroy() {
    try {
      await this.channel?.close();
      await this.connection?.close();
    } catch (err) {
      this.logger.error('Error closing RabbitMQ connection', err as Error);
    }
  }

  async publish(queue: string, message: unknown) {
    if (!this.channel) {
      this.logger.warn('RabbitMQ channel not initialized');
      return;
    }
    const buffer = Buffer.from(JSON.stringify(message));
    await this.channel.assertQueue(queue, { durable: true });
    this.channel.sendToQueue(queue, buffer);
  }
}
