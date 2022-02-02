const ScatterJS = require('scatterjs-core').default
const ScatterEOS = require('scatterjs-plugin-eosjs').default
const Eos = require('eosjs')

ScatterJS.plugins(new ScatterEOS())
const connectionOptions = {
  initTimeout: 10000
}

const network = {
  blockchain: 'eos',
  protocol: 'https',
  host: 'api-kylin.eosasia.one',
  port: 443,
  chainId: '5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191'
}

ScatterJS.scatter.connect('My-App', connectionOptions).then(connected => {
  if (!connected) {
    // User does not have Scatter installed/unlocked.
    return false;
  }

  const scatter = ScatterJS.scatter;
  const requiredFields = {
    accounts: [network]
  };

  scatter.getIdentity(requiredFields).then(async() => {

    const account = scatter.identity.accounts.find(x => x.blockchain === 'eos');
    const eosOptions = {
      expireInSeconds: 60
    }
    // Get a proxy reference to eosjs which you can use to sign transactions with a user's Scatter.
    const eos = scatter.eos(network, Eos, eosOptions);

    const transactionOptions = {
      authorization: [`${account.name}@${account.authority}`]
    };

    // example of sending EOS
    eos.transfer(account.name, 'helloworld54', `1.0000 EOS`, 'memo', transactionOptions).then(trx => {
      console.log(`Transaction ID: ${trx.transaction_id}`);
    }).catch(error => {
      console.error(error);
    });

    // example of pushing an action
    eos.transaction({
      actions: [{
        account: 'helloworld54',
        name: 'placeorder',
        authorization: [{
          actor: 'myaccount123',
          permission: 'active',
        }],
        data: {
          acct: account.name,
          price: 10,
          amount: 100,
        },
      }]
    }, {
      broadcast: true,
      sign: true
    })
    .then(trx => {
      console.log(`Transaction ID: ${trx.transaction_id}`);
    }).catch(error => {
      console.error(error);
    });
  })
  .catch(err => {
    console.error(err)
  })
})


//js dari main.js

//let account;
var idlogin = document.getElementById('login');
var idgotin = document.getElementById('gotin');
var iduser = document.getElementById('user');
var masuk = document.getElementById('masuk');

function konekwallet() {
	try{
		ScatterJS.connect(appname,{network}).then(connected => {
			if(!connected) {
				alert ('Silahkan buka Vexwallet Desktop Anda terlebih dahulu.');
				return;
			}
			ScatterJS.login().then(id => {
			if(!id) return;
			idlogin.style = 'display:none;';
			idgotin.style = 'display:block;';
			masuk.style = 'display:block;';
			iduser.innerHTML = id.accounts[0].name;
			});
		});
	} catch (e) {
		console.log(e);
	}
}

function logout() {
		ScatterJS.logout();
		idgotin.style = 'display:none;';
		idlogin.style = 'display:block;';
}
$("#user").val('');
$("#nama").val('');
$("#jurusan").val('');