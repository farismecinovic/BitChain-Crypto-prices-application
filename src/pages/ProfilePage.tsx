import React, { FunctionComponent } from "react";
import { message, Tooltip } from "antd";
import { useHistory } from "react-router";
import Title from "antd/es/typography/Title";
import Coin from "../components/Layout/Coin";
import { useAtom } from "jotai";
import { favoriteCoinsAtom } from "../state/state";
import { CalcModal } from "../components/Layout/CalcModal";
import { Link, NavLink } from "react-router-dom";
import Avatar from "antd/lib/avatar/avatar";
import { DoubleLeftOutlined, UserOutlined } from "@ant-design/icons";

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

interface Props {
  isModalVisible: boolean;
  handleOk: () => void;
  cryptoId: string;
  openCryptoCalcModal: any;
}

const ProfilePage: FunctionComponent<Props> = ({
  isModalVisible,
  handleOk,
  cryptoId,
  openCryptoCalcModal,
}) => {
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
      <div id="page-wrapper">
        <section id="intro" className="wrapper style1">
          <div id="logo">
            <h1>
              {" "}
              <DoubleLeftOutlined
                style={{ marginRight: 20 }}
                onClick={() => history.goBack()}
              />
              profile
            </h1>
          </div>
          <nav id="nav">
            <ul>
              <li className="current">
                <NavLink to="/">Home</NavLink>
              </li>
              <li className="current">
                <NavLink to="/">
                  <Tooltip title="Profile">
                    <NavLink to="/profile">
                      <Avatar icon={<UserOutlined />} />
                    </NavLink>
                  </Tooltip>
                </NavLink>
              </li>
              <li className="current">
                <NavLink to="/">About</NavLink>
              </li>
            </ul>
          </nav>
        </section>

        <section id="intro" className="wrapper style2" style={{ height: "" }}>
          <div className="title">
            {favoriteCoins.length === 0 ? (
              <h1>No favorite coins.</h1>
            ) : (
              <h1>Favorite Coins</h1>
            )}
          </div>
          <div className="container">
            <CalcModal
              visible={isModalVisible}
              onOk={handleOk}
              cryptoId={cryptoId}
            />
            <div>
              {favoriteCoins.length === 0 ? (
                <Title level={5} style={{ textAlign: "center" }}>
                  Start to <Link to="/">add</Link> favorite coins..
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
                          calculateHandler={() => console.log("Soon")}
                        />
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </React.Fragment>
  );
};

export default ProfilePage;
