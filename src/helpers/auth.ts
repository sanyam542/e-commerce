import { jwtVerify, SignJWT } from "jose";

export const auth = async (token: any) => {
  try {
    const verfied = await jwtVerify(
      token,

      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    return verfied.payload;
  } catch (error) {}
};
