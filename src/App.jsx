import { useState, useEffect } from "react";
import { ethers } from "ethers";
import reactLogo from "./assets/react.svg";
import metamaskLogo from "./assets/MetaMask.png";
import "./App.css";

function App() {
  const [haveMetamask, sethaveMetamask] = useState(true);
  const [accountAddress, setAccountAddress] = useState("");
  const [accountBalance, setAccountBalance] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  //window.ethereum
  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  //Check if Metamask is installed
  useEffect(() => {
    const { ethereum } = window;
    const checkMetamaskAvailability = async () => {
      if (!ethereum) {
        sethaveMetamask(false);
      }
      sethaveMetamask(true);
    };
    checkMetamaskAvailability();
  }, []);

  //Connect to Metamask Wallet
  const connectWallet = async () => {
    try {
      if (!ethereum) {
        sethaveMetamask(false);
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      let balance = await provider.getBalance(accounts[0]);
      let bal = ethers.utils.formatEther(balance);
      setAccountAddress(accounts[0]);
      setAccountBalance(bal);
      setIsConnected(true);
    } catch (error) {
      setIsConnected(false);
    }
  };

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://metamask.io" target="_blank">
          <img
            src={metamaskLogo}
            className="logo metamask"
            alt="Metamask logo"
          />
        </a>
      </div>
      <h1>Vite + React + Metamask</h1>

      {haveMetamask ? (
        <div>
          {isConnected && (
            <div>
              <div>
                <h3>Wallet Address:</h3>
                <p>
                  {accountAddress.slice(0, 4)}...
                  {accountAddress.slice(38, 42)}
                </p>
              </div>
              <div>
                <h3>Wallet Balance:</h3>
                <p>{accountBalance}</p>
              </div>
            </div>
          )}

          {isConnected ? (
            <p className="info">🎉 Connected Successfully</p>
          ) : (
            <button onClick={connectWallet}>Connect Metamask Wallet</button>
          )}
        </div>
      ) : (
        <p>Please Install MataMask</p>
      )}
    </div>
  );
}

export default App;
