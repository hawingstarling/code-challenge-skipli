import { autoInjectable } from "tsyringe";
import nodemailer from 'nodemailer';
import { MailDefaultEmail, MailDefaultName, mailerConfig } from "@/config";
import fs from 'node:fs/promises';
import Handlebars from "handlebars";

@autoInjectable()
export class MailerService {
  private readonly transporter: nodemailer.Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport(mailerConfig);
  }

  async sendMail({
    templatePath,
    context,
    ...mailOptions
  }: nodemailer.SendMailOptions & {
    templatePath: string;
    context: Record<string, unknown>;
  }): Promise<void> {
    let html: string | undefined;
    if (templatePath) {
      const template = await fs.readFile(templatePath, 'utf-8');
      html = Handlebars.compile(template, {
        strict: true,
      })(context);
    }

    await this.transporter.sendMail({
      ...mailOptions,
      from: mailOptions.from
        ? mailOptions.from
        : `"${
            MailDefaultName
          }" <${MailDefaultEmail}>`,
      html: mailOptions.html ? mailOptions.html : html,
    });
  }
}