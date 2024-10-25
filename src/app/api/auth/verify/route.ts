import { User } from "@/models/Users";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const body: { id: any } = await req.json();
    const { id } = body;

    const UserData = await User.findByIdAndUpdate({ id }).select(
      "-password -updatedAt -failed_login_attempts -reset_email_count -reset_password_count"
    );

    if (!UserData) {
      return NextResponse.json({ message: "Does not exist " }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Verified", data: UserData },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, message: "Internal Server Error" },
      { status: 500 }
    );
  }
};