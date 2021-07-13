import { useState } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap';

import web3 from '../../../instances/connection';
import { getToken, getExchange } from '../../../instances/contracts';
import {
  loadDepositEther, 
  loadWithdrawEther, 
  loadDepositToken, 
  loadWithdrawToken
} from '../../../store/exchange-actions';
import { formatBalance } from '../../../helpers/utils';

const BalanceContent = () => {
  const account = useSelector(state => state.web3.account);
  const networkId = useSelector(state => state.web3.networkId);
  const token = getToken(networkId);
  const exchange = getExchange(networkId);  

  const etherBalance = formatBalance(useSelector(state => state.web3.balance.data));
  const tokenBalance = formatBalance(useSelector(state => state.token.balance.data));
  const exchangeEtherBalance = formatBalance(useSelector(state => state.exchange.etherBalance.data));
  const exchangeTokenBalance = formatBalance(useSelector(state => state.exchange.tokenBalance.data));

  const [etherDepositAmount, setEtherDepositAmount] = useState('');
  const [etherWithdrawAmount, setEtherWithdrawAmount] = useState('');
  const [tokenDepositAmount, setTokenDepositAmount] = useState('');
  const [tokenWithdrawAmount, setTokenWithdrawAmount] = useState('');
  
  const dispatch = useDispatch();
  
  const etherDepositSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(loadDepositEther(exchange, web3, account, etherDepositAmount));
  };

  const etherWithdrawSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(loadWithdrawEther(exchange, web3, account, etherWithdrawAmount));
  };

  const etherDepositChangeHandler = (event) => {
    setEtherDepositAmount(event.target.value);
  };

  const etherWithdrawChangeHandler = (event) => {
    setEtherWithdrawAmount(event.target.value);
  };

  const tokenDepositSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(loadDepositToken(exchange, web3, account, tokenDepositAmount, token));
  };

  const tokenWithdrawSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(loadWithdrawToken(exchange, web3, account, tokenWithdrawAmount, token));
  };

  const tokenDepositChangeHandler = (event) => {
    setTokenDepositAmount(event.target.value);
  };

  const tokenWithdrawChangeHandler = (event) => {
    setTokenWithdrawAmount(event.target.value);
  };

  return(
    <Tabs defaultActiveKey="deposit" className="bg-dark text-white">
      <Tab eventKey="deposit" title="Deposit" className="bg-dark">
      <table className="table table-dark table-sm small">
          <thead>
            <tr>
              <th>Token</th>
              <th>Wallet</th>
              <th>Exchange</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ETH</td>
              <td>{etherBalance}</td>
              <td>{exchangeEtherBalance}</td>
            </tr>
            <tr>
              <td>mTC</td>
              <td>{tokenBalance}</td>
              <td>{exchangeTokenBalance}</td>
            </tr>            
          </tbody>
        </table> 
        <form className="row mb-2" onSubmit={etherDepositSubmitHandler}>
          <div className="col-sm">
            <input
              type="text"
              placeholder="ETH Amount"
              onChange={etherDepositChangeHandler}
              className="form-control form-control-sm bg-dark text-white"
              required 
            />
          </div>
          <div className="col-sm-auto pl-sm-0">
            <button type="sumbit" className="btn btn-primary btn-block btn-sm">Deposit</button>
          </div>
        </form>
        <form className="row" onSubmit={tokenDepositSubmitHandler}>
          <div className="col-sm pr-sm-2">
            <input
              type="text"
              placeholder="mTC Amount"
              onChange={tokenDepositChangeHandler}
              className="form-control form-control-sm bg-dark text-white"
              required 
            />
          </div>
          <div className="col-sm-auto pl-sm-0">
            <button type="sumbit" className="btn btn-primary btn-block btn-sm">Deposit</button>
          </div>
        </form>
      </Tab>
      <Tab eventKey="withdraw" title="Withdraw" className="bg-dark">
      <table className="table table-dark table-sm small">
          <thead>
            <tr>
              <th>Token</th>
              <th>Wallet</th>
              <th>Exchange</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ETH</td>
              <td>{etherBalance}</td>
              <td>{exchangeEtherBalance}</td>
            </tr>
            <tr>
              <td>mTC</td>
              <td>{tokenBalance}</td>
              <td>{exchangeTokenBalance}</td>
            </tr>
          </tbody>
        </table>
        <form className="row mb-2" onSubmit={etherWithdrawSubmitHandler}>
          <div className="col-sm pr-sm-2">
            <input
              type="text"
              placeholder="ETH Amount"
              onChange={etherWithdrawChangeHandler}
              className="form-control form-control-sm bg-dark text-white"
              required 
            />
          </div>
          <div className="col-sm-auto pl-sm-0">
            <button type="sumbit" className="btn btn-primary btn-block btn-sm">Withdraw</button>
          </div>
        </form>
        <form className="row" onSubmit={tokenWithdrawSubmitHandler}>
          <div className="col-sm pr-sm-2">
            <input
              type="text"
              placeholder="mTC Amount"
              onChange={tokenWithdrawChangeHandler}
              className="form-control form-control-sm bg-dark text-white"
              required 
            />
          </div>
          <div className="col-sm-auto pl-sm-0">
            <button type="sumbit" className="btn btn-primary btn-block btn-sm">Withdraw</button>
          </div>
        </form>
      </Tab>
    </Tabs>
  );
};

export default BalanceContent;