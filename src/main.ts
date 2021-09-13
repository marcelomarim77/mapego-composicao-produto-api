import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ResultInterceptor } from './core/interceptors/result.interceptor';
import { AppExceptionFilter } from './core/filters/app-exception.filter';
import * as dotenv from 'dotenv';
import { getEnvironment } from './core/utils/util';

async function bootstrap() {

    // Carregar variaveis de ambiente do arquivo .env
    let nodeEnv = getEnvironment('NODE_ENV');
    if (nodeEnv == null || nodeEnv === 'development') {
        dotenv.config();
        nodeEnv = getEnvironment('NODE_ENV');
    }

    // Configurar o app
    const app = await NestFactory.create(AppModule);
//    app.useGlobalInterceptors(new ResultInterceptor());
//    app.useGlobalFilters(new AppExceptionFilter());
    app.enableCors();

    await app.listen(getEnvironment('PORT') || 3000);
}
bootstrap();
