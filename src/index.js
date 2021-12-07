import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import ThemeService from './services/theme-service';
import ErrorBoundry from './components/error-boundry';
import { BrowserRouter as Router } from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import './css/global.scss';

import { Provider } from "react-redux";
import { ThemeServiceProvider } from './components/evdesign-service-context';
import store from './store';

const themeService = new ThemeService();

ReactDOM.render(
    <h1>111</h1>,
    document.getElementById('root')
);

// ReactDOM.render(
//     <React.StrictMode>
//         <Provider store={store}>
//             <ErrorBoundry>
//                 <ThemeServiceProvider value={themeService}>
//                     {/* <Router> */}
//                         <App />
//                     {/* </Router> */}
//                 </ThemeServiceProvider>
//             </ErrorBoundry>
//         </Provider>
//     </React.StrictMode>,
//     document.getElementById('root')
// );


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();