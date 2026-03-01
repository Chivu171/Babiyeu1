import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173', process.env.FRONTEND_URL].filter(Boolean)
}));
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.post('/api/send-email', async (req, res) => {
    const { items, senderEmail } = req.body;

    // Trim credentials to avoid common .env formatting issues
    const emailUser = (process.env.EMAIL_USER || '').trim();
    const emailPass = (process.env.EMAIL_PASS || '').trim();

    if (!items || !senderEmail) {
        return res.status(400).json({ error: 'Missing data' });
    }

    if (!emailUser || !emailPass) {
        console.error('CRITICAL: EMAIL_USER or EMAIL_PASS is not set in .env');
        return res.status(500).json({ error: 'Server configuration error' });
    }

    console.log(`Attempting login for: [${emailUser}] (Pass length: ${emailPass.length})`);
    // Cấu hình transporter cho Nodemailer
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: emailUser,
            pass: emailPass,
        },
        debug: true, // Show debug output
        logger: true, // Log information to console
    });

    console.log('Attempting to send email with:', emailUser);

    const mailOptions = {
        from: `"Babiyêu Menu" <${emailUser}>`,
        to: process.env.RECEIVER_EMAIL || 'tranchivu171@gmail.com',
        subject: `🍕 Yêu cầu món ăn mới từ ${senderEmail}`,
        text: `Em đã chọn các món sau:\n\n${items.map(item => `• ${item.name} (x${item.quantity})${item.note ? ` - Ghi chú: ${item.note}` : ''}`).join('\n')}\n\nEmail liên hệ: ${senderEmail}`,
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ff9dbb; border-radius: 15px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #ff4d91 0%, #902cf4 100%); padding: 30px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 28px;">💕 Menu Em Chọn 💕</h1>
          <p style="margin: 10px 0 0; opacity: 0.9;">Gửi từ: ${senderEmail}</p>
        </div>
        
        <div style="padding: 30px; background-color: #ffffff;">
          <h2 style="color: #ff4d91; border-bottom: 2px solid #fff0f5; padding-bottom: 10px;">🍔 Danh sách món ăn:</h2>
          <ul style="list-style: none; padding: 0;">
            ${items.map(item => `
              <li style="margin-bottom: 20px; padding: 15px; background-color: #fff9fb; border-radius: 12px; border-left: 5px solid #ff4d91;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <strong style="font-size: 18px; color: #333;">${item.name}</strong>
                  <span style="background-color: #ff4d91; color: white; padding: 4px 12px; border-radius: 20px; font-weight: bold; font-size: 14px;">x${item.quantity}</span>
                </div>
                ${item.note ? `<p style="margin: 10px 0 0; color: #666; font-style: italic; font-size: 14px; background: white; padding: 8px; border-radius: 6px;">📝 Ghi chú: ${item.note}</p>` : ''}
              </li>
            `).join('')}
          </ul>
        </div>
        
        <div style="background-color: #fcfcfc; padding: 20px; text-align: center; color: #999; font-size: 12px; border-top: 1px solid #eee;">
          <p>Món ăn đang được chuẩn bị với rất nhiều tình yêu! ❤️</p>
        </div>
      </div>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
