import json from 'json-complete'
import { entry } from '../../clients/contentful'

export async function get(req, res) {
	const { about } = req.navigation

	res.writeHead(200, {
		'Content-Type': 'application/json'
	})

	res.end(json.encode(await Promise.all(about.map(piece => entry(piece.sys.id, 'fr-CA')))))
}