import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it } from "vitest";
import { EmptyState } from "./EmptyState";

type RenderOptions = {
	additionalProps?: Partial<React.ComponentProps<typeof EmptyState>>;
};

const defaultProps: React.ComponentProps<typeof EmptyState> = {
	title: "No results found",
};

const renderEmptyState = ({ additionalProps }: RenderOptions = {}) => {
	return render(<EmptyState {...defaultProps} {...additionalProps} />);
};

describe("EmptyState", () => {
	it("should render the title", () => {
		renderEmptyState();

		expect(
			screen.getByRole("heading", { name: /no results found/i }),
		).toBeInTheDocument();
	});

	it("should render description when provided", () => {
		renderEmptyState({
			additionalProps: {
				description: "Try adjusting your filters",
			},
		});

		expect(screen.getByText(/try adjusting your filters/i)).toBeInTheDocument();
	});

	it("should not render description when not provided", () => {
		renderEmptyState();

		expect(screen.queryByText(/try adjusting/i)).not.toBeInTheDocument();
	});

	it("should render a section with accessible name", () => {
		renderEmptyState();

		expect(
			screen.getByRole("region", { name: /no results found/i }),
		).toBeInTheDocument();
	});

	it("should render default icon when no custom icon is provided", () => {
		renderEmptyState();

		expect(screen.getByLabelText(/no results found/i)).toBeInTheDocument();
	});

	it("should render custom icon when icon prop is provided", () => {
		renderEmptyState({
			additionalProps: {
				icon: <span>Custom Icon</span>,
			},
		});

		expect(screen.getByText(/custom icon/i)).toBeInTheDocument();
	});

	it("should render action when provided", () => {
		renderEmptyState({
			additionalProps: {
				action: <button type="button">Create item</button>,
			},
		});

		expect(
			screen.getByRole("button", { name: /create item/i }),
		).toBeInTheDocument();
	});

	it("should allow interaction with action element", async () => {
		const user = userEvent.setup();

		renderEmptyState({
			additionalProps: {
				action: <button type="button">Retry</button>,
			},
		});

		await user.click(screen.getByRole("button", { name: /retry/i }));

		expect(screen.getByRole("button", { name: /retry/i })).toBeInTheDocument();
	});

	it("should support search variant", () => {
		renderEmptyState({
			additionalProps: { variant: "search" },
		});

		expect(
			screen.getByRole("heading", { name: /no results found/i }),
		).toBeInTheDocument();
	});

	it("should support noData variant", () => {
		renderEmptyState({
			additionalProps: { variant: "noData" },
		});

		expect(
			screen.getByRole("heading", { name: /no results found/i }),
		).toBeInTheDocument();
	});

	it("should support folder variant", () => {
		renderEmptyState({
			additionalProps: { variant: "folder" },
		});

		expect(
			screen.getByRole("heading", { name: /no results found/i }),
		).toBeInTheDocument();
	});
});
