import type { Request, Response } from "express";
import { prismaClient } from "../lib/prisma";
import bcrypt from "bcryptjs";
import { jwtGenerate } from "../lib/jwt_generate";
import type { NewRequest } from "../middleware/auth.middleware";
import { signInSchema, signUpSchema } from "../zodSchema/auth.zod";
import admin from "firebase-admin";


admin.initializeApp({
  credential: admin.credential.cert({
    //@ts-ignore
  type: process.env.FIREBASE_TYPE!,
  project_id: process.env.FIREBASE_PROJECT_ID!,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID!,
  private_key: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL!,
  client_id: process.env.FIREBASE_CLIENT_ID!,
  auth_uri: process.env.FIREBASE_AUTH_URI!,
  token_uri: process.env.FIREBASE_TOKEN_URI!,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL!,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL!,
  universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN!,
})
});


export const SignIn = async (req: Request, res: Response) => {
  const result = signInSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Input is in incorrect format",
    });
  }

  const { email, password } = result.data;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required.",
    });
  }

  const dbResponce = await prismaClient.user.findUnique({
    where: {
      email,
    },
  });

  if (!dbResponce) {
    return res.status(400).json({
      message: "Invalid email or password.",
    });
  }

  if (!dbResponce.password)
    return res.status(401).json({ message: "no password , try with google" });
  const isPassword = await bcrypt.compare(password, dbResponce?.password);

  if (!isPassword) {
    return res.status(400).json({
      message: "incorrect email or password.",
    });
  }

  const jwt = jwtGenerate(dbResponce.id);
  return res
    .cookie("todoCookie", jwt)
    .status(200)
    .json({
      message: "Signed in successfully.",
      auth: {
        name: dbResponce.name,
        email: dbResponce.email,
      },
    });
};

export const SignUP = async (req: Request, res: Response) => {
  const result = signUpSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Input is in incorrect format",
    });
  }

  const { name, email, password } = result.data;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Name, email, and password are required.",
    });
  }

  const checkEmail = await prismaClient.user.findUnique({
    where: {
      email,
    },
  });

  if (checkEmail) {
    return res.status(400).json({
      message: "An account with this email already exists.",
    });
  }

  const hassPassword = await bcrypt.hash(password, 10);

  const dbResponce = await prismaClient.user.create({
    data: {
      name,
      email,
      password: hassPassword,
    },
  });

  const jwt = jwtGenerate(dbResponce.id);

  return res
    .cookie("todoCookie", jwt)
    .status(201)
    .json({
      message: "account created successfully.",
      auth: {
        name: dbResponce.name,
        email: dbResponce.email,
      },
    });
};

export const Me = async (req: NewRequest, res: Response) => {
  if (!req.userId) {
    return res.status(400).json({ message: "no user find " });
  }

  const dbResponce = await prismaClient.user.findUnique({
    where: {
      id: req.userId as string,
    },
  });

  if (!dbResponce) {
    return res.status(400).json({
      message: "login again for further use",
    });
  }
  return res.status(200).json({
    id: dbResponce.id,
    name: dbResponce.name,
    email: dbResponce.email,
  });
};

export const handelGoogle = async (req: NewRequest, res: Response) => {
  const { token } = req.body;
  if (!token) {
    return res.status(401).json({
      message: "No token provided",
    });
  }

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    const dbResponce = await prismaClient.user.findFirst({
      where: {
        email: decoded.email,
      },
    });

    if (!dbResponce) {
      const newUser = await prismaClient.user.create({
        data: {
          name: decoded.name,
          email: decoded.email as string,
        },
      });

      const jwt = jwtGenerate(newUser.id);

      return res
        .cookie("todoCookie", jwt)
        .status(201)
        .json({
          message: "account created successfully.",
          auth: {
            name: newUser.name,
            email: newUser.email,
          },
        });
    }else{
      
      const jwt = jwtGenerate(dbResponce.id);
  return res
    .cookie("todoCookie", jwt)
    .status(200)
    .json({
      message: "Signed in successfully.",
      auth: {
        name: dbResponce.name,
        email: dbResponce.email,
      },
    });
    }
  } catch (error) {
    console.log(error) ;
    
    return res.status(400).json({
      message:"internal server error"
    })
    
  }
};
