import json from 'json-complete'
import { entry } from '../../clients/contentful'

export async function get(req, res) {
	const text = await entry('2l5u7u5276hDH9wNQ8mk9m', req.locale)

	res.writeHead(200, {
		'Content-Type': 'application/json'
	})

	res.end(json.encode(text))
}