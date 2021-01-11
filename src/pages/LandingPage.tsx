import React, { FunctionComponent, useState, useEffect } from "react";
import axios from "axios";
import { Content } from "antd/es/layout/layout";
import { Button, message, Spin } from "antd";
import Title from "antd/es/typography/Title";
import Search from "antd/es/input/Search";
import DefaultLayout from "../components/Layout/DefaultLayout";
import Coin from "../components/Layout/Coin";
import { useAtom } from "jotai";
import { coinListAtom, favoriteCoinsAtom } from "../state/state";
import { CalcModal } from "../components/Layout/CalcModal";

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
      {loading ? (
        <div className="loading">
          <Spin size="large" tip="Bitchain Loading..." />
        </div>
      ) : (
        <DefaultLayout>
          <Content
            className="site-layout"
            style={{ padding: "0", marginTop: 64, height: "auto" }}
          >
            <CalcModal
              visible={isModalVisible}
              onOk={handleOk}
              cryptoId={cryptoId}
            />
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 380 }}
            >
              <div className="hero">
                <Title
                  style={{ color: "#fff", textAlign: "center", marginTop: 64 }}
                >
                  Buy & sell Crypto in minutes
                </Title>
                <Title level={4} style={{ color: "#dbdbdb" }}>
                  Join the world's largest crypto exchange
                </Title>

                <Button
                  type="primary"
                  shape="round"
                  style={{ marginTop: 40, outline: "5px" }}
                >
                  Start trading now!
                </Button>
              </div>
            </div>
            <div className="crypto-container">
              <div className="search-container">
                <Search
                  placeholder="Search crypto.."
                  enterButton
                  style={{ marginBottom: 10 }}
                  onChange={handleChange}
                />
              </div>
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
          </Content>
        </DefaultLayout>
      )}
    </React.Fragment>
  );
};

export default LandingPage;
