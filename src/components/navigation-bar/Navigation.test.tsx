import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";
import { NavigationBar } from "./NavigationBar";

interface RenderOptions {
	initialRoute?: string;
}

const renderNavigationBar = (options?: RenderOptions) => {
	const { initialRoute = "/" } = options || {};

	return render(
		<MemoryRouter initialEntries={[initialRoute]}>
			<NavigationBar />
		</MemoryRouter>,
	);
};

describe("NavigationBar", () => {
	it("should render navigation landmark", () => {
		renderNavigationBar();

		const navigation = screen.getByRole("navigation");

		expect(navigation).toBeInTheDocument();
	});

	it("should render navigation buttons", () => {
		renderNavigationBar();

		const buttons = screen.getAllByRole("button");

		expect(buttons).toHaveLength(2);
	});

	it("should mark home as active when on home route", () => {
		renderNavigationBar({ initialRoute: "/" });

		const homeButton = screen.getByRole("button", {
			name: /resources/i,
		});

		expect(homeButton).toHaveAttribute("aria-current", "page");
	});

	it("should mark favorites as active when on favorites route", () => {
		renderNavigationBar({ initialRoute: "/favorites" });

		const favoritesButton = screen.getByRole("button", {
			name: /favorites/i,
		});

		expect(favoritesButton).toHaveAttribute("aria-current", "page");
	});

	it("should render navigation links with correct labels", () => {
		renderNavigationBar();

		expect(
			screen.getByRole("button", { name: /resources/i }),
		).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /favorites/i }),
		).toBeInTheDocument();
	});
});
