import { ConfigService } from '@nestjs/config';
import { User } from '../user/user.entity';
import { DataSource } from 'typeorm';

export const createDataSource = (configService: ConfigService): DataSource => {
    return new DataSource({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [User],
        synchronize: true,
    })
}
