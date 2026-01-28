import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, it, vi } from "vitest";
import { SearchBar } from "./SearchBar";

describe("SearchBar", () => {
	const user = userEvent.setup();

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("renders a search input", () => {
		render(<SearchBar />);

		const input = screen.getByRole("textbox");
		expect(input).toBeInTheDocument();
	});

	it("shows the clear button when the user types", async () => {
		render(<SearchBar />);

		const input = screen.getByRole("textbox");

		expect(
			screen.queryByRole("button", { name: /clear/i }),
		).not.toBeInTheDocument();

		await user.type(input, "react");

		expect(screen.getByRole("button", { name: /clear/i })).toBeInTheDocument();
	});

	it("clears the search input when the user clicks the clear button", async () => {
		render(<SearchBar />);

		const input = screen.getByRole("textbox");

		await user.type(input, "react");

		const clearButton = screen.getByRole("button", { name: /clear/i });
		await user.click(clearButton);

		expect(input).toHaveValue("");
	});

	it("does not show the clear button when clearing is disabled", async () => {
		render(<SearchBar showClearButton={false} />);

		const input = screen.getByRole("textbox");

		await user.type(input, "react");

		expect(
			screen.queryByRole("button", { name: /clear/i }),
		).not.toBeInTheDocument();
	});
	it("updates the search input as the user types", async () => {
		render(<SearchBar />);

		const input = screen.getByRole("textbox");

		await user.type(input, "a");

		expect(input).toHaveValue("a");
	});

	it("renders the input with an existing search text", () => {
		render(<SearchBar searchQuery="pre-filled text" />);

		const input = screen.getByRole("textbox");

		expect(input).toHaveValue("pre-filled text");
	});

	it("calls onChange with the typed value", async () => {
		const onChange = vi.fn();
		render(<SearchBar onChange={onChange} />);

		const input = screen.getByRole("textbox");
		await user.type(input, "react");

		expect(onChange).toHaveBeenCalled();
		expect(onChange).toHaveBeenLastCalledWith("react");
	});

	it("calls onChange with empty string when cleared", async () => {
		const onChange = vi.fn();
		render(<SearchBar onChange={onChange} />);

		const input = screen.getByRole("textbox");
		await user.type(input, "react");

		const clearButton = screen.getByRole("button", { name: /clear/i });
		await user.click(clearButton);

		expect(onChange).toHaveBeenLastCalledWith("");
	});
});
