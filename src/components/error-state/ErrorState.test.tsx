import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, vi } from "vitest";
import { ErrorState } from "./ErrorState";

type RenderOptions = {
	additionalProps?: Partial<React.ComponentProps<typeof ErrorState>>;
};

const defaultProps: React.ComponentProps<typeof ErrorState> = {
	title: "Something went wrong",
	message: "Default error message",
	variant: "error",
};

const renderErrorState = ({ additionalProps }: RenderOptions = {}) => {
	return render(<ErrorState {...defaultProps} {...additionalProps} />);
};

describe("ErrorState", () => {
	it("should render the default title", () => {
		renderErrorState();

		expect(
			screen.getByRole("heading", { name: /something went wrong/i }),
		).toBeInTheDocument();
	});

	it("should render the provided message", () => {
		renderErrorState({
			additionalProps: { message: "Network request failed" },
		});

		expect(screen.getByText(/network request failed/i)).toBeInTheDocument();
	});

	it("should render fallback message when error object is provided", () => {
		renderErrorState({
			additionalProps: {
				error: new Error("Server crashed"),
				message: undefined,
			},
		});

		expect(screen.getByText(/server crashed/i)).toBeInTheDocument();
	});

	it("should render alert role for accessibility", () => {
		renderErrorState();

		expect(screen.getByRole("alert")).toBeInTheDocument();
	});

	it("should render retry button when onRetry is provided", () => {
		renderErrorState({
			additionalProps: { onRetry: vi.fn() },
		});

		expect(
			screen.getByRole("button", { name: /try again/i }),
		).toBeInTheDocument();
	});

	it("should call onRetry when retry button is clicked", async () => {
		const user = userEvent.setup();
		const onRetry = vi.fn();

		renderErrorState({
			additionalProps: { onRetry },
		});

		await user.click(screen.getByRole("button", { name: /try again/i }));

		expect(onRetry).toHaveBeenCalledOnce();
	});

	it("should render custom action element when provided", () => {
		renderErrorState({
			additionalProps: {
				action: <button type="button">Custom Action</button>,
			},
		});

		expect(
			screen.getByRole("button", { name: /custom action/i }),
		).toBeInTheDocument();
	});

	it("should support warning variant visually", () => {
		renderErrorState({
			additionalProps: { variant: "warning" },
		});

		expect(screen.getByRole("alert")).toBeInTheDocument();
	});

	it("should support info variant visually", () => {
		renderErrorState({
			additionalProps: { variant: "info" },
		});

		expect(screen.getByRole("alert")).toBeInTheDocument();
	});
});
