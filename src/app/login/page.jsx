"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function LoginPage() {
	const router = useRouter();
	const [user, setUser] = React.useState({
		password: "",
		username: "",
	});

	const [buttonDisabled, setButtonDisabled] = useState(false);
	const [loading, setLoading] = useState(false);

	const onLogin = async () => {
		try {
			setLoading(true);
			const response = await axios.post("/api/users/login", user);
			console.log("Login success", response.data);
			toast.success("Loging Success");
			router.push("/success");
		} catch (error) {
			console.log("Login failed", error.message);
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (user.username.length > 2 && user.password.length > 2)
			setButtonDisabled(false);
		else setButtonDisabled(true);
	}, [user]);

	return (
		<div className="flex justify-center items-center w-screen h-screen">
			<div className="border-gray-600 border p-10 rounded-lg ">
				<h1 className="">{loading ? "Processing" : "Login"}</h1>
				<br />

				<br />
				<input
					type="text"
					value={user.username}
					id="username"
					className="p-5 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-600 text-white"
					placeholder="email or username"
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
				<button className=" p-3 bg-blue-500 rounded-lg" onClick={onLogin}>
					{" "}
					{buttonDisabled ? "No Login" : "Login"}
				</button>
				<br />
				<br />
				<Link className="text-blue-500" href={"./signup"}>
					Sign Up Here
				</Link>
			</div>
		</div>
	);
}

export default LoginPage;
