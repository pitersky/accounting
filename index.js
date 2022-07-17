// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>Posting</h1>`;

import { pushTx, opTypes, balance, getAccount } from './posting.js';

pushTx({
  from: 'cash',
  to: 'yuri',
  type: opTypes.deposit,
  amount: 100,
});

console.log('op1');
console.log('balance1', balance());

pushTx({
  from: 'yuri',
  to: 'smith',
  type: opTypes.transfer,
  amount: 50,
});

console.log(getAccount('yuri').state);
console.log(getAccount('cash').state);
console.log(getAccount('smith').state);
console.log('balance2', balance());
