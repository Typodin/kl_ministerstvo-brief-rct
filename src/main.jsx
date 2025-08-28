import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import App from './App.jsx';
import './styles/style.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<Routes>
			<Route path="/:eventId" element={<App/>}/>
			<Route path="*" element={<div>Страница не найдена</div>}/>
		</Routes>
	</BrowserRouter>
);