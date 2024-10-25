import { ConnectWithMongoDB } from "@/essentials/ConnectWithMongoDB";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const POST = async (res: NextResponse) => {
  try {
    await ConnectWithMongoDB();
    return NextResponse.json(
      {
        message: "API IS LIVE",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "SERVER IS DEAD !",
      status: 500,
    });
  }
};
