import { NextResponse } from "next/server";
import { main } from "../route";
import prisma from "@/prisma";

export const GET = async (req: Request, res: NextResponse) => {
  try {
    const id = req.url.split("/blog/")[1];
    await main();
    const post = await prisma.post.findFirst({where: {id}});
    if (!post ){
      return NextResponse.json({ message: "Not Found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Succes", post  }, { status: 404 });
  } catch (error) {
    return NextResponse.json({message:"ERRORGETID", error},{status:500})
  } finally {
    await prisma.$disconnect();
  }
}

export const PUT = async (req: Request, res: NextResponse) => {
  
}

export const DELETE = async (req: Request, res: NextResponse) => {
  
}