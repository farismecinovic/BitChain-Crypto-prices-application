import React, { FunctionComponent, useState, useEffect } from "react";
import axios from "axios";
import { message, Spin } from "antd";
import Coin from "../components/Layout/Coin";
import { useAtom } from "jotai";
import { coinListAtom, favoriteCoinsAtom } from "../state/state";
import { CalcModal } from "../components/Layout/CalcModal";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Layout/Footer";

interface CryptoCoin {
  image: string;
  current_price: number;
  name: string;
  symbol: string;
  price_change_percentage_24h: number;
  id: string;
}

const LandingPage: FunctionComponent = () => {
  const [coins, setCoins] = useAtom(coinListAtom);
  const [favoriteCoins, setFavoriteCoins] = useAtom(favoriteCoinsAtom);
  const [search, setSearch] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cryptoId, setCryptoId] = useState("");

  const openCryptoCalcModal = (id: string) => {
    setIsModalVisible(true);
    setCryptoId(id);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleChange = (event: any) => {
    setSearch(event.target.value);
  };

  const filteredCoins = coins.filter((coin: CryptoCoin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );
  const gettingCoins = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      );
      setCoins(response.data);
      setLoading(false);
    } catch (e) {
      console.warn(e);
    }
  };
  const addFavoriteCoin = (coin: CryptoCoin) => {
    if (favoriteCoins.includes(coin)) {
      const filteredArray = favoriteCoins.filter((el) => el.name !== coin.name);
      setFavoriteCoins(filteredArray);
      message.error("Removed from favorites...", 1);
    } else {
      setFavoriteCoins([...favoriteCoins, coin]);
      message.success("Successfully added to favorites!", 1);
    }
  };

  useEffect(() => {
    gettingCoins();
  }, []);

  return (
    <React.Fragment>
      <div id="page-wrapper">
        <Navbar />
        <section id="intro" className="wrapper style2">
          <div className="title">Cryptocurency list</div>
          <div className="container">
            {loading ? (
              <Spin tip="Cryptocurency loading..." />
            ) : (
              <div>
                <form method="post" action="#">
                  <div className="row gtr-50">
                    <div
                      className="col-8 col-12-small"
                      style={{ margin: "0 auto" }}
                    >
                      <input
                        onChange={handleChange}
                        type="text"
                        name="name"
                        id="contact-name"
                        placeholder="Search cryptos.."
                      />
                    </div>
                  </div>
                </form>
                <CalcModal
                  visible={isModalVisible}
                  onOk={handleOk}
                  cryptoId={cryptoId}
                />
                <div>
                  {filteredCoins.map((coin) => (
                    <div key={coin.id}>
                      <Coin
                        image={coin.image}
                        name={coin.name}
                        price={coin.current_price}
                        symbol={coin.symbol}
                        priceChange={coin.price_change_percentage_24h}
                        favoriteClicked={() => addFavoriteCoin(coin)}
                        calculateHandler={() => openCryptoCalcModal(coin.id)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default LandingPage;
