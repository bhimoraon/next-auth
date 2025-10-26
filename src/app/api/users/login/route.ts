import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect()

export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json()
        const { username, password } = reqBody;
        // console.log(reqBody);
        let email = username;
        let choice;
        for (let i of username) {
            if (i == '@') {

                choice = { email };
                break;
            }
            else
                choice = { username };
        }

        console.log(choice);





        //check if user exists
        const user = await User.findOne(choice)
        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 })
        }
        console.log("user exists");
        // console.log('Stored hash:', user.password);
        // console.log('Password to compare:', password);
        //check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password)
        console.log(validPassword)
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 })
        }
        console.log(user);

        //create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        // create token
        // const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {});
        // const cookieStore = await cookies();
        // cookieStore.set("userInfo", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })
        response.cookies.set("token", token, {
            httpOnly: true,

        })
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

// const token = (await cookies()).get("userInfo")?.value || null;
// let tokenData;
// if (token) {
// 	try {
// 		tokenData = await jwt.verify(token, process.env.TOKEN_SECRET!);
// 		console.log("Token data:", tokenData);

// 	} catch (error) {
// 		console.log("JWT verification failed:", error);
// 	}
// } else {
// 	console.log("No token exist ");
// }
