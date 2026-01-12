import { Heart } from "lucide-react";

export const FavoritesListPage = () => {
	return (
		<div className="space-y-6">
			<div className="flex items-center gap-3 mb-2">
				<Heart className="w-8 h-8 text-red-500 fill-red-500" />
				<h1 className="text-3xl font-bold text-gray-900">Favorite Resources</h1>
			</div>
		</div>
	);
};
