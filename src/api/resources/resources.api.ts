import { supabase } from "../../lib/supabase";
import type { Resource, ResourceFilters } from "./resources.types";

const RESOURCES_TABLE = "resources";

function handleSupabaseError(supabaseError: unknown): never {
	throw supabaseError;
}

export const resourcesApi = {
	async fetchAllResources(): Promise<Resource[]> {
		const { data: allResources, error: supabaseError } = await supabase
			.from(RESOURCES_TABLE)
			.select("*")
			.order("created_at", { ascending: false });

		if (supabaseError) handleSupabaseError(supabaseError);

		return (allResources as Resource[]) ?? [];
	},

	async fetchResourceById(resourceId: string): Promise<Resource | null> {
		const { data: singleResource, error: supabaseError } = await supabase
			.from(RESOURCES_TABLE)
			.select("*")
			.eq("id", resourceId)
			.maybeSingle();

		if (supabaseError) handleSupabaseError(supabaseError);

		return singleResource as Resource | null;
	},

	async fetchResourcesByFilters(filters: ResourceFilters): Promise<Resource[]> {
		const { types: resourceTypes, levels: skillLevels, searchQuery } = filters;

		let resourcesQuery = supabase
			.from(RESOURCES_TABLE)
			.select("*")
			.order("created_at", { ascending: false });

		if (resourceTypes && resourceTypes.length > 0) {
			resourcesQuery = resourcesQuery.in("type", resourceTypes);
		}

		if (skillLevels && skillLevels.length > 0) {
			resourcesQuery = resourcesQuery.in("level", skillLevels);
		}

		const { data: fetchedResources, error: supabaseError } =
			await resourcesQuery;

		if (supabaseError) handleSupabaseError(supabaseError);

		const resources = (fetchedResources as Resource[]) ?? [];

		if (!searchQuery) {
			return resources;
		}

		const normalizedSearchTerm = searchQuery.toLowerCase();

		const searchFilteredResources = resources.filter((resource) => {
			const titleContainsSearchTerm = resource.title
				.toLowerCase()
				.includes(normalizedSearchTerm);
			const descriptionContainsSearchTerm = resource.description
				.toLowerCase()
				.includes(normalizedSearchTerm);

			return titleContainsSearchTerm || descriptionContainsSearchTerm;
		});

		return searchFilteredResources;
	},
};
