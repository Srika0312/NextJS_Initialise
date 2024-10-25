import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const POST = async (req: NextRequest, res: NextResponse) => {
  //   if (req.method === "POST") {
  const body: { name: string; to: string } = await req.json();
  const { name, to } = body;
  if (!name || !to) {
    return NextResponse.json(
      { message: "Some required fields are missing" },
      { status: 400 }
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // e.g., 'smtp.gmail.com'
      port: Number(process.env.SMTP_PORT), // usually 587
      secure: false,
      auth: {
        user: process.env.SMTP_USER, // your SMTP username
        pass: process.env.SMTP_PASS, // your SMTP password
      },
      tls: {
        ciphers: "SSLv3",
      },
    });

    // Define the email options
    const mailOptions = await {
      from: process.env.SMTP_USER, // sender address
      name: name,
      to: to, // list of receivers
      subject: "Let us be Celestial Duo in the Stellar Community",
      html: `
       <div
      style=" background-color: rgba(148, 163, 184, 0.1); padding: 20px; max-width:100%">
      <div
        style="width: 100%; display: flex; flex-direction: col; justify-items: center; align-items: center;">

        <div
          style="width: 500px; background-color: rgba(148, 163, 184, 0.4); padding: 20px; font-family: Arial, sans-serif;">
          <h3 style="font-weight: 600;">Stellarian</h3>
          <div style="width: 100%; text-align: center;">
            <div style=" width:500px display: flex; flex-direction: col; justify-items: center; align-items: center; gap: 10px;">
              <div style" width:500px display: flex; flex-direction: row; justify-items: center; align-items: center;">
                <div
                  style="width: 48px; height: 48px; border-radius: 50%; overflow: hidden;">
                  <img
                    src="https://play-lh.googleusercontent.com/ZLhywKqS5Ucr5oRvPqgR5cw7KwjVCq499O7X72BCas3eF49u-YhAUpemn7E9sLc1S80=w240-h480-rw"
                    style="width: 100%; height: 100%; object-fit: cover;" />
                </div>
              </div>
              <h1>Hey ${name} </h1>
            </div>
            <p>
              <strong>${name}</strong> has invited you to be friends with
              <strong>Stellar Community</strong>.
            </p>
            <a href="#"
              style="display: inline-block; background-color: #007bff; color: white; padding: 6px 20px; text-decoration: none; border-radius: 5px;">
              Accept Invite
            </a>
            <a href="#"
              style="display: inline-block; margin-top: 10px; padding: 5px 10px; text-decoration: none; border-radius: 5px; border: 1px solid #007bff; color: #007bff;">
              View Profile
            </a>
            <p>
              Thanks,
              <br />
              Stellar team
            </p>
            <hr />
            <p
              style="font-size: 12px; color: grey; width: 50%; margin: 0 auto; text-align: center;">
              Stellar Community helps friends connect, organize, and strengthen
              their bonds effortlessly. From event planning to support, it makes
              managing friendships simple.
            </p>
          </div>
        </div>
      </div>
    </div>

        `,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log(body);

    // Success response
    return NextResponse.json(
      { message: "Email sent successfully!", info },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error sending email", error: error },
      { status: 500 }
    );
  }
};
