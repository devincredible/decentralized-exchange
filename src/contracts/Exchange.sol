// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Token.sol";
import "openzeppelin-solidity/contracts/utils/math/SafeMath.sol";

contract Exchange {
  using SafeMath for uint;
  
  // Variables
  address public feeAccount;
  uint256 public feePercent;
  address constant ETHER = address(0); //store Ether in tokens mapping with balnk address
  mapping (address => mapping(address => uint256)) public tokens;
  mapping (uint256 => _Order) public orders;
  mapping (uint256 => bool) public orderCancelled;
  mapping (uint256 => bool) public orderFilled;
  uint256 public orderCount;

  // Events
  event Deposit(address token, address user, uint256 amount, uint256 balance);
  event Withdraw(address token, address user, uint256 amount, uint256 balance);
  event Order(
    uint id,
    address user,
    address tokenGet,
    uint amountGet,
    address tokenGive,
    uint amountGive,
    uint timestamp
  );

  event Cancel(
    uint id,
    address user,
    address tokenGet,
    uint amountGet,
    address tokenGive,
    uint amountGive,
    uint timestamp
  );

  event Trade(
    uint id,
    address user,
    address tokenGet,
    uint amountGet,
    address tokenGive,
    uint amountGive,
    address userFill,
    uint timestamp
  );

  // Structs
  struct _Order {
    uint id;
    address user;
    address tokenGet;
    uint amountGet;
    address tokenGive;
    uint amountGive;
    uint timestamp;
  }

  // Define fee percentage and the address where these fees will go
  constructor (address _feeAccount, uint256 _feePercent) {
    feeAccount = _feeAccount;
    feePercent = _feePercent;
  }

  // Fallback: reverts if Ether is sent to this smart contract by mistake
  fallback () external {
    revert();
  }
  
  // Function to deposit Ether
  function depositEther() payable public {
    tokens[ETHER][msg.sender] = tokens[ETHER][msg.sender].add(msg.value);
    emit Deposit(ETHER, msg.sender, msg.value, tokens[ETHER][msg.sender]);
  }

  // Function to withdraw Ether
  function withdrawEther(uint _amount) public {
    require(tokens[ETHER][msg.sender] >= _amount);
    tokens[ETHER][msg.sender] = tokens[ETHER][msg.sender].sub(_amount);
    payable(msg.sender).transfer(_amount);
    emit Withdraw(ETHER, msg.sender, _amount, tokens[ETHER][msg.sender]);
  }
  
  // Function to deposit a token
  function depositToken (address _token, uint _amount) public {
    require(_token != ETHER);
    require(Token(_token).transferFrom(msg.sender, address(this), _amount));
    tokens[_token][msg.sender] = tokens[_token][msg.sender].add(_amount);
    emit Deposit(_token, msg.sender, _amount, tokens[_token][msg.sender]);
  }

  // Function to withdraw a token
  function withdrawToken(address _token, uint256 _amount) public {
    require(_token != ETHER);
    require(tokens[_token][msg.sender] >= _amount);
    require(Token(_token).transfer(msg.sender, _amount));
    tokens[_token][msg.sender] = tokens[_token][msg.sender].sub(_amount);
    emit Withdraw(_token, msg.sender, _amount, tokens[_token][msg.sender]);
  }

  // Function to get the balance of a particular token and user
  function balanceOf(address _token, address _user) public view returns(uint256) {
    return tokens[_token][_user];
  }

  // Function to make an order
  function makeOrder(address _tokenGet, uint256 _amountGet, address _tokenGive, uint256 _amountGive) public {
    orderCount = orderCount.add(1);
    orders[orderCount] = _Order(orderCount, msg.sender, _tokenGet, _amountGet, _tokenGive, _amountGive, block.timestamp);
    emit Order(orderCount, msg.sender, _tokenGet, _amountGet, _tokenGive, _amountGive, block.timestamp);
  }

  // Function to cancel an order
  function cancelOrder(uint256 _id) public {
    _Order storage _order = orders[_id];
    require(_order.user == msg.sender);
    require(_order.id == _id); // the order must exist
    orderCancelled[_id] = true;
    emit Cancel(_order.id, msg.sender, _order.tokenGet, _order.amountGet, _order.tokenGive, _order.amountGive, block.timestamp);
  }

  // Function to fill an order
  function fillOrder(uint256 _id) public {
    require(_id > 0 && _id <= orderCount);
    require(!orderFilled[_id]);
    require(!orderCancelled[_id]);
    _Order storage _order = orders[_id];
    _trade(_order.id, _order.user, _order.tokenGet, _order.amountGet, _order.tokenGive, _order.amountGive);
    orderFilled[_order.id] = true;
  }

  // Internal function to execute the trade when filling an order
  function _trade(uint256 _orderId, address _user, address _tokenGet, uint256 _amountGet, address _tokenGive, uint256 _amountGive) internal {        
    uint256 _feeAmount = _amountGet.mul(feePercent).div(100);
    tokens[_tokenGet][msg.sender] = tokens[_tokenGet][msg.sender].sub(_amountGet.add(_feeAmount));
    tokens[_tokenGet][_user] = tokens[_tokenGet][_user].add(_amountGet);
    tokens[_tokenGet][feeAccount] = tokens[_tokenGet][feeAccount].add(_feeAmount);
    tokens[_tokenGive][_user] = tokens[_tokenGive][_user].sub(_amountGive);
    tokens[_tokenGive][msg.sender] = tokens[_tokenGive][msg.sender].add(_amountGive);
    emit Trade(_orderId, _user, _tokenGet, _amountGet, _tokenGive, _amountGive, msg.sender, block.timestamp); 
  }
}