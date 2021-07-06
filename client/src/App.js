import './App.css';
import Navbar from './layout/Navbar';
import Landing from './layout/Landing';
import { BrowserRouter } from 'react-router-dom';

function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<Navbar />
				<Landing />
			</BrowserRouter>
		</div>
	);
}

export default App;
