import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandBus } from '@nestjs/cqrs';
import { Email, connect } from 'node-mailjet';

import { SendEmailDto } from './dto/send-email.dto';
import { emailTemplates } from '../templates/email-templates';
import { LogEmailToDbCommand } from './commands/impl';
import { IMailjetEmail } from './interfaces/mailjet-email.interface';
import { SuccessResponseModel } from '../models/success-response.model';
import { IEmailObject } from '../interfaces/email-object.interface';

@Injectable()
export class MailjetService {
  private mailjetClient: Email.Client;

  constructor(
    private configService: ConfigService,
    private readonly commandBus: CommandBus,
  ) {
    this.mailjetClient = connect(
      this.configService.get('MJ_APIKEY_PUBLIC') || 'missing',
      this.configService.get('MJ_APIKEY_PRIVATE') || 'missing',
    );
  }

  async sendConfirmCreateAccountEmail(
    sendEmailDto: SendEmailDto,
  ): Promise<SuccessResponseModel> {
    const { user_email, token } = sendEmailDto;
    const email_type = 'confirmCreateAccount';

    const confirmAccountEmailTemplate = emailTemplates.find(
      (template) => template.name === email_type,
    );

    const message: IMailjetEmail = {
      To: [{ Email: user_email }],
      From: { Email: 'info@equmedia.be', Name: 'Equmedia' },
      Subject: confirmAccountEmailTemplate.subject,
      TextPart: confirmAccountEmailTemplate.text,
      HTMLPart: `<a href="${this.configService.get(
        'SERVER_URL',
      )}/local-auth/confirm/${token}">Click me to confirm</a>`,
    };

    const confirmAccountEmail: IEmailObject = {
      user_email,
      email_type,
      subject: confirmAccountEmailTemplate.subject,
      text: confirmAccountEmailTemplate.text,
    };

    try {
      await this.mailjetClient
        .post('send', { version: 'v3.1' })
        .request({ Messages: [message] })
        .then(() => {
          this.commandBus.execute(new LogEmailToDbCommand(confirmAccountEmail));
        });
    } catch (error) {
      console.log(error);
    }
    return { response: 'Confirmation sent' };
  }

  async sendForgotPasswordEmail(
    sendEmailDto: SendEmailDto,
  ): Promise<SuccessResponseModel> {
    const { user_email, token } = sendEmailDto;
    const email_type = 'forgotPassword';

    const forgotPasswordEmailTemplate = emailTemplates.find(
      (template) => template.name === email_type,
    );

    const message: IMailjetEmail = {
      To: [{ Email: user_email }],
      From: { Email: 'info@equmedia.be', Name: 'Equmedia' },
      Subject: forgotPasswordEmailTemplate.subject,
      TextPart: forgotPasswordEmailTemplate.text,
      HTMLPart: `<a href="${this.configService.get(
        'SERVER_URL',
      )}/auth/reset/${token}">Click me to reset your password</a>`,
    };

    const resetPasswordEmail: IEmailObject = {
      user_email,
      email_type,
      subject: forgotPasswordEmailTemplate.subject,
      text: forgotPasswordEmailTemplate.text,
    };

    try {
      await this.mailjetClient
        .post('send', { version: 'v3.1' })
        .request({ Messages: [message] })
        .then(() => {
          this.commandBus.execute(new LogEmailToDbCommand(resetPasswordEmail));
        });
    } catch (error) {
      console.log(error);
    }

    return { response: 'Forgot password email sent' };
  }

  async sendSetNewPasswordEmail(
    sendEmailDto: SendEmailDto,
  ): Promise<SuccessResponseModel> {
    const { user_email } = sendEmailDto;
    const email_type = 'setNewPassword';

    const setNewPasswordEmailTemplate = emailTemplates.find(
      (template) => template.name === email_type,
    );

    const message: IMailjetEmail = {
      To: [{ Email: user_email }],
      From: { Email: 'info@equmedia.be', Name: 'Equmedia' },
      Subject: setNewPasswordEmailTemplate.subject,
      TextPart: setNewPasswordEmailTemplate.text,
    };

    const setNewPasswordEmail: IEmailObject = {
      user_email,
      email_type,
      subject: setNewPasswordEmailTemplate.subject,
      text: setNewPasswordEmailTemplate.text,
    };

    try {
      await this.mailjetClient
        .post('send', { version: 'v3.1' })
        .request({ Messages: [message] })
        .then(() => {
          this.commandBus.execute(new LogEmailToDbCommand(setNewPasswordEmail));
        });
    } catch (error) {
      console.log(error);
    }

    return { response: 'New password set' };
  }

  async sendConfirmSubscriptionEmail(
    sendEmailDto: SendEmailDto,
  ): Promise<SuccessResponseModel> {
    const { user_email } = sendEmailDto;
    const email_type = 'confirmSubscription';

    const confirmSubscriptionEmailTemplate = emailTemplates.find(
      (template) => template.name === email_type,
    );

    const message: IMailjetEmail = {
      To: [{ Email: user_email }],
      From: { Email: 'info@equmedia.be', Name: 'Equmedia' },
      Subject: confirmSubscriptionEmailTemplate.subject,
      TextPart: confirmSubscriptionEmailTemplate.text,
    };

    const confirmSubscriptionEmail: IEmailObject = {
      user_email,
      email_type,
      subject: confirmSubscriptionEmailTemplate.subject,
      text: confirmSubscriptionEmailTemplate.text,
    };

    try {
      await this.mailjetClient
        .post('send', { version: 'v3.1' })
        .request({ Messages: [message] })
        .then(() => {
          this.commandBus.execute(
            new LogEmailToDbCommand(confirmSubscriptionEmail),
          );
        });
    } catch (error) {
      console.log(error);
    }

    return { response: 'Subscription confirmation has been sent' };
  }

  async sendDeleteAccountMail(
    sendEmailDto: SendEmailDto,
  ): Promise<SuccessResponseModel> {
    const { user_email } = sendEmailDto;
    const email_type = 'deleteAccount';

    const deleteAccountEmailTemplate = emailTemplates.find(
      (template) => template.name === email_type,
    );

    const message: IMailjetEmail = {
      To: [{ Email: user_email }],
      From: { Email: 'info@equmedia.be', Name: 'Equmedia' },
      Subject: deleteAccountEmailTemplate.subject,
      TextPart: deleteAccountEmailTemplate.text,
    };

    const deleteAccountEmail: IEmailObject = {
      user_email,
      email_type,
      subject: deleteAccountEmailTemplate.subject,
      text: deleteAccountEmailTemplate.text,
    };

    try {
      await this.mailjetClient
        .post('send', { version: 'v3.1' })
        .request({ Messages: [message] })
        .then(() => {
          this.commandBus.execute(new LogEmailToDbCommand(deleteAccountEmail));
        });
    } catch (error) {
      console.log(error);
    }

    return { response: 'Delete account email has been sent' };
  }
}
