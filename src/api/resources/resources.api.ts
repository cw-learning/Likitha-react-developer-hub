import { RESOURCES_TABLE } from "../../constants/resources";
import { supabase } from "../../lib/supabase";
import type { Resource, ResourceFilters } from "./resources.types";

const handleSupabaseError = (error: unknown, context?: string): never => {
	throw new Error(context ? `Supabase error (${context})` : "Supabase error", {
		cause: error,
	});
};

export const resourcesApi = {
	async fetchAllResources(): Promise<Resource[]> {
		const { data: allResources, error: supabaseError } = await supabase
			.from(RESOURCES_TABLE)
			.select("*")
			.order("created_at", { ascending: false });

		if (supabaseError) handleSupabaseError(supabaseError, "fetchAllResources");

		return (allResources as Resource[]) ?? [];
	},

	async fetchResourceById(resourceId: string): Promise<Resource | null> {
		const { data: singleResource, error: supabaseError } = await supabase
			.from(RESOURCES_TABLE)
			.select("*")
			.eq("id", resourceId)
			.maybeSingle();

		if (supabaseError) handleSupabaseError(supabaseError, "fetchResourceById");

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
		if (searchQuery) {
			const searchPattern = `%${searchQuery}%`;
			resourcesQuery = resourcesQuery.or(
				`title.ilike.${searchPattern},description.ilike.${searchPattern}`,
			);
		}

		const { data: fetchedResources, error: supabaseError } =
			await resourcesQuery;

		if (supabaseError)
			handleSupabaseError(supabaseError, "fetchResourcesByFilters");
		return (fetchedResources as Resource[]) ?? [];
	},
};
