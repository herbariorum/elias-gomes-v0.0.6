import db from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";


export async function GET(request: Request) {    
    const body = await request.json();
    console.log(body.slug)
    // try {
    //     const body = await request.json();
    //     const slug = body.slug;

    //     if (!slug) {
    //         return NextResponse.json({ message: 'Slug is required'}, { status: 400 });
    //     }

    //     return NextResponse.json({slug: slug});
        
    // } catch (error) {
    //     return NextResponse.json({ message: `Error: ${error}` }, { status: 500 });
    // }
}