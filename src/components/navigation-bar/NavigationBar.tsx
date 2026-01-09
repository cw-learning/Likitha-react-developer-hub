import { NAVIGATION_ITEMS } from "../../constants/navigation";
import { Button } from "../button/Button";

interface NavigationBarProps {
	currentView: "home" | "favorites";
	onNavigate: (view: "home" | "favorites") => void;
}

export const NavigationBar = ({
	currentView,
	onNavigate,
}: NavigationBarProps) => {
	return (
		<nav className="flex gap-1" aria-label="Main navigation">
			{NAVIGATION_ITEMS.map((item) => {
				const Icon = item.icon;
				const isActive = currentView === item.view;

				return (
					<Button
						key={item.view}
						variant="nav"
						onClick={() => onNavigate(item.view)}
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
				);
			})}
		</nav>
	);
};
