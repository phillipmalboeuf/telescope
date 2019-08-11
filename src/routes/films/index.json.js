import json from 'json-complete'

export function get(req, res) {
	const { films } = req.navigation

	res.writeHead(200, {
		'Content-Type': 'application/json'
	})

	res.end(json.encode(films))
}