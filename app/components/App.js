import React, { Component } from 'react';
import SearchRecipes from './SearchRecipes';
import RecipeList from './RecipeList';
import FavouriteRecipeList from './FavouriteRecipeList';
import '../styles/index.css';


class App extends Component {
	render() {
		return (
			<div>
	  			<h2> Recipe finder</h2>
	  			<SearchRecipes />
	  			<RecipeList />
	  			<FavouriteRecipeList />
			</div>
		)
	}
}

export default App;