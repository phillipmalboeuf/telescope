import json from 'json-complete'

export async function get(req, res) {
	const { contact } = req.navigation

	res.writeHead(200, {
		'Content-Type': 'application/json'
	})

	
	res.end(json.encode(contact))
}