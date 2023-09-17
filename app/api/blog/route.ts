import prisma from "@/prisma";
import { NextResponse } from "next/server";

export async function main() {
  try {
    await prisma.$connect();    
  } catch (error) {
    return Error("ERROR DB")
  }
}

export const GET =async (req:Request, res:NextResponse) => {
  try {
    console.log("GET");
    await main();
    const posts = await prisma.post.findMany();
    return NextResponse.json({ message: "Success", posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json({message:"ERRORGET", error},{status:500})
  } finally {
    await prisma.$disconnect();
  }
}

export const POST =async (req:Request, res:NextResponse) => 
{
  try {
    console.log("POST");
    const { title, description } = await req.json();
    await main();
    const post = await prisma.post.create({ data: { description, title } });
    return NextResponse.json({ message: "Success CREATE POST", post }, { status: 201 });
  } catch (error) {
    return NextResponse.json({message:"ERRORPOST", error},{status:500})
  } finally {
    await prisma.$disconnect();
  }
}