import { ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

export const getMailerConfig = async (configService: ConfigService) => {
  return {
    transport: {
      host: configService.get('MAIL_HOST'),
      secure: true,
      auth: {
        user: configService.get('MAIL_USER'),
        pass: configService.get('MAIL_PASSWORD'),
      },
      defaults: {
        from: `"No Reply" <${configService.get('MAIL_FROM')}>`,
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    },
  };
};
