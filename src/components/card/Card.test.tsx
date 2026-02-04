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



const defaultProps: CardProps = {
	children: <div>Card content</div>,
};

const renderCard = (additionalProps?: Partial<CardProps>) => {
	return render(<Card {...defaultProps} {...(additionalProps as CardProps)} />);
};

describe("Card", () => {
	it("should render card content", () => {
		renderCard();

		expect(screen.getByText(/card content/i)).toBeInTheDocument();
	});

	it("should render a button when onClick is provided", () => {
		renderCard({
				onClick: vi.fn(),
				"aria-label": "Clickable card",
			
		});

		expect(
			screen.getByRole("button", { name: /clickable card/i }),
		).toBeInTheDocument();
	});

	it("should call onClick when button card is clicked", async () => {
		const user = userEvent.setup();
		const onClick = vi.fn();

		renderCard({
			
				onClick,
				"aria-label": "Clickable card",
			
		});

		await user.click(screen.getByRole("button", { name: /clickable card/i }));

		expect(onClick).toHaveBeenCalledOnce();
	});

	it("should render a link when href is provided", () => {
		renderCard({
				href: "/test-link",
			
		});

		expect(screen.getByRole("link")).toHaveAttribute("href", "/test-link");
	});

	it("should render an article when card is static", () => {
		renderCard();

		expect(screen.getByRole("article")).toBeInTheDocument();
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
