import {Main, Box, Heading, Table, TableHeader, TableCell, TableBody} from 'grommet'
import {Cafeteria} from 'grommet-icons'
import * as React from 'react'

import * as api from 'api'
import {getRecipeResponse} from 'api'

const Loading = () => (
	<Box justify='center' height='medium'>
		<Box animation='jiggle'>
			<Cafeteria size='large' />
		</Box>
	</Box>
)

const RecipeComponent = ({id}: {id: number}) => {
	const [r, setR] = React.useState<getRecipeResponse | null>(null)

	React.useEffect(() => {
		api.getRecipe(id).then((r: getRecipeResponse) => {
			setR(r)
		})
	}, [])

	let content: React.ReactElement
	if (r === null) {
		content = <Loading />
	}
	else {
		content = (
			<Box width='xlarge' pad='large'>
				<Heading level={2}>{r.r.name}</Heading>
				<Box fill>
					<Table>
						<TableHeader>
							<TableCell><small><strong>Category</strong></small></TableCell>
							<TableCell><small><strong>Yields</strong></small></TableCell>
							<TableCell><small><strong>Updated</strong></small></TableCell>
						</TableHeader>
						<TableBody>
							<TableCell>{r.r.category}</TableCell>
							<TableCell>{r.r.yields}</TableCell>
							<TableCell>{r.r.updated}</TableCell>
						</TableBody>
					</Table>
				</Box>
				<Box>
					<Heading level={3}>Ingredients</Heading>
					<Box>{r.ingredients.map(i => <Box key={i.id}>{i.value}</Box>)}</Box>
				</Box>
				<Box>
					<Heading level={3}>Instructions</Heading>
					<Box>{r.instructions.map(i => <>{i.value}<br /></>)}</Box>
				</Box>
			</Box>
		)
	}

	return <Main align='center'>{content}</Main>
}

export default RecipeComponent
