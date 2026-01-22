import type { ResourceFilters } from "./resources.types";

export const resourceQueryKeys = {
	base: ["resources"] as const,

	allResources: () => [...resourceQueryKeys.base, "all"] as const,

	filteredResources: (filters: ResourceFilters) =>
		[...resourceQueryKeys.base, "filtered", JSON.stringify(filters)] as const,

	resourceById: (resourceId: string) =>
		[...resourceQueryKeys.base, "detail", resourceId] as const,
};
