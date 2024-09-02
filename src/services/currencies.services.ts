import CurrenciesClients from "@/clients/currencies.clients";
import type { CurrencyInterface } from "@/models/currencies.models";

export default class CurrenciesServices {
  static async getCurrencies() {
    const { currencies } = await CurrenciesClients.getCurrencies<Promise<CurrencyInterface>>();
    await new Promise(r => setTimeout(r, 2000)); // For showing preloader
    return currencies;
  }
}

