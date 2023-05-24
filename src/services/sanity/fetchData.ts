import { createClient } from '@sanity/client';
import { PROJECT_ID } from './publicData';
import { DATASET } from './publicData';

export async function fetchData() {
	const client = createClient({
		projectId: PROJECT_ID,
		dataset: DATASET,
		useCdn: true,
		apiVersion: '2023-05-03',
	});

	const data = await client.fetch('*[_type == "category" || _type == "orders"]');
	return data;
}