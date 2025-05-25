import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PerformanceInterceptor } from './interceptors/performance.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new PerformanceInterceptor());
  const config = new DocumentBuilder()
    .setTitle('Users Benchmark')
    .setDescription('')
    .setVersion('1.0')
    .addTag('benchmark')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();