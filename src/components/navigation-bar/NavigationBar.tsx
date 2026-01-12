import { NavLink } from "react-router-dom";
import { Button } from "../button/Button";
import { NAVIGATION_ITEMS } from "../../constants/navigation";

export const NavigationBar = () => {
	return (
		<nav className="flex gap-1" aria-label="Main navigation">
			{NAVIGATION_ITEMS.map((item) => {
				const Icon = item.icon;

				return (
					<NavLink
						key={item.path}
						to={item.path}
						end={item.path === "/"}
						className="contents"
					>
						{({ isActive }) => (
							<Button
								variant="nav"
								aria-current={isActive ? "page" : undefined}
								className={
									isActive
										? "bg-blue-50 text-blue-700 hover:bg-blue-100 active:bg-blue-200 focus-visible:ring-blue-500"
										: ""
								}
							>
								<Icon className="w-5 h-5" aria-hidden="true" />
								<span className="hidden sm:inline">{item.label}</span>
							</Button>
						)}
					</NavLink>
				);
			})}
		</nav>
	);
};
