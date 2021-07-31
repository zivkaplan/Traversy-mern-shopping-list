import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import store from './store';
import { Provider } from 'react-redux';
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <AppNavbar />
                <ShoppingList />
            </div>
        </Provider>
    );
}

export default App;
