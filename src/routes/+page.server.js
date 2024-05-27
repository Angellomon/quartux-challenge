import { ShortestPath } from '$lib';

export const actions = {
	challenge: async (event) => {
		const formData = await event.request.formData();
		const inputStr = String(formData.get('input'));

		const result = ShortestPath(inputStr);
	}
};
