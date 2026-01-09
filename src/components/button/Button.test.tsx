import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, vi } from "vitest";
import { createRef } from "react";
import { Button } from "./Button";

interface RenderOptions {
	children?: React.ReactNode;
	disabled?: boolean;
	onClick?: () => void;
}

const defaultProps: Required<RenderOptions> = {
	children: "Click me",
	disabled: false,
	onClick: vi.fn(),
};

const renderButton = (additionalProps?: RenderOptions) => {
	const props = { ...defaultProps, ...additionalProps };

	return render(
		<Button disabled={props.disabled} onClick={props.onClick}>
			{props.children}
		</Button>,
	);
};

describe("Button", () => {
	const user = userEvent.setup();

	it("should render a button element", () => {
		renderButton();

		const button = screen.getByRole("button");

		expect(button).toBeInTheDocument();
	});

	it("should render children content", () => {
		renderButton();

		const button = screen.getByText("Click me");

		expect(button).toBeInTheDocument();
	});

	it("should call onClick when clicked", async () => {
		const onClick = vi.fn();

		renderButton({ onClick });

		const button = screen.getByRole("button");
		await user.click(button);

		expect(onClick).toHaveBeenCalled();
	});

	it("should not call onClick when disabled", async () => {
		const onClick = vi.fn();

		renderButton({ disabled: true, onClick });

		const button = screen.getByRole("button");
		await user.click(button);

		expect(onClick).not.toHaveBeenCalled();
	});

	it("should be disabled when disabled prop is true", () => {
		renderButton({ disabled: true });

		const button = screen.getByRole("button");

		expect(button).toBeDisabled();
	});

	it("should have type button by default", () => {
		renderButton();

		const button = screen.getByRole("button");

		expect(button).toHaveAttribute("type", "button");
	});

	it("should forward ref to the button element", () => {
		const ref = createRef<HTMLButtonElement>();

		render(<Button ref={ref}>Ref Button</Button>);

		expect(ref.current).toBeInstanceOf(HTMLButtonElement);
	});
});
