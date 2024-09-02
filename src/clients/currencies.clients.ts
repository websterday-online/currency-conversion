import axiosApiInstance from "@/helpers/axios.config";
import { CurrenciesResponseModel } from "@/models/currencies.models";
import type { CurrencyInterface } from "@/models/currencies.models";

export default class CurrenciesClients {
  static async getCurrencies() {
    const {
      status,
      data
    } = await axiosApiInstance.get<Promise<CurrencyInterface>>("https://status.neuralgeneration.com/api/currency");
    return new CurrenciesResponseModel(status, data);
  }
}

