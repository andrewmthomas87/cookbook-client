import {Router, RouteComponentProps} from '@reach/router'
import {Grommet} from 'grommet'
import * as React from 'react'
import {render} from 'react-dom'

import Home from 'components/Home'
import Recipe from 'components/Recipe'

import 'less/global.less'

const HomeRoute = (_: RouteComponentProps) => <Home />

interface RecipeRouteProps extends RouteComponentProps {
	id?: string
}

const RecipeRoute = (props: RecipeRouteProps) => <Recipe id={parseInt(props.id || '')} />

render((
	<Grommet>
		<Router>
			<HomeRoute path='/' />
			<RecipeRoute path='recipe/:id' />
		</Router>
	</Grommet>
), document.getElementById('root'))
