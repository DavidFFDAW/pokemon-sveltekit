import { fetchEvolutionTree } from './test.service';

export async function load() {
	const [eevee, lotad, ralts] = await Promise.all([
		fetchEvolutionTree('eevee'),
		fetchEvolutionTree('lotad'),
		fetchEvolutionTree('ralts')
	]);
	
	return { eevee, lotad, ralts };
}
