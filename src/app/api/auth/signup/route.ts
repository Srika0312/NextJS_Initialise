import { ConnectWithMongoDB } from "@/essentials/ConnectWithMongoDB";
import { encrypt } from "@/functions/EncryptionDecryption";
import { CreateToken } from "@/functions/JWT";
import { User } from "@/models/Users";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body:{
      name:string;
      email:string;
      password:string;
      phone:number;
    } = await req.json()
    
    const {name, email, password, phone} = body

    await ConnectWithMongoDB();

    const isEmailExists = await User.findOne({email});
    console.log(isEmailExists);
    if (isEmailExists?.email) {
      return NextResponse.json({
        message: "Email already Exists",
      },{status:409});
    }


    const isPhoneExists = await User.findOne({phone});
    console.log(isPhoneExists);
    if (isPhoneExists?.phone) {
      return NextResponse.json({
        message: "Phone number already Exists",
      },{status:409});
    }

    const NewUser = await User.create({
      name: name,
      email: email,
      password: encrypt(password),
      phone: phone,
    });

    const token = await CreateToken(
      {id: isEmailExists?._id?.toString()},
      "7d"
    )

    if (typeof token === 'string') {
      const encrypted_token = encrypt(token);
      return NextResponse.json(
        { message: "Sign Up Successful", token: encrypted_token },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Token creation failed" },
        { status: 500 }
      );
    }


    // const encrypted_token = encrypt(token as string);

    // return NextResponse.json(
    //   { message: "Sign Up Successful",  token:encrypted_token },
    //   { status: 200 }
    // );


  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: "Internal Server Error !", status: 500 });
  }
};