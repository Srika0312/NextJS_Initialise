import jwt from "jsonwebtoken";

export async function VerifyToken(token: string) {
  try {
    var decoded = await jwt.verify(
      token,
      process.env.JASON_WEB_TOKEN_SECRET_KEY as string
    );

    return decoded;
  } catch (error) {
    return error;
  }
}

export async function CreateToken(payload: object, expiry: string) {
  try {
    const token = jwt.sign(
      payload,
      process.env.JASON_WEB_TOKEN_SECRET_KEY as string,
      {
        expiresIn: expiry,
      }
    );

    return token;
  } catch (error) {
    return error;
  }
}