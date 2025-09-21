import { NextFunction, Request, Response } from "express";
import Controller from "./Controller";
import UserModel from "@/models/UserModel";
import { BadRequestError, UnauthorizedError } from "@/core/ApiError";
import { SuccessCreatedResponse, SuccessResponse } from "@/core/ApiResponse";
import { plainToInstance } from "class-transformer";
import { validateInput } from "@/utils/validate";
import { autoInjectable } from "tsyringe";
import { firestore } from "@/configs/firebaseAdmin";
import { otpGenerator } from "@/utils/otp-generator";
import { MailService } from "@/services/mail/mail";

@autoInjectable()
export class AuthController {
  public static readonly UserCollectionName: string = 'user';

  constructor(
    private readonly db: FirebaseFirestore.Firestore = firestore,
    private readonly mailService: MailService,
  ) {}

  async sendCode(email: string | undefined): Promise<void> {
    const options = {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    };

    // Generate a 6-digit OTP with the predefined options
    const otp = otpGenerator(6, options);

    // Save OTP to field verificationCode in User Collection
    const UserCollection = 
      firestore.collection(AuthController.UserCollectionName);
    const snapshot = 
      await UserCollection.where("email", "==", email).get();
    
    if (snapshot.empty) {
      throw new BadRequestError(
        `User with email ${email} not found`
      );
    }

    const userDoc = snapshot.docs[0].ref;
    await userDoc.update({
      verificationCode: otp,
    })

    // Send email
    await this.mailService.verify({
      to: email,
      data: {
        hash: otp
      }
    });
  }

  async signup(
    req: Request, 
    res: Response, 
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const controller: 
        Controller<UserModel> = new Controller(
          AuthController.UserCollectionName
        );
      const user: UserModel = plainToInstance(
        UserModel, 
        req.body
      );
      await validateInput(user);

      const UserCollection = 
        firestore.collection(AuthController.UserCollectionName);
      const snapshot = 
        await UserCollection.where("email", "==", user.email).get();

      let userId: string;
      if (snapshot.empty) {
        const userCreate = await controller.create(req, res, next);
        if (!userCreate) {
          throw new BadRequestError(
            `Failed to create user`
          );
        }
        userId = userCreate.id;
      } else {
        userId = snapshot.docs[0].id;
      }

      // Send code 
      await this.sendCode(user.email);
      
      return new SuccessCreatedResponse({
        id: userId,
        email: user.email,
      }).send(res);
    } catch (error) {
      next(error);
    }
  }

  // // POST /auth/signin - User signin
  // async signin(req: Request, res: Response, next: NextFunction): Promise<void> {
  //   try {
  //     const { email, verificationCode } = req.body;
      
  //     if (!email || !verificationCode) {
  //       throw new BadRequestError("Email and verification code are required");
  //     }

  //     // Here you would verify the email and verification code
  //     // For now, we'll mock the JWT token generation
  //     const mockToken = "jwt_access_token_here";
      
  //     if (verificationCode === "valid_code") {
  //       new SuccessResponse({
  //         accessToken: mockToken
  //       }).send(res);
  //     } else {
  //       throw new UnauthorizedError("Invalid Email or Verification Code");
  //     }
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}