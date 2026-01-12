import { Heart, Home } from "lucide-react";

export const NAVIGATION_ITEMS = [
	{ path: "/", icon: Home, label: "Resources" },
	{ path: "/favorites", icon: Heart, label: "Favorites" },
] as const;
