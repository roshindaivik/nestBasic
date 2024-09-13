import { Module } from '@nestjs/common';
import { RediscacheService } from './rediscache.service';
import Redis from 'ioredis';

@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => {
        return new Redis({
          host: process.env.REDIS_HOST || 'localhost',
          port: parseInt(process.env.REDIS_PORT || '6379'),
        });
      },
    },
    RediscacheService,
  ],
  exports: [RediscacheService],
})
export class RediscacheModule {}
