import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, vi } from "vitest";
import type { CardProps } from "./Card";
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	CardTitle,
	CardDescription,
	CardImage,
} from "./Card";

type RenderOptions = {
	additionalProps?: CardProps;
};

const defaultProps: CardProps = {
	children: <div>Card content</div>,
};

const renderCard = ({ additionalProps }: RenderOptions = {}) => {
	return render(<Card {...defaultProps} {...additionalProps} />);
};

describe("Card", () => {
	it("should render card content", () => {
		renderCard();

		expect(screen.getByText(/card content/i)).toBeInTheDocument();
	});

	it("should render a button when onClick is provided", () => {
		renderCard({
			additionalProps: {
				onClick: vi.fn(),
				"aria-label": "Clickable card",
			},
		});

		expect(
			screen.getByRole("button", { name: /clickable card/i }),
		).toBeInTheDocument();
	});

	it("should call onClick when button card is clicked", async () => {
		const user = userEvent.setup();
		const onClick = vi.fn();

		renderCard({
			additionalProps: {
				onClick,
				"aria-label": "Clickable card",
			},
		});

		await user.click(screen.getByRole("button", { name: /clickable card/i }));

		expect(onClick).toHaveBeenCalledOnce();
	});

	it("should render a link when href is provided", () => {
		renderCard({
			additionalProps: {
				href: "/test-link",
			},
		});

		expect(screen.getByRole("link")).toHaveAttribute("href", "/test-link");
	});

	it("should render an article when card is static", () => {
		renderCard();

		expect(screen.getByRole("article")).toBeInTheDocument();
	});

	it("should apply elevated variant styles by default", () => {
		renderCard();

		expect(screen.getByRole("article")).toHaveClass("shadow-md");
	});

	it("should apply outlined variant styles", () => {
		renderCard({
			additionalProps: {
				variant: "outlined",
			},
		});

		expect(screen.getByRole("article")).toHaveClass("border-2");
	});

	it("should apply padding styles when padding is provided", () => {
		renderCard({
			additionalProps: {
				padding: "md",
			},
		});

		expect(screen.getByRole("article")).toHaveClass("p-4");
	});

	it("should render CardHeader", () => {
		render(
			<Card>
				<CardHeader>Header</CardHeader>
			</Card>,
		);

		expect(screen.getByText(/header/i)).toBeInTheDocument();
	});

	it("should render CardBody", () => {
		render(
			<Card>
				<CardBody>Body</CardBody>
			</Card>,
		);

		expect(screen.getByText(/body/i)).toBeInTheDocument();
	});

	it("should render CardFooter", () => {
		render(
			<Card>
				<CardFooter>Footer</CardFooter>
			</Card>,
		);

		expect(screen.getByText(/footer/i)).toBeInTheDocument();
	});

	it("should render CardTitle as a heading", () => {
		render(
			<Card>
				<CardTitle>Title</CardTitle>
			</Card>,
		);

		expect(screen.getByRole("heading", { name: /title/i })).toBeInTheDocument();
	});

	it("should render CardDescription", () => {
		render(
			<Card>
				<CardDescription>Description</CardDescription>
			</Card>,
		);

		expect(screen.getByText(/description/i)).toBeInTheDocument();
	});

	it("should render CardImage with alt text", () => {
		render(
			<Card>
				<CardImage src="/image.png" alt="Card image" />
			</Card>,
		);

		expect(
			screen.getByRole("img", { name: /card image/i }),
		).toBeInTheDocument();
	});
});
