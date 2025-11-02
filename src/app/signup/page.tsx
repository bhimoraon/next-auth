"use client";
import axios from "axios";
import Link from "next/link";
import {useRouter} from "next/navigation";
import React, { useEffect } from "react";
import {toast} from "react-hot-toast";

function SignupPage() {
	const router = useRouter();
	const [Loading, setLoading] = React.useState(false);

	const [user, setUser] = React.useState({
		email:"",
		password: "",
		username: "",
	});

	const [buttonDisabled, setbuttonDisabled] = React.useState(false);
	const onSignup = async () => {
		try {
			setLoading(true);
			/// here .post method will pass argument user to route and and return
			const response = await axios.post("/api/users/signup", user);
			console.log("SignUp Success",response.data);
			router.push('/login')
		} catch (error: any) {
			console.log("SignUp Failed ", error.message);
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (user.username.length > 2 && user.password.length > 2)
			setbuttonDisabled(false);
		else setbuttonDisabled(true);
	}, [user]);

	return (
		<div className=" flex justify-center items-center w-screen h-screen">
			<div className="border-gray-600 border p-10  rounded-lg ">
				<h1 className="">{Loading ? "Loading" : "SignUpPage"}</h1>
				<br />
				<br />
				<input
					type="text"
					value={user.email}
					id="email"
					className="p-5 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-600 text-white"
					placeholder="email"
					onChange={(e) => setUser({ ...user, email: e.target.value })}
				/>
				<br />
				<br />
				<input
					type="text"
					value={user.username}
					id="username"
					className="p-5 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-600 text-white"
					placeholder="username"
					onChange={(e) => setUser({ ...user, username: e.target.value })}
				/>
				<br />
				<br />
				<input
					type="password"
					value={user.password}
					id="password"
					className="p-5 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-600 text-white"
					placeholder="password"
					onChange={(e) => setUser({ ...user, password: e.target.value })}
				/>
				<br />
				<br />
				<button className=" p-3 bg-blue-500 rounded-lg" onClick={onSignup}>
					{" "}
					{buttonDisabled ? " No Sign Up" : "Sign Up"}
				</button>
				<br />
				<br />
				<Link className="text-blue-500" href={"./login"}>
					Login Here
				</Link>

			</div>
		</div>
	);
}

export default SignupPage;
