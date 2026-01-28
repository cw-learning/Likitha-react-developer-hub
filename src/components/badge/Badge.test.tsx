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

	it("should render with default variant", () => {
		renderBadge();

		const badge = screen.getByRole("status");

		expect(badge).toBeInTheDocument();
	});

	it("should render with primary variant", () => {
		renderBadge({ variant: "primary" });

		const badge = screen.getByRole("status");

		expect(badge).toBeInTheDocument();
	});

	it("should render with success variant", () => {
		renderBadge({ variant: "success" });

		const badge = screen.getByRole("status");

		expect(badge).toBeInTheDocument();
	});

	it("should render with warning variant", () => {
		renderBadge({ variant: "warning" });

		const badge = screen.getByRole("status");

		expect(badge).toBeInTheDocument();
	});

	it("should render with error variant", () => {
		renderBadge({ variant: "error" });

		const badge = screen.getByRole("status");

		expect(badge).toBeInTheDocument();
	});

	it("should merge custom className with variant styles", () => {
		renderBadge({ className: "custom-class" });

		const badge = screen.getByText(/badge/i);

		expect(badge).toHaveClass("custom-class");
	});
});
