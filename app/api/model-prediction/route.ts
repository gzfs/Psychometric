import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const receivedData = await req.json();
    const fetchResp = await (await fetch("http://10.42.98.216:5000/models/additional", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(receivedData)
    })).json();

    if (fetchResp) {
        return NextResponse.json({
            status: 200,
            data: fetchResp,
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