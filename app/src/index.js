import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import MainProvider from './providers/MainProvider';
import theme from './theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<MainProvider theme={theme}>
		<App />
	</MainProvider>
);
