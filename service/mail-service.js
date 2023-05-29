const nodemailer = require('nodemailer')
//mail functions
class MailService{

    constructor(){
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    async sendActivationMail(to, link){
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: "Активация аккаунта на LingvaDiving",
            text: "",
            html:
                `
                    <div>
                        <h1>Для активации вашего аккаунта перейдите по ссылке</h1>
                        <a href="${link}">${link}</a>
                        <hr/>
                        <br/>
                        <h3>Это письмо сформировано автоматически и не требует ответа</h3>
                        <h3>Приятного погружения в мир иностранных языков!</h3>
                    </div>
                `
        })
    }
}


module.exports = new MailService()