"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require("nodemailer");
const html_to_text_1 = require("html-to-text");
const config_1 = require("../config");
class Email {
    to;
    firstName;
    url;
    from;
    transporter;
    constructor(user, url) {
        this.to = user.email;
        this.firstName = user.name.split(' ')[0];
        this.url = url || '';
        this.from = `Your Company <${config_1.env_vars.sender}>`;
        this.transporter = nodemailer.createTransport({
            host: config_1.env_vars.smtp.host,
            port: config_1.env_vars.smtp.port,
            secure: config_1.env_vars.smtp.secure, // true for 465, false for other ports
            auth: {
                user: config_1.env_vars.smtp.user,
                pass: config_1.env_vars.smtp.pass,
            },
        });
    }
    async sendEmail(html, subject) {
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html,
            text: (0, html_to_text_1.htmlToText)(html),
        };
        await this.transporter.sendMail(mailOptions);
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
//# sourceMappingURL=email-node.js.map