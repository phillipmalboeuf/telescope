import json from 'json-complete'
import { asset } from '../../clients/contentful'

export async function get(req, res) {
	const { contact } = req.navigation
	const photo = await asset('1WrnPgyQLl60l8c6MJMFy8', 'fr-CA')

	res.writeHead(200, {
		'Content-Type': 'application/json'
	})

	res.end(json.encode({ contact, photo }))
}