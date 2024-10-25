import { ConnectWithMongoDB } from "@/essentials/ConnectWithMongoDB";
import { decrypt, encrypt } from "@/functions/EncryptionDecryption";
import { CreateToken } from "@/functions/JWT";
import { User } from "@/models/Users";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextResponse) => {
  try {
    const body: { email: string; password: string } = await req.json();

    const { email, password } = body;
    console.log(encrypt(password))    
    await ConnectWithMongoDB();
    const isEmailExists = await User.findOne({
      email,
      password: await encrypt(password),
    });

    if (!isEmailExists) {
      return NextResponse.json(
        {
          message: "Email or password is worng",
        },
        { status: 401 }
      );
    }

    // const decrypt_password = decrypt(body?.password)

    // if(!(decrypt_password === req?.body?.password )){
    //   return NextResponse.json({ message: "Email or password is wrong" });
    // }

    console.log(body);

    const token = await CreateToken(
      { id: isEmailExists?._id },
      "7d"
    );


      return NextResponse.json(
        { message: "Sign In Successful", token },
        { status: 200 }
      );

  } catch (error: any) {
    console.log(error);
    return NextResponse.json({
      message: "Internal Server Error !",
      status: 500,
    });
  }
};
