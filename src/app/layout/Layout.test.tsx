import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, it } from "vitest";
import { Layout } from "./Layout";

interface RenderOptions {
	initialRoute?: string;
	outletContent?: React.ReactNode;
}

const renderLayout = (options?: RenderOptions) => {
	const { initialRoute = "/", outletContent = <div>Page Content</div> } =
		options || {};

	return render(
		<MemoryRouter initialEntries={[initialRoute]}>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={outletContent} />
					<Route path="favorites" element={outletContent} />
				</Route>
			</Routes>
		</MemoryRouter>,
	);
};

describe("Layout", () => {
	it("should render the logo", () => {
		renderLayout();

		const logo = screen.getByRole("heading", {
			name: /react resource hub/i,
		});

		expect(logo).toBeInTheDocument();
	});

	it("should render navigation bar", () => {
		renderLayout();

		const navigation = screen.getByRole("navigation");

		expect(navigation).toBeInTheDocument();
	});

	it("should render outlet content inside main", () => {
		renderLayout();

		const content = screen.getByText("Page Content");
		const main = screen.getByRole("main");

		expect(content).toBeInTheDocument();
		expect(main).toContainElement(content);
	});

	it("should render navigation items", () => {
		renderLayout();

		expect(
			screen.getByRole("button", { name: /resources/i }),
		).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /favorites/i }),
		).toBeInTheDocument();
	});

	it("should render footer", () => {
		renderLayout();

		const footer = screen.getByRole("contentinfo");

		expect(footer).toBeInTheDocument();
	});
});
