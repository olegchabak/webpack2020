import * as $ from 'jquery';
import Post from '@models/Post';
import './styles/styles.scss';
import json from './assets/json';
import WebpackLogo from './assets/logo.png';
import xmlFile from './assets/data.xml';
import csvFile from './assets/finance-csv.csv';
import './babel.js';
import React from 'react';
import {render} from 'react-dom';


const post = new Post('Webpack Post Title', WebpackLogo);
console.log('post.toString(): ', post.toString());

console.log('json: ', json);
console.log('xmlFile: ', xmlFile);
console.log('csvFile: ', csvFile);
// проверка импорта либы
console.log($('.logo').hasClass('logo'));

const App = () => (
	<div className="container">
		<h1>webpack</h1>
		<div className="logo"></div>
		<img src="logo.png" alt="logo"/>
		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut deserunt nemo placeat, quaerat ullam
			velit?</p>
	</div>
);
render(<App/>, document.getElementById('app'));