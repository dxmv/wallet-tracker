# Todo

## Frontend

- [x] How to display the icon for crypto
- [ ] Caching requests
- [ ] Change navigation when logged in
- [x] Fix the problems with auth
- [ ] Home page
- [ ] News page
- [x] Logout
- [ ] Better design
- [x] When a user clicks on a crypto, they get various info about it in a modal
- [x] Get 1000 cryptos from api
- [ ] Add loading
- [ ] Add refreshing
- [ ] Handle errors
- [x] Fix use auth, to check if the token is valid
- [ ] Use fetch for the coingecko api
- [ ] Favicon
- [ ] Notifications
- [ ] Search in modal

- Modal

  - [x] Link & Select wrapper
  - [x] Can't add crypto if not selected wallet or crypto or amount
  - [x] Search in modal
  - [x] List with infinite scroll
  - [x] Get only wallets for user
  - [x] The wrong crypto is being added
  - [x] Do the same thing for wallet
  - [ ] Back button for the second stage of crypto modal
  - [ ] Notifications for errors

- Wallet page

  - [x] Display crypto
  - [x] Add crypto from here
  - [x] Delete crypto
  - [x] Delete wallet
  - [x] Edit the nickname of the wallet
  - [x] Refresh the wallet after crypto action
  - [x] Edit crypto and display info for crypto modal
  - [ ] Refresh wallet after actions
  - [ ] Optimization

- Crypto "page"

  - [x] Display basic info
  - [x] Display the list of wallets for the crypto

- Dashboard

  - [x] Pie chart
  - [x] Color based on the icon
  - [ ] Animation for switching showing
  - [x] Percentage on legend
  - [x] Display crypto
  - [x] Fix display of wallets
  - [ ] Refresh info
  - [ ] Optimization

- Profile page

  - [x] Simple details
  - [x] Stats like how much crypto in usd

- Admin page
  - [x] Promote/demote users
  - [x] rdu admin wallets
  - [ ] Only accessible to admins
  - [x] Edit wallet
  - [x] Refresh info
  - [ ] Optimization

## Backend

- [ ] Exceptions, fallback exceptions
- [x] Can't add admin wallet if the name is the same
- [x] Delete wallet icon when we delete wallet
- [x] Edit the icon and name for wallet, delete old image
- [x] Images show only after we restart

- Crypto

  - [x] Save apiId for crypto
  - [x] Save iconUrl for crypto
  - [x] Get user's wallets that contain the given crypto

- Wallet

  - [x] Generate the wallet name
  - [x] Save the nickname
  - [x] Change wallet name

- [x] Check if crypto belongs to a user's wallet
- [x] Fix the response for deletes
- [x] Add 'nicknames' for user wallets
- [x] If crypto is already in a wallet, update it
