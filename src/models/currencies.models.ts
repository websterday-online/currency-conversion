interface CurrencyInterface {
  key: string,
  value: number,
  list: Array<CurrencyListInterface>
}

interface CurrencyListInterface {
  key: string,
  value: number,
  name: string,
  from: string,
  to: string
}


class CurrenciesResponseModel {
  currencies: Array<CurrencyInterface>;

  constructor(status: number, data: object) {
    if (status === 200) {
      this.currencies = this._setCurrencies(data);
    } else {
      throw new Error("Ooops!");
    }
  }

  _setCurrencies(data) {
    const currenciesList = {};
    const currenciesListArray: Array<CurrencyInterface> = [];

    for (const [key] of Object.entries(data)) {
      const name = key.split("-")[0];
      const currencyParent = new CurrencyModel(name);

      if (!Object.prototype.hasOwnProperty.call(currenciesList, name)) {
        currenciesList[name] = currencyParent;
      }
    }

    for (const [key, value] of Object.entries(data)) {
      const name = key.split("-")[0];
      const currencyChild = new CurrencyItemModel(key, value, name);

      if (Object.prototype.hasOwnProperty.call(currenciesList, name)) {
        currenciesList[name].list.push(currencyChild);
      }
    }

    currenciesListArray.push(...Object.values(currenciesList));

    return currenciesListArray;
  }
}

class CurrencyModel {
  key: string;
  name: string;
  list: Array<CurrencyListInterface>;

  constructor(name) {
    this.key = name;
    this.name = name;
    this.list = [];
  }
}

class CurrencyItemModel implements CurrencyListInterface {
  key: string;
  value: number;
  name: string;
  from: string;
  to: string;

  constructor(key, value, name) {
    this.key = key;
    this.value = value;
    this.name = key.split("-")[1];
    this.from = name;
    this.to = key.split("-")[1];
  }
}

export {
  CurrenciesResponseModel,
  CurrencyInterface
};
