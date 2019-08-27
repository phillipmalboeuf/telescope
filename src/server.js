import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import { navigation } from './clients/contentful';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const content = locale => async (req, res, next) => {
	req.locale = locale
	req.navigation = await navigation(locale)
	next();
}

polka()
	.use(
		'/en',
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		content('en-US'),
		sapper.middleware({
			session: (req, res) => {
				return {
					locale: req.locale,
					navigation: req.navigation
				}
			}
		})
	)
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		content('fr-CA'),
		sapper.middleware({
			session: (req, res) => {
				return {
					locale: req.locale,
					navigation: req.navigation
				}
			}
		})
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
