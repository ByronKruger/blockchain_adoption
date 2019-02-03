Dependencies for basic DApp (no React.js framework):
1. **Node page manager** 
	* (mk)
	* download @ https://nodejs.org/dist/v10.15.1/node-v10.15.1-linux-x64.tar.xz
2. **Truffle framework**
	* Truffle framework allows us to create the DApp on the Ethereum blockchain by providing tools to write contracts, test contracts and deploy contracts
	* run `npm install -g truffle`
3. **Ganache**
	* Ganache is a private blockchain that runs locally for testing
	* download @ https://github.com/trufflesuite/ganache/releases/download/v1.3.0/ganache-1.3.0-x86_64.AppImage
4. **MetaMask**
	* MetaMask extension is used to connect to the Ethereum blockchain and to interact with smart contracts
	* Download from the Google Chrome store
	* Note: MetaMask requires you to need to download the extension in order to use the DApp. This is not good for adoption. Fortmatic makes adopting DApp usage much simpler, wallets are created and transactions are signed using the user's phone numbers 
	
---------------------------------------------------------------------------------------------------------------------

We want to access our assets via a different method than traditional servers and rather on decentralized file systems.

**Making the DApp FULLY decentralized with Inter-Planetary-File-System (IPFS)**

* run `npm install` (to make sure everything is installed)
* run `ganache-cli` in terminal (starts up private blockchain)
* run `truffle migrate --reset` in terminal (make sure latest contract is deployed on private blockchain)
* run `npm run dev` (to start server and host React App)

**Install IPFS:**

1. Go to this page: https://docs.ipfs.io/introduction/install/
2. Download respective binary at this page: https://dist.ipfs.io/#go-ipfs
3. According to 1's page: 
	* run `tar xvfz go-ipfs.tar.gz` at the directory of the downloaded
	* run `cd go-ipfs` (to get to install.sh script)
	* run `./install.sh` (runs the script that does installations)

**We need an IPFS node running:**

* run `ipfs init` (initiates a new node)
* run `ipfs daemon` (runs the ipfs node process)

**We create a directory for all our files we want to serve on IPFS:**
* /src contains all our client-side app code
* create a folder calles 'dist': `mkdir dist`

**Using the file/folder copying tool 'rsync':**
* run `rsync -r src/ dist/`
* run `rsync -r build/contracts /dist`

**Gather IPFS peers:**
* run `ipfs swarm peers`

**Add assets to IPFS:**
* run `ipfs add -r dist/`
* copy the very last printed line's hash
* publish this directory (using hash): run `ipfs name publish [hash]`

**Accessing fully decentralized App:**
* take hash produced after running previous command and add it to address in browser: 'https://gateway.ipfs.io/ipfs/[hash]'
