import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';

import store from './store/index';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')  
);