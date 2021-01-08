import React, { FunctionComponent, useState, useEffect } from "react";
import axios from "axios";
import { Content } from "antd/es/layout/layout";
import { Button, Spin } from "antd";
import DefaultLayout from "../components/Layout/DefaultLayout";
import Title from "antd/es/typography/Title";
import Search from "antd/es/input/Search";
import Coin from "../components/Layout/Coin";

interface CryptoCoin {
  image: string;
  current_price: number;
  name: string;
  symbol: string;
  price_change_percentage_24h: number;
  id: string;
}

const LandingPage: FunctionComponent = () => {
  const [coins, setCoins] = useState<Array<CryptoCoin>>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

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
          </Content>
          <div className="search-container">
            <Search
              placeholder="Search crypto.."
              enterButton
              style={{ marginBottom: 10 }}
              onChange={handleChange}
            />
          </div>
          <div className="crypto-container">
            {filteredCoins.map((coin) => (
              <div key={coin.id}>
                <Coin
                  image={coin.image}
                  name={coin.name}
                  price={coin.current_price}
                  symbol={coin.symbol}
                  priceChange={coin.price_change_percentage_24h}
                />
              </div>
            ))}
          </div>
        </DefaultLayout>
      )}
    </React.Fragment>
  );
};

export default LandingPage;
