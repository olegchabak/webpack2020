import * as $ from 'jquery';
import Post from '@models/Post';
import './styles/styles.css';
import json from './assets/json';
import WebpackLogo from './assets/logo.png'
import xmlFile from './assets/data.xml'
import csvFile from './assets/finance-csv.csv'

const post = new Post('Webpack Post Title', WebpackLogo);
console.log('post.toString(): ', post.toString() );

console.log('json: ', json);
console.log('xmlFile: ', xmlFile);
console.log('csvFile: ', csvFile);
// проверка импорта либы
console.log($('.logo').hasClass('logo'));