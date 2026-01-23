import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { GoogleLogo } from "./GoogleLogo";

interface RenderOptions {
	className?: string;
}

const defaultProps: RenderOptions = {
	className: "w-5 h-5",
};

const renderGoogleLogo = (additionalProps: RenderOptions = {}) => {
	const props = { ...defaultProps, ...additionalProps };

	return render(<GoogleLogo className={props.className} />);
};

describe("GoogleLogo", () => {
	it("should render an svg element", () => {
		const { container } = renderGoogleLogo();

		const svg = container.querySelector("svg");

		expect(svg).toBeInTheDocument();
	});

	it("should apply provided className when passed", () => {
		const { container } = renderGoogleLogo({ className: "w-8 h-8" });

		const svg = container.querySelector("svg");

		expect(svg).toHaveClass("w-8");
	});

	it("should be hidden from the accessibility tree", () => {
		const { container } = renderGoogleLogo();

		const svg = container.querySelector("svg");

		expect(svg).toHaveAttribute("aria-hidden", "true");
	});
});
