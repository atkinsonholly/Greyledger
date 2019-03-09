
<a href="https://github.com/atkinsonholly/Greyledger/blob/master/greyledger_client/app/src/images/Greyledger_welcome.png"><img src="https://github.com/atkinsonholly/Greyledger/blob/master/greyledger_client/app/src/images/Greyledger_welcome.png" title="ModuleFiveProject" alt="Module Five Project"></a>

# Flatiron School - Module Five Project

**Greyledger**

> **Greyledger brings the benefit of an immutable ledger of greyhound ownership to the commercial greyhound racing industry.**

> Greyledger is a hybrid web app / DApp that effectively digitalizes the racing greyhound registration process, currently governed by The Greyhound Board of Great Britain. 

> Users can sign up and register racing greyhounds to the Ruby on Rails / postgres backend - and onto the blockchain. Users do not have to be owners in order to register greyhounds and make updates to greyhound records.

> Each new greyhound registration makes a call to the underlying smart contract, which generates a greyhound instance, including a unique pseudo-random number. Users can visit their profile to view / update their existing greyhounds, see which Metamask accounts are linked to each dog, and search their transaction history by account (via fetch requests to the Etherscan API).

**PROJECT OVERVIEW**

In brief:

- Drizzle DApp (Truffle / React)
- OO React / Javascript frontend, with asynchronous programming, JWT authentication and React Routes
- Hybrid Ruby on Rails (with RESTful MVC architecture) / postgreSQL / Ethereum backend 
- Pure CSS styling.

Functionality:

- Greyledger allows users to sign up, log in and see their greyhound records, including: greyhound name, sex, status, birthdate, sire, earmarks, vaccine history, unique smart contract reference numbers and linked Metamask addresses.
- Users use Metamask to sign transactions.
- New greyhound registrations and updates to existing greyhounds are saved to the database (Ruby on Rails is a project requirement) and also pushed to the blockchain.
- Users can search their most recent transactions by entering their Metamask account number (address).
- React routes, links.
- Verification.
- Serializers.
- JWT authentication, secure password.

Models:

- Users
- UserGreyhounds
- Greyhounds
- Owners
- GreyhoundOwners

To run:

1. In greyledger/greyledger_server, start the rails server 
```
rails s
```

2. Launch test blockchain by starting Ganache

3. In greyledger/greyledger_client, 'push' the smart contract to the test blockchain 
```
truffle migrate
```

3. In greyledger/greyledger_client/app, start node
```
npm start
```

4. Go to: localhost:3001

## Author

* **Holly Atkinson** - https://github.com/atkinsonholly

<a href="https://github.com/atkinsonholly/Greyledger/blob/master/greyledger_client/app/src/images/Greyledger_success.png"><img src="https://github.com/atkinsonholly/Greyledger/blob/master/greyledger_client/app/src/images/Greyledger_success.png" title="Successful_transaction" alt="Successful transaction"></a>

<a href="https://github.com/atkinsonholly/Greyledger/blob/master/greyledger_client/app/src/images/Greyledger_add_or_update.png"><img src="https://github.com/atkinsonholly/Greyledger/blob/master/greyledger_client/app/src/images/Greyledger_add_or_update.png" title="Add_or_update" alt="Add or update"></a>

<a href="https://github.com/atkinsonholly/Greyledger/blob/master/greyledger_client/app/src/images/Greyledger_search_etherscan.png"><img src="https://github.com/atkinsonholly/Greyledger/blob/master/greyledger_client/app/src/images/Greyledger_search_etherscan.png" title="Search_page" alt="Search page"></a>

<a href="https://github.com/atkinsonholly/Greyledger/blob/master/greyledger_client/app/src/images/Greyledger_form.png"><img src="https://github.com/atkinsonholly/Greyledger/blob/master/greyledger_client/app/src/images/Greyledger_form.png" title="Example_form" alt="Example form"></a>
