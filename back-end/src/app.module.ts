import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { ClientModule } from './client/client.module';




@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USER'),
        password: String(config.get('DB_PASS')),  
        database: config.get<string>('DB_NAME'),
        autoLoadEntities: true,
        
        synchronize: true,
      }),
    }),
   ProductModule,
   OrderModule,
   ClientModule,
  ],
 
})
export class AppModule {}