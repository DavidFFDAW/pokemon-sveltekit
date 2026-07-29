import groups from "$lib/data/egg-groups.json";

export async function load() {
	return {
		metas: {
			title: 'Grupos Huevo',
			description: 'Lista de todos los grupos huevo de Pokémon',
		},
		eggGroups: Object.values(groups)
	};
}