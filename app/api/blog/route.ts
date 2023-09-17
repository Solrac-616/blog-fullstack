import prisma from "@/prisma";
import { NextResponse } from "next/server";

async function main() {
  try {
    await prisma.$connect();    
  } catch (error) {
    return Error("ERROR DB")
  }
}

export const GET =async (req:Request, res:NextResponse) => {
  try {
    console.log("GET");  
  } catch (error) {
    return NextResponse.json({message:"ERRORGET", error}),{status:500}
  }
}

export const POST =async (req:Request, res:NextResponse) => {
  try {
    console.log("POST");  
  } catch (error) {
    return NextResponse.json({message:"ERRORPOST", error})
  }
}