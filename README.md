
Dependencies for fully decentralized modern DApp (using React.js and IPFS)

* clone the DApp from this repository: run `git clone https://github.com/ByronKruger/blockchain_adoption.git`.
* cd into the repository directory: run `cd blockchain_adoption`.
* install all dependencies: run `npm install` (installs all dependencies specified in package.json)
* run the React app: run `npm start` (starts and host assets locally)
* install Ganache (private blockchain run locally on which we deploy our contract) (not necessary if we are using the better tool - Fortmatic which requires more manual contract deployment)
* 

--------------------------------------------------------------------------------------

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
