import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getEnvironment } from './core/utils/util';
import { ComposicaoProdutoRepository } from './repositories/composicao-produto-repository';

@Module({
    imports: [
        HttpModule,
        TypeOrmModule.forRootAsync({
            useFactory: async (): Promise<TypeOrmModuleOptions> => ({
                type: 'postgres',
                host: getEnvironment('DB_HOST', true),
                username: getEnvironment('DB_USERNAME', true),
                password: getEnvironment('DB_PASS', true),
                database: getEnvironment('DB_NAME', true),
                entities: ['dist/**/*.entity{.ts,.js}'],
                synchronize: false
            })
          }),
        TypeOrmModule.forFeature([
            ComposicaoProdutoRepository
        ])
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
