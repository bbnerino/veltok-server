import { MemberModule } from './member/member.module';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { CafeModule } from './cafe/cafe.module';
import { ApolloDriver } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleModule } from './article/article.module';
@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'heyhey.i234.me',
      port: 3307,
      username: 'user',
      password: 'Qwer1234!@',
      database: 'nest-db',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    CafeModule,
    MemberModule,
    ArticleModule,
  ],
})
export class AppModule {}
