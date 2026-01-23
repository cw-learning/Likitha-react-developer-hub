import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { SignInPage } from "./SignInPage";

const renderSignInPage = () => {
	return render(
		<BrowserRouter>
			<SignInPage />
		</BrowserRouter>,
	);
};

describe("SignInPage", () => {
	it("should render the email input field", () => {
		renderSignInPage();

		expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
	});

	it("should render the password input field", () => {
		renderSignInPage();

		expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
	});

	it("should allow typing in the email input", async () => {
		renderSignInPage();
		const user = userEvent.setup();

		const emailInput = screen.getByLabelText(/email/i);
		await user.type(emailInput, "test@example.com");

		expect(emailInput).toHaveValue("test@example.com");
	});

	it("should allow typing in the password input", async () => {
		renderSignInPage();
		const user = userEvent.setup();

		const passwordInput = screen.getByLabelText(/password/i);
		await user.type(passwordInput, "password123");

		expect(passwordInput).toHaveValue("password123");
	});

	it("should render the sign in button", () => {
		renderSignInPage();

		expect(
			screen.getByRole("button", { name: /sign in/i }),
		).toBeInTheDocument();
	});

	it("should render the continue with google button", () => {
		renderSignInPage();

		expect(
			screen.getByRole("button", { name: /continue with google/i }),
		).toBeInTheDocument();
	});

	it("should render the sign up link", () => {
		renderSignInPage();

		expect(screen.getByRole("link", { name: /sign up/i })).toBeInTheDocument();
	});
});
