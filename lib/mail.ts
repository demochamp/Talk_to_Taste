import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'choudharykhushi499@gmail.com', // Your admin email
        pass: process.env.GMAIL_APP_PASSWORD,
    },
});

export async function sendAdminNotification(userEmail: string, provider: string) {
    if (!process.env.GMAIL_APP_PASSWORD) {
        console.error("GMAIL_APP_PASSWORD is not set. Cannot send admin notification.");
        return;
    }

    const mailOptions = {
        from: '"TalkToTaste Bot" <choudharykhushi499@gmail.com>',
        to: 'choudharykhushi499@gmail.com',
        subject: `🔔 New Login Alert: ${userEmail}`,
        html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #f97316;">New User Login</h2>
        <p>Someone just logged into TalkToTaste!</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
        <p><strong>User Email:</strong> ${userEmail}</p>
        <p><strong>Login Method:</strong> ${provider}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        <br />
        <p style="font-size: 12px; color: #888;">This is an automated message from your TalkToTaste website.</p>
      </div>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`📧 Admin notification sent for login: ${userEmail}`);
    } catch (error) {
        console.error("❌ Failed to send admin notification:", error);
    }
}
