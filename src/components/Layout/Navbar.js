import { useSelector } from 'react-redux';

const Navbar = () => {
  const account = useSelector(state => state.web3.account);
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="/#">mTC DExchange</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          <a 
            className="nav-link small" 
            href={`https://etherscan.io/address/${account}`}
            target="blank"
            rel="noopener noreferrer"
          >
            {account}
          </a>
        </li>
      </ul>
    </nav> 
  );
};

export default Navbar;