import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it } from "vitest";
import { ResourceListPage } from "./ResourceListPage";

const renderResourceListPage = () => {
	return render(<ResourceListPage />);
};

describe("ResourceListPage", () => {
	const user = userEvent.setup();

	it("should render the page heading", () => {
		renderResourceListPage();

		const heading = screen.getByRole("heading", { level: 1 });

		expect(heading).toBeInTheDocument();
	});

	it("should render the page description text", () => {
		renderResourceListPage();

		const description = screen.getByText(/discover/i);

		expect(description).toBeInTheDocument();
	});

	it("should render the search bar input", () => {
		renderResourceListPage();

		const searchInput = screen.getByRole("textbox");

		expect(searchInput).toBeInTheDocument();
	});

	it("should render resource type filter dropdown button", () => {
		renderResourceListPage();

		const filterButton = screen.getByRole("button", {
			name: /resource/i,
		});

		expect(filterButton).toBeInTheDocument();
	});

	it("should render skill level filter dropdown button", () => {
		renderResourceListPage();

		const filterButton = screen.getByRole("button", {
			name: /skill/i,
		});

		expect(filterButton).toBeInTheDocument();
	});

	it("should open resource type filter dropdown when clicked", async () => {
		renderResourceListPage();

		const filterButton = screen.getByRole("button", {
			name: /resource/i,
		});

		await user.click(filterButton);

		const checkbox = screen.getByRole("checkbox", { name: "Article" });

		expect(checkbox).toBeInTheDocument();
	});

	it("should open skill level filter dropdown when clicked", async () => {
		renderResourceListPage();

		const filterButton = screen.getByRole("button", {
			name: /skill/i,
		});

		await user.click(filterButton);

		const checkbox = screen.getByRole("checkbox", { name: "Beginner" });

		expect(checkbox).toBeInTheDocument();
	});

	it("should update search input as user types", async () => {
		renderResourceListPage();

		const searchInput = screen.getByRole("textbox");

		await user.type(searchInput, "react hooks");

		expect(searchInput).toHaveValue("react hooks");
	});

	it("should update filter selection when checkbox is clicked", async () => {
		renderResourceListPage();

		const filterButton = screen.getByRole("button", {
			name: /resource/i,
		});
		await user.click(filterButton);

		const checkbox = screen.getByRole("checkbox", { name: "Article" });
		await user.click(checkbox);

		// Badge should show selected count
		expect(screen.getByText("1")).toBeInTheDocument();
	});
});
