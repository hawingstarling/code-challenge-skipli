import { autoInjectable } from "tsyringe";
import { MailerService } from "../mailer";
import { MailData } from "./interfaces/mail-data.interface";
import { MaybeType } from "@/utils/maybe.type";
import { app } from "@/config";
import { resolveTemplatePath } from "@/utils/resolve-template-path";
import path from "path";
import { InternalError } from "@/core/ApiError";

@autoInjectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
  ) {}

  async verify(mailData: MailData<{ hash: string }>): Promise<void> {
    let emailVerifyTitle: MaybeType<string>;

    try {
      await this.mailerService.sendMail({
        to: mailData.to,
        subject: "Let's get code your Trip57 account!",
        text: 'Please get your code 😀 The code is valid for 1 minutes. Please do not share this code with anyone.',
        templatePath: resolveTemplatePath('code.hbs'),
        context: {
          title: emailVerifyTitle,
          actionTitle: emailVerifyTitle,
          app_name: app,
          code: mailData.data.hash,
          logoUrl: 'cid:skipli@logo',
          userName: 'Treller',
          facebookPage: 'skiplirestaurants',
          youtubeHandle: 'UC2oEyUd8268RTv6O0rd54TA',
          tiktokHandle: 'skiplimarketing',
          linkinHandle: 'skiplinow',
          supportPhone: '(678) 999-1039',
          supportEmail: 'support@skiplinow.com',
          subject: 'Verify code',
        },
        attachments: [
          {
            filename: 'hcm57-logo.png',
            path: path.join(process.cwd(), 'public', 'skipli.svg'),
            cid: 'skipli@logo',
          },
        ],
      });
    } catch (error) {
      console.error('[SendMail Error]', error);
      throw new InternalError(
        'sendMailFailed'
      )
    }
  }
}