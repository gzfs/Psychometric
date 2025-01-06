import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const jsonData = await req.json();

    const fetchReq = await (await fetch("http://10.42.98.216:5000/personality/analyze", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            responses: jsonData
        })
    })).json();

    if (fetchReq) {
        return NextResponse.json({
            status: 200,
            data: fetchReq,
            error: null
        })
    } else {
        return NextResponse.json({
            status: 500,
            data: null,
            error: "Internal Server Error"
        })
    }
}