const eventEmitter = require("./eventEmitter");
const nodemailer = require("nodemailer");

module.exports = () => {
    eventEmitter.on("send_email", async (emailData) => {
        let transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USER, // generated ethereal user
                pass: process.env.EMAIL_PASSWORD, // generated etheral password
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        let info = await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            ...emailData,
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });
        eventEmitter.on("send_create_email", async (emailData) => {
            let transporter = nodemailer.createTransport({
                host: process.env.EMAIL_HOST,
                port: process.env.EMAIL_PORT,
                auth: {
                    user:process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASSWORD,
                },
                tls: {
                    rejectUnauthorized: false
                }
            });
            let info = await transporter.sendMail({
                from: process.env.EMAIL_CREATE,
                ...emailData,
            });
            
            console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        })
    }
