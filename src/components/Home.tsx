import {Main, Box, DataTable, Text, TextInput} from 'grommet'
import {Cafeteria} from 'grommet-icons'
import * as React from 'react'

import * as api from 'api'
import {Recipe} from 'api'
import config from 'config'
import {Link} from '@reach/router'

const Loading = () => (
	<Box justify='center' height='medium'>
		<Box animation='jiggle'>
			<Cafeteria size='large' />
		</Box>
	</Box>
)

const Recipes = ({rs}: {rs: Recipe[]}) => {
	const [search, setSearch] = React.useState('')
	const [setSearchThrottled] = React.useState(() => {
		let timeout: any = null
		let tick = Date.now()

		return (event: React.FormEvent<HTMLInputElement>) => {
			const value = event.currentTarget.value
			if (timeout !== null) {
				clearTimeout(timeout)
				timeout = setTimeout(() => {
					setSearch(value)
					timeout = null
				}, tick - Date.now())
			}
			else {
				timeout = setTimeout(() => {
					setSearch(value)
					timeout = null
				}, config.searchThrottle)
				tick = Date.now() + config.searchThrottle
			}
		}
	})

	const filteredRs = rs
		.map(r => ({
			r,
			index: r.name.toLowerCase().indexOf(search.toLowerCase())
		}))
		.filter(r => r.index >= 0)
		.sort((a, b) => {
			if (a.index - b.index != 0) {
				return a.index - b.index
			}
			return a.r.name < b.r.name ? -1 : 1
		})
		.map(r => r.r)

	return (
		<Box width='xlarge' pad='large'>
			<Box pad='small'>
				<TextInput autoFocus
					placeholder='Search'
					onChange={setSearchThrottled} />
			</Box>
			<DataTable columns={[{
				property: 'name',
				header: <Text>Name</Text>,
				render: r => <Link to={`recipe/${r.id}`}>{r.name}</Link>
			}, {
				property: 'category',
				header: <Text>Category</Text>
			}, {
				property: 'yields',
				header: <Text>Yields</Text>
			}, {
				property: 'updated',
				header: <Text>Updated</Text>
			}]}
				data={filteredRs}
				primaryKey='id' />
		</Box>
	)
}

const Home = () => {
	const [recipes, setRecipes] = React.useState<Recipe[] | null>(null)

	React.useEffect(() => {
		api.getRecipes().then(recipes => setRecipes(recipes))
	}, [])

	let content: React.ReactElement
	if (!recipes) {
		content = <Loading />
	}
	else {
		content = <Recipes rs={recipes} />
	}

	return <Main align='center'>{content}</Main>
}

export default Home
