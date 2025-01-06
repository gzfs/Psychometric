import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { person_age, person_income, person_home_ownership, person_emp_length, loan_grade, loan_amnt, loan_int_rate, loan_percent_income, cb_person_default_on_file, cb_person_cred_hist_length } = await req.json()

    const fetchResp = await (await fetch("http://10.42.98.216:5000/models/traditional", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            person_age, person_income, person_home_ownership, person_emp_length, loan_grade, loan_amnt, loan_int_rate, loan_percent_income, cb_person_default_on_file, cb_person_cred_hist_length
        })
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