export const localstorage = {
	get: (key: string | null = null) => {
		if (typeof window === 'undefined') return null;
		const storedValues = JSON.parse(window.localStorage.getItem('sveltekit-pokemon-app') || '{}');
		if (!key) return storedValues;
	
		if (storedValues[key]) return JSON.parse(storedValues[key]);
		return null;
	},
	// set: (key: string, value: any) => {
	// 	if (typeof window !== 'undefined') {
	// 		window.localStorage.setItem(key, JSON.stringify(value));
	// 	}
	set: (key: string, value: any) => {
		if (typeof window !== 'undefined') {
			const existingValues = JSON.parse(window.localStorage.getItem('sveltekit-pokemon-app') || '{}');
			existingValues[key] = value;
			window.localStorage.setItem('sveltekit-pokemon-app', JSON.stringify(existingValues));
		}
	}
}