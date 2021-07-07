export const ETHER_ADDRESS = '0x0000000000000000000000000000000000000000';

export const EVM_REVERT = 'VM Exception while processing transaction: revert';

//to facilitate the 18 decimals by leveraging a web3 utility 
export const tokens = (n) => {
    return new web3.utils.BN(
        web3.utils.toWei(n.toString(),'ether')
    );    
};

//same as tokens
export const ether = (n) => tokens(n);