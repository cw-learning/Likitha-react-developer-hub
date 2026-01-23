import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/button/Button";
import { Input } from "../../components/input/Input";
import { Card, CardBody } from "../../components/card/Card";
import { GoogleLogo } from "../../components/googlelogo/GoogleLogo";

export const SignInPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
	};

	return (
		<div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
			<div className="w-full max-w-md">
				<Card>
					<CardBody className="space-y-6">
						<div className="text-center">
							<h1 className="text-2xl font-bold text-gray-900 mb-2">
								Welcome Back
							</h1>
							<p className="text-gray-600">
								Sign in to access your saved resources
							</p>
						</div>

						<form onSubmit={handleSubmit} className="space-y-4">
							<Input
								label="Email"
								type="email"
								placeholder="Enter your email"
								value={email}
								onChange={(event) => setEmail(event.target.value)}
								className="w-full"
								required
								autoComplete="email"
							/>

							<Input
								label="Password"
								type="password"
								placeholder="Enter your password"
								value={password}
								onChange={(event) => setPassword(event.target.value)}
								className="w-full"
								required
								autoComplete="current password"
							/>

							<Button type="submit" className="w-full">
								Sign In
							</Button>
						</form>

						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-gray-200" />
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="px-2 bg-white text-gray-500">
									Or continue with
								</span>
							</div>
						</div>

						<Button
							variant="outline"
							type="button"
							className="w-full flex gap-2"
						>
							<GoogleLogo />
							Continue with Google
						</Button>

						<p className="text-center text-gray-600 text-sm">
							Don't have an account?{" "}
							<Link
								to="/signup"
								className="text-blue-600 hover:text-blue-700 font-medium"
							>
								Sign up
							</Link>
						</p>
					</CardBody>
				</Card>
			</div>
		</div>
	);
};
