"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mailersend_1 = require("mailersend");
const html_to_text_1 = require("html-to-text");
const config_1 = require("../config");
class Email {
    to;
    firstName;
    url;
    from;
    constructor(user, url) {
        this.to = user.email;
        this.firstName = user.name.split(' ')[0];
        this.url = url || '';
        this.from = `MAS`;
    }
    async sendEmail(html, subject) {
        const mailersend = new mailersend_1.MailerSend({
            apiKey: config_1.env_vars.email_key,
        });
        const recipients = [new mailersend_1.Recipient(this.to, 'Recipient')];
        const sender = new mailersend_1.Sender(config_1.env_vars.sender, 'Sender');
        const emailParams = new mailersend_1.EmailParams()
            .setFrom(sender)
            .setTo(recipients)
            .setSubject(subject)
            .setHtml(html)
            .setText((0, html_to_text_1.htmlToText)(html));
        await mailersend.email.send(emailParams);
    }
    async sendWelcome() {
        const html = `<html>
        <body>
          <h1>Welcome to the NameProject Family!</h1>
          <p>Hi ${this.firstName},</p>
          <p>We're excited to have you on board. Click the link below to get started:</p>
          <a href="${this.url}">Get Started</a>
          <p>Best regards,<br>Your Company Team</p>
        </body>
      </html>`;
        await this.sendEmail(html, 'Welcome to the NameProject Family!');
    }
    async sendPasswordReset(resetCode) {
        const html = `<html>
        <body>
          <h1>Password Reset Request</h1>
          <p>Hi ${this.firstName},</p>
          <p>You requested to reset your password. Use the following code to reset it:</p>
          <h2>${resetCode}</h2>
          <p>This code is valid for only 10 minutes.</p>
          <p>If you didn't request this, please ignore this email.</p>
          <p>Best regards,<br>Your Company Team</p>
        </body>
      </html>`;
        await this.sendEmail(html, 'Your password reset token (valid for only 10 minutes)');
    }
}
exports.default = Email;
//# sourceMappingURL=email.js.map