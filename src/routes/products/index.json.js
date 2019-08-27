import json from 'json-complete'

export function get(req, res) {
	const { products } = req.navigation

	res.writeHead(200, {
		'Content-Type': 'application/json'
	})

	res.end(json.encode(products))
}