import { Router } from "express";
import { prismaClient } from "../lib/prisma";
import bcrypt from "bcryptjs";
import { jwtGenerate } from "../lib/jwt_generate";
import { getTokenFromReq, type NewRequest } from "../middleware/auth.middleware";

const route = Router();

route.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Name, email, and password are required."
    });
  }

  const checkEmail = await prismaClient.user.findUnique({
    where: {
      email
    }
  });

  if (checkEmail) {
    return res.status(400).json({
      message: "An account with this email already exists."
    });
  }

  const hassPassword = await bcrypt.hash(password, 10);

  const dbResponce = await prismaClient.user.create({
    data: {
      name,
      email,
      password: hassPassword
    }
  });

  const jwt = jwtGenerate(dbResponce.id);

  return res.cookie("todoCookie", jwt).status(201).json({
    message: "User account created successfully."
  });
});

route.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required."
    });
  }

  const dbResponce = await prismaClient.user.findUnique({
    where: {
      email
    }
  });

  if (!dbResponce) {
    return res.status(400).json({
      message: "Invalid email or password."
    });
  }

  const isPassword = await bcrypt.compare(password, dbResponce?.password);

  if (!isPassword) {
    return res.status(400).json({
      message: "Invalid email or password."
    });
  }

  const jwt = jwtGenerate(dbResponce.id );

  return res.cookie("todoCookie", jwt).status(200).json({
    message: "Signed in successfully."
  });
});

route.get("/me",getTokenFromReq,async (req:NewRequest ,res)=>{
    if(!req.userId){
      return res.status(400).json({message:"no user find "})
    }

    const dbResponce = await prismaClient.user.findUnique({
      where:{
        id:req.userId as string ,
      }
    })

    if(!dbResponce){
      return res.status(400).json({
        message : "no user exist in db"
      })
    }
    return res.status(200).json({
      id : dbResponce.id ,
      name:dbResponce.name ,
      email : dbResponce.email
    })
})


export default route;