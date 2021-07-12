export const ETHER_ADDRESS = '0x0000000000000000000000000000000000000000';
export const GREEN = 'success';
export const RED = 'danger';

export const DECIMALS = (10**18);

// Shortcut to avoid passing around web3 conncetion
export const ether = wei => wei / DECIMALS;

// Tokens and ether have the same decimal resolution
export const tokens = ether;

export const formatBalance = (balance) => {
  const precision = 100; // Use 2 decimal places

  balance = ether(balance);
  balance = Math.round(balance * precision) / precision;
   
  return balance;
};
