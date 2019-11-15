import $ from 'jquery';
window.$ = window.jQuery = require('jquery');

import './components/main-header/main-header';
import './components/menu-toggle/menu-toggle';
import './components/scroll-to-anchor/scroll-to-anchor';
import './components/scroll-up/scroll-up';
import './components/get-price/get-price';
import './components/parts-search/parts-search';
import './components/free-consultation/free-consultation';
import './components/modal/modal';
import './components/thanks/thanks';


$('.safe-transportation__advantage-link').click(function() {
    return false;
});