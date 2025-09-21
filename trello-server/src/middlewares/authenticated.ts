import { UnauthorizedResponse } from "@/core/ApiResponse";
import { NextFunction, Request, Response } from "express";
import { DecodedIdToken } from "firebase-admin/auth";
import { admin } from '@/configs/firebaseAdmin';

async function authenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const idToken: string | undefined = 
    req.headers.authorization?.split("Bearer ")[1];

  if (!idToken) {
    return new UnauthorizedResponse([
      {
        key: 'authentication',
        value: 'No token provided',
      },
    ]).send(res);
  }

  try {
    const decodedToken: DecodedIdToken = await admin
      .auth()
      .verifyIdToken(idToken, true); // Enable checkRevoked

  } catch (error) {
    
  }
}