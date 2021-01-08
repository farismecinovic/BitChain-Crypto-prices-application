import { atom } from "jotai";

interface CryptoCoin {
  image: string;
  current_price: number;
  name: string;
  symbol: string;
  price_change_percentage_24h: number;
  id: string;
}

export const coinListAtom = atom<Array<CryptoCoin>>([]);
export const favoriteCoinsAtom = atom<Array<CryptoCoin>>([]);
