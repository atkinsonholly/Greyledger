import React from 'react'
import { Link } from 'react-router-dom';
import '../styling/search.css';

const Search = (props) => {
    return (
        <div className="search">
          <div className="search-container">
            <div className="search-logo">
              <div className="search-etherscan">
                <h2>Powered by: </h2>
                <img src={require("../images/etherscan-logo.png")} alt="logo"/>
              </div>
            </div>
            <form onSubmit={(event) => props.fetchTxList(props.search, event)}>
              <div className="search-bar-header">
                <h2>Enter MetaMask account number to find most recent transactions</h2>
                <input
                  className="search-bar"
                  type="text"
                  placeholder="Enter MetaMask account number"
                  onChange={event => props.handleChange(event.target.value)}
                  value={props.search}
                  size="45"
                 />
              </div>
              <div>
                <input type="submit" value="Search" className="search-button"/>
              </div>
            </form>
            <Link to="/" className="link search-link">Close</Link>
            <div className="search-results">
            {props.transactions === "error" ? <h3><span>Please enter a valid account number</span></h3> : null}
            {props.transactions.length > 0 && props.transactions !== "error" ?
              <div>
                <h3>Most recent transactions</h3>
                {props.transactions.map(item =>
                  <div key={item.id}>
                    {item.isError === '1'? <p>Transaction error: <span>{item.errCode}</span></p> : null}
                    <p>Blocknumber: {item.blockNumber}</p>
                    <p>Timestamp: {item.timeStamp}</p>
                    <p>From: {item.from}</p>
                    <p>To: {item.to}</p>
                    <p>Type: {item.type}</p>
                    <p>Value: {item.value}</p>
                    <p>Gas: {item.gas}</p>
                    <p>Gas used: {item.gasUsed}</p>
                    ---------------------------------
                  </div>
                )}
              </div>
            : null}
            </div>
          </div>
        </div>
    )
}

export default Search
