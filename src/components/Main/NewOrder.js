import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap';

import web3 from '../../instances/connection';
import { getToken, getExchange } from '../../instances/contracts';
import Spinner from '../Layout/Spinner';
import { makeBuyOrder, makeSellOrder } from '../../store/orders-actions';

const NewOrder = () => {
  const networkId = useSelector(state => state.web3.networkId);
  const token = getToken(networkId);
  const exchange = getExchange(networkId);
  const account = useSelector(state => state.web3.account);

  const orderBuying = useSelector(state => state.orders.orderBuying);
  const orderSelling = useSelector(state => state.orders.orderSelling);

  const [buyOrderAmount, setBuyOrderAmount] = useState('');
  const [buyOrderPrice, setBuyOrderPrice] = useState('');
  const [sellOrderAmount, setSellOrderAmount] = useState('');
  const [sellOrderPrice, setSellOrderPrice] = useState('');
  
  const dispatch = useDispatch();

  const showBuyTotal = buyOrderAmount && buyOrderPrice;
  const showSellTotal = sellOrderAmount && sellOrderPrice;
  const showForm = !orderBuying && !orderSelling;
  
  const orderForm = () => {    
    const buyOrderSubmitHandler = (event) => {
      event.preventDefault();
      dispatch(makeBuyOrder(exchange, token, web3, buyOrderAmount, buyOrderPrice, account));
      setBuyOrderAmount('');
      setBuyOrderPrice('');
    };
  
    const buyOrderAmountChangeHandler = (event) => {
      setBuyOrderAmount(event.target.value);
    };
  
    const buyOrderPriceChangeHandler = (event) => {
      setBuyOrderPrice(event.target.value);
    };
  
    const sellOrderSubmitHandler = (event) => {
      event.preventDefault();
      dispatch(makeSellOrder(exchange, token, web3, sellOrderAmount, sellOrderPrice, account));
      setSellOrderAmount('');
      setSellOrderPrice('');
    };
  
    const sellOrderAmountChangeHandler = (event) => {
      setSellOrderAmount(event.target.value);
    };
  
    const sellOrderPriceChangeHandler = (event) => {
      setSellOrderPrice(event.target.value);
    };
    
    return(
      <Tabs defaultActiveKey="buy" className="bg-dark text-white">
        <Tab eventKey="buy" title="Buy" className="bg-dark">
          <form onSubmit={buyOrderSubmitHandler}>
            <div className="form-group small mb-3">
              <label>Buy Amount (mTC)</label>
              <div className="input-group mt-1">
                <input
                  type="text"
                  placeholder="Buy Amount"
                  onChange={buyOrderAmountChangeHandler}
                  className="form-control form-control-sm bg-dark text-white"
                  required 
                />
              </div>  
            </div>
            <div className="form-group small mb-3">
              <label>Buy Price</label>
              <div className="input-group mt-1">
                <input
                  type="text"
                  placeholder="Buy Price"
                  onChange={buyOrderPriceChangeHandler}
                  className="form-control form-control-sm bg-dark text-white"
                  required 
                />
              </div>             
            </div>
            <button type="sumbit" className="btn btn-primary btn-block btn-sm col-12">Buy Order</button>
            {showBuyTotal && <small>Total: {buyOrderAmount * buyOrderPrice} ETH</small>}
          </form>
        </Tab>
        <Tab eventKey="sell" title="Sell" className="bg-dark">
          <form onSubmit={sellOrderSubmitHandler}>
            <div className="form-group small mb-3">
              <label>Sell Amount (mTC)</label>
              <div className="input-group mt-1">
                <input
                  type="text"
                  placeholder="Sell Amount"
                  onChange={sellOrderAmountChangeHandler}
                  className="form-control form-control-sm bg-dark text-white"
                  required 
                />
              </div>  
            </div>
            <div className="form-group small mb-3">
              <label>Sell Price</label>
              <div className="input-group mt-1">
                <input
                  type="text"
                  placeholder="Sell Price"
                  onChange={sellOrderPriceChangeHandler}
                  className="form-control form-control-sm bg-dark text-white"
                  required 
                />
              </div>             
            </div>
            <button type="sumbit" className="btn btn-primary btn-block btn-sm col-12">Sell Order</button>
            {showSellTotal && <small>Total: {sellOrderAmount * sellOrderPrice} ETH</small>}
          </form>
        </Tab>
      </Tabs>
    );
  };
  
  return(
    <div className="card bg-dark text-white">
      <div className="card-header"> 
        New Order
      </div>
      <div className="card-body">
        {showForm && orderForm()}
        {!showForm && <Spinner />}
      </div>
    </div>
  );
};

export default NewOrder;