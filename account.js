export default class Account {
  #credit = 0;
  #debit = 0;
  #txs = [];
  #name;
  constructor(name) {
    this.#name = name;
  }
  push(tx) {
    if (tx.credit) this.#credit += tx.credit;
    if (tx.debit) this.#debit += tx.debit;
    this.#txs.push(tx);
  }
  get credit() {
    return this.#credit;
  }
  get debit() {
    return this.#debit;
  }
  get state() {
    return {
      name: this.#name,
      debit: this.#debit,
      credit: this.#credit,
      txs: [...this.#txs], // clone
    };
  }
}
