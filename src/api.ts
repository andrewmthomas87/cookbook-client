interface Recipe {
	id: number
	category: string
	name: string
	yields: string
	updated: string
}

interface Ingredient {
	id: number
	recipeId: number
	value: string
}

interface Instruction {
	id: number
	recipeId: number
	value: string
}

async function getRecipes(): Promise<Recipe[]> {
	const r = await fetch('http://localhost:8080/recipes/recipes')
	if (!r.ok) {
		throw r.json()
	}
	const data = await r.json()
	return data.rs
}

interface getRecipeResponse {
	r: Recipe
	ingredients: Ingredient[]
	instructions: Instruction[]
}

async function getRecipe(id: number): Promise<getRecipeResponse> {
	const r = await fetch(`http://localhost:8080/recipes/recipe/${id}`)
	if (!r.ok) {
		throw r.json()
	}
	return r.json()
}

export {Recipe, Ingredient, Instruction, getRecipes, getRecipeResponse, getRecipe}
