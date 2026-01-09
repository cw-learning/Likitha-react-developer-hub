import { Heart, Home } from "lucide-react";

export const NAVIGATION_ITEMS = [
	{ view: "home" as const, icon: Home, label: "Resources" },
	{ view: "favorites" as const, icon: Heart, label: "Favorites" },
];
