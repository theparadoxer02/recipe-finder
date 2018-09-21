import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './components/App';
import FavouriteRecipeList from './components/FavouriteRecipeList';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';

const store = createStore(rootReducer);
store.subscribe(() => console.log('store', store.getState()));


ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<Switch>
				<Route exact path='/' component={App} />
				<Route path='/favourites' component={FavouriteRecipeList} />
			</Switch>
		</BrowserRouter>
	</Provider>, document.getElementById('root'));