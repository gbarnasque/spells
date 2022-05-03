# Description

This project was created to fulfill the requirements of the test.

## Node Version

The project was built using `node v.16.14.2`

## How to run

Copy `.env.local` to `.env` using `cp .env.local .env` or do it manually.

Then, simply run `npm install` and after the command completes, run `npm start`

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### Memo

To login to the page use the credentials provided in .env.local, or simply change the values to the desired ones.

If the api misbehaves, you can switch the spell API URL in `./src/spells/SpellsActions.js`\
```
const spellsURL = consts.MY_API_URL + 'spells';
// Change the line above to the following:
const spellsURL = consts.API_TEST_URL + 'spells';
```


