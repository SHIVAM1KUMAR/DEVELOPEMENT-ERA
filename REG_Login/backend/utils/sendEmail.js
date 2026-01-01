import nodemailer from "nodemailer";

const sendOtp = async (email, subject, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Auth App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: subject,
      html: `
        <div style="font-family: Arial">
          <h2>${subject}</h2>
          <p>Your OTP is:</p>
          <h1 style="letter-spacing: 4px">${otp}</h1>
          <p>This OTP is valid for 10 minutes.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("OTP Email Error:", error);
    throw new Error("Failed to send OTP");
  }
};

export default sendOtp;
