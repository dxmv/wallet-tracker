# Todo

## Frontend

- [ ] How to display the icon for crypto
- [ ] Caching requests
- [ ] Auth context?
- [ ] Change navigation when logged in
- [ ] Fix the problems with auth
- [ ] Home page
- [ ] News page
- [ ] Logout
- [ ] Better design
- [x] When a user clicks on a crypto, they get various info about it in a modal
- [x] Get 1000 cryptos from api
- [ ] Optimize the dashboard
- [ ] Add loading
- [ ] Add refreshing
- [ ] Handle errors
- [ ] Fix use auth, to check if the token is valid
- [ ] Use fetch for the coingecko api
- [ ] Favicon
- [ ] Notifications

- Modal

  - [x] Link & Select wrapper
  - [x] Can't add crypto if not selected wallet or crypto or amount
  - [x] Search in modal
  - [x] List with infinite scroll
  - [x] Get only wallets for user
  - [x] The wrong crypto is being added
  - [x] Do the same thing for wallet
  - [ ] Back button for the second stage of crypto modal
  - [ ] Error message

- Wallet page

  - [x] Display crypto
  - [x] Add crypto from here
  - [x] Delete crypto
  - [x] Delete wallet
  - [ ] Edit the nickname of the wallet
  - [x] Refresh the wallet after crypto action
  - [x] Edit crypto and display info for crypto modal

- Crypto "page"

  - [x] Display basic info
  - [x] Display the list of wallets for the crypto

- Dashboard

  - [x] Pie chart
  - [ ] Random colors
  - [ ] Animation for switching showing
  - [x] Percentage on legend
  - [x] Display crypto
  - [x] Fix display of wallets
  - [ ] Refresh on add

- Profile page

  - [ ] Simple details
  - [ ] Change password
  - [ ] Stats like how much crypto in usd

- Optimize

  - [ ] Search in modal

- Admin page
  - [x] Promote/demote users
  - [x] rdu admin wallets
  - [ ] only accessible to admins
  - [ ] Refresh users
  - [ ] Notifications

## Backend

- [ ] JWT Malformed exception
- [ ] Can't add admin wallet if the name is the same
- [ ] Delete wallet icon when we delete wallet
- [ ] Edit the icon and name for wallet, delete old image

- Crypto

  - [x] Save apiId for crypto
  - [x] Save iconUrl for crypto
  - [x] Get user's wallets that contain the given crypto

- Wallet

  - [ ] Save the nickname
  - [ ] Types of crypto in the wallet

- [x] Check if crypto belongs to a user's wallet
- [x] Fix the response for deletes
- [ ] Add 'nicknames' for user wallets
- [ ] Add crypto types accepted for a wallet
- [ ] Tests
- [x] If crypto is already in a wallet, update it
- [ ] Myb save the id of coin gecko crypto?

- Tickets
  - [ ] A user can submit a ticket
  - [ ] Admins can delete tickets
