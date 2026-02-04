import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { Spinner, type SpinnerProps } from "./Spinner";

const defaultProps: SpinnerProps = {
	size: "md",
	className: "",
};

const renderSpinner = (additionalProps?: Partial<SpinnerProps>) => {
	const user = userEvent.setup();

	render(<Spinner {...defaultProps} {...additionalProps} />);

	return {
		user,
		spinner: screen.getByRole("status", { name: /loading/i }),
	};
};

describe("Spinner", () => {
	it("should render a loading indicator with accessible role", () => {
		const { spinner } = renderSpinner();

		expect(spinner).toBeInTheDocument();
	});
});
