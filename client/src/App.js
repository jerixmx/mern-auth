import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';

import './App.css';
import Navbar from './layout/Navbar';
import Landing from './layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

function App() {
	return (
		<Provider store={store}>
			<div className='App'>
				<Router>
					<Navbar />
					<Route exact path='/' component={Landing} />
					<Route exact path='/register' component={Register} />
					<Route exact path='/login' component={Login} />
				</Router>
			</div>
		</Provider>
	);
}

export default App;
