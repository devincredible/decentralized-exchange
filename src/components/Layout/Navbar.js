import { useSelector, useDispatch } from 'react-redux';

import { loadAccount } from '../../store/web3-actions';
import logo from '../../img/logo.png';

const Navbar = () => {
  const account = useSelector(state => state.web3.account);
  const networkId = useSelector(state => state.web3.networkId);

  const dispatch = useDispatch();

  const connectWalletHandler = async() => {
    try {
      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    } catch(error) {
      console.error(error);
    }

    // Load Accounts
    dispatch(loadAccount());
  };

  let etherscanUrl;

  if(networkId === 3) {
    etherscanUrl = 'https://ropsten.etherscan.io'
  } else if(networkId === 4) {
    etherscanUrl = 'https://rinkeby.etherscan.io'
  } else if(networkId === 5) {
    etherscanUrl = 'https://goerli.etherscan.io'
  } else {
    etherscanUrl = 'https://etherscan.io'
  }
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <img src={logo} width="40" height="40" className="align-center" alt="logo" />
      <a className="navbar-brand" href="/#">mTC DExchange</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          {account && 
            <a 
              className="nav-link small" 
              href={`${etherscanUrl}/address/${account}`}
              target="blank"
              rel="noopener noreferrer"
            >
              {account}
            </a>}
          {!account && 
            <button 
              type="button" 
              className="btn btn-outline-light" 
              onClick={connectWalletHandler} 
            > 
              Connect your wallet
            </button>}
        </li>
      </ul>
    </nav> 
  );
};

export default Navbar;