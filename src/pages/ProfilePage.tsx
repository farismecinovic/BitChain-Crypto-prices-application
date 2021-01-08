import React, { FunctionComponent } from "react";
import { message, PageHeader } from "antd";
import DefaultLayout from "../components/Layout/DefaultLayout";
import { Content } from "antd/es/layout/layout";
import { useHistory } from "react-router";
import Title from "antd/es/typography/Title";
import Coin from "../components/Layout/Coin";
import { useAtom } from "jotai";
import { favoriteCoinsAtom } from "../state/state";

interface CryptoCoin {
  image: string;
  current_price: number;
  name: string;
  symbol: string;
  price_change_percentage_24h: number;
  id: string;
}

const warning = () => {
  message.warn("Coin removed from favorites!", 1);
};

const ProfilePage: FunctionComponent = (props) => {
  const history = useHistory();
  const [favoriteCoins, setFavoriteCoins] = useAtom(favoriteCoinsAtom);

  const removeFavoriteCoin = (clickedCoin: CryptoCoin) => {
    const filteredArray = favoriteCoins.filter(
      (coin) => coin.name !== clickedCoin.name
    );
    setFavoriteCoins(filteredArray);
    warning();
  };
  return (
    <React.Fragment>
      <DefaultLayout>
        <div style={{ height: "85vh" }}>
          <Content
            className="site-layout"
            style={{ padding: "0", marginTop: 64, height: "auto" }}
          >
            <PageHeader
              onBack={() => history.goBack()}
              title="Profile"
              subTitle=""
            />
          </Content>
          <div className="site-layout-content">
            <Title level={4}>Your favorite coins</Title>
            <div className="crypto-container">
              <div>
                {favoriteCoins.length === 0 ? (
                  <Title level={5} style={{ textAlign: "center" }}>
                    No favorite coins..
                  </Title>
                ) : (
                  <div>
                    {favoriteCoins &&
                      favoriteCoins.map((coin: any) => (
                        <div key={coin.id}>
                          <Coin
                            image={coin.image}
                            name={coin.name}
                            price={coin.current_price}
                            symbol={coin.symbol}
                            priceChange={coin.price_change_percentage_24h}
                            favoriteClicked={() => removeFavoriteCoin(coin)}
                          />
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </React.Fragment>
  );
};

export default ProfilePage;
