import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import { Badge } from "./Badge";

interface RenderOptions {
	children?: React.ReactNode;
	variant?: "default" | "primary" | "success" | "warning" | "error";
	className?: string;
}

const defaultProps: Required<Omit<RenderOptions, "className">> = {
	children: "Badge content",
	variant: "default",
};

const renderBadge = (additionalProps?: RenderOptions) => {
	const props = { ...defaultProps, ...additionalProps };

	return render(
		<Badge variant={props.variant} className={props.className}>
			{props.children}
		</Badge>,
	);
};

describe("Badge", () => {
	it("should render a badge element", () => {
		renderBadge();

		const badge = screen.getByText(/badge/i);

		expect(badge).toBeInTheDocument();
	});

	it("should render children content", () => {
		renderBadge({ children: "New content" });

		const badge = screen.getByText(/new/i);

		expect(badge).toBeInTheDocument();
	});

	it("should apply default variant styles when no variant is provided", () => {
		renderBadge();

		const badge = screen.getByText(/badge/i);

		expect(badge).toHaveClass("bg-gray-100");
	});

	it("should apply primary variant styles when variant is primary", () => {
		renderBadge({ variant: "primary" });

		const badge = screen.getByText(/badge/i);

		expect(badge).toHaveClass("bg-blue-100");
	});

	it("should apply success variant styles when variant is success", () => {
		renderBadge({ variant: "success" });

		const badge = screen.getByText(/badge/i);

		expect(badge).toHaveClass("bg-green-100");
	});

	it("should apply warning variant styles when variant is warning", () => {
		renderBadge({ variant: "warning" });

		const badge = screen.getByText(/badge/i);

		expect(badge).toHaveClass("bg-amber-100");
	});

	it("should apply error variant styles when variant is error", () => {
		renderBadge({ variant: "error" });

		const badge = screen.getByText(/badge/i);

		expect(badge).toHaveClass("bg-red-100");
	});

	it("should merge custom className with variant styles", () => {
		renderBadge({ className: "custom-class" });

		const badge = screen.getByText(/badge/i);

		expect(badge).toHaveClass("custom-class");
	});
});
