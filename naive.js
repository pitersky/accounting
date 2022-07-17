import produce from 'immer';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>Cash Book</h1>`;

const txs = [];

function Account() {
  return {
    credit: 0,
    debit: 0,
    txs: [],
  };
}

function Tx(from, to, amount) {
  return produce({ from, to }, ({ from, to }) => {
    from.credit -= amount;
    to.debit += amount;

    from.txs.push({});
    to.txs.push({});
  });
}

const cash = new Account();
const yuri = new Account();
const input = new Tx(cash, yuri, 100);
console.log(input);
