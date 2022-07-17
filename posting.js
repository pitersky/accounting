import produce from 'immer';
import Account from './account.js';

const stateHistory = [];
const journal = [];
const posting = [];
const accounts = {
  cash: new Account('cash'),
  yuri: new Account('yuri'),
  smith: new Account('smith'),
  wong: new Account('wong'),
};

const inititalState = () => ({
  journal,
  posting,
  accounts,
});
stateHistory.push(inititalState());
const currentState = () => stateHistory[stateHistory.length - 1];
const createNextState = (fn) => stateHistory.push(fn(currentState()));

export const opTypes = Object.freeze({
  deposit: 'Deposit',
  transfer: 'Transfer',
});
let operations = 0;

const transfer = (from, to, amount) => {};
const deposit = (to, amount) => transfer('cash', to, amount);

function Tx({ journal, posting, accounts, from, to, amount, type }) {
  return produce(
    { journal, posting, accounts },
    ({ journal, posting, accounts }) => {
      if (!accounts[from]) {
        throw new Error(`from account not found: ${from}`);
      }
      if (!accounts[to]) {
        throw new Error(`to account not found: ${to}`);
      }

      const fromAccount = accounts[from];
      const toAccount = accounts[to];

      journal.push({ id: ++operations, type });

      fromAccount.push({ debit: amount, to });
      posting.push({
        account: fromAccount,
        type,
        amount: -amount,
      });

      toAccount.push({ credit: amount, from });
      posting.push({
        account: toAccount,
        type,
        amount,
      });
    }
  );
}

export const pushTx = ({ from, to, type, amount }) => {
  console.log(`pushTx: ${from}->${to} ${type} ${amount}`);
  const nextState = Tx({
    ...currentState(),
    from,
    to,
    type,
    amount,
  });
  stateHistory.push(nextState);

  console.log(nextState);
};

export const balance = () =>
  posting.reduce((prev, cur) => {
    return prev + cur.amount;
  }, 0);

export const getAccount = (name) => accounts[name];
