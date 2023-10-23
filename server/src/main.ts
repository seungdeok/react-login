import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  app.enableCors({
    origin: /^(http:\/\/localhost:[0-9]{4})|(http:\/\/127.0.0.1:[0-9]{4})$/,
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: true,
  });

  app.use(
    session({
      secret: 'react-login-server',
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 24 * 6 * 60 * 10000,
        sameSite: 'lax',
        httpOnly: true,
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3000);
}
bootstrap();
