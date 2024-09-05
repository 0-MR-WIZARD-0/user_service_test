import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { createDataSource } from '../config/database.config';
import { User } from 'src/user/user.entity';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const configService = app.get(ConfigService);

  const dataSource = createDataSource(configService);
  await dataSource.initialize();
  
  const userRepository = dataSource.getRepository(User);

  const users: Partial<User>[] = [];
  const totalUsers = 50;

  for (let i = 1; i <= totalUsers; i++) {
    users.push({
      firstName: `FirstName${i}`,
      lastName: `LastName${i}`,
      age: Math.floor(Math.random() * 100),
      gender: Math.random() > 0.5 ? 'Male' : 'Female',
      hasProblems: Math.random() > 0.5,
    });
  }

  await userRepository.save(users);
  console.log(`Inserted ${totalUsers} users`);

  await dataSource.destroy();
  await app.close();
}

seed().catch((error) => console.error('Seeding failed:', error));
