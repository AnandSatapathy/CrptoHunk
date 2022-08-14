import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { createContext } from "react";
import { CoinList } from "./Config/api.js";
const Crypto = createContext();
const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });
  // UsersRequestion
  useEffect(() => {
    onAuthStateChanged(auth,(user)=>{
      if(user) setUser(user);
      else setUser(null);
    })
  });
  //CoinList
  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);
  return (
    <div>
      <Crypto.Provider
        value={{
          currency,
          symbol,
          setCurrency,
          coins,
          loading,
          fetchCoins,
          setAlert,
          user,
          alert,
        }}
      >
        {children}
      </Crypto.Provider>
    </div>
  );
};

export default CryptoContext;
export const CryptoState = () => {
  return useContext(Crypto);
};
