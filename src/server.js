import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import { navigation } from './clients/contentful';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const content = async (req, res, next) => {
	req.navigation = await navigation('fr-CA')
	next();
}

polka()
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		content,
		sapper.middleware({
			session: (req, res) => {
				return {
					navigation: req.navigation
				}
			}
		})
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
