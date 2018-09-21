import React, { Component } from 'react';
import { connect } from 'react-redux';
import { favouriteRecipe } from '../actions';


class RecipeItem extends Component {
	
	constructor() {
		super();

		this.state = {
			favourited: false
		}
	}


	favourite(recipe) {
		this.props.favouriteRecipe(recipe);
		this.setState({ favourited: true });
	}

	render() {
		let { recipe } = this.props;

		return (
			<div className="recipe-item">
				{
					this.props.favouriteButton ?
						this.state.favourited ?
							<div className="star">
								&#9733;
							</div>
						:
							<div 
								className="star"
								onClick={() => this.favourite(recipe) }>
									&#9734;
							</div>
					:
						<div> </div>
				}
				
				<div className="recipe-text">
					<a href={ recipe.href}>
						<h4> {recipe.title} </h4>
					</a>
					<p> { recipe.ingredients } </p>
				</div>
				<img 
					src={recipe.thumbnail} 
					alt={recipe.title} 
					className='recipe-img'
				/>
			</div>
		)
	}
}

export default connect(null, { favouriteRecipe })(RecipeItem);
