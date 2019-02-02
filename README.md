Making the DApp FULLY decentralized with Inter-Planetary-File-System (IPFS)

* run `npm install` (to make sure everything is installed)
* run `ganache-cli` in terminal (starts up private blockchain)
* run `truffle migrate --reset` in terminal (make sure latest contract is deployed on private blockchain)
* run `npm run dev` (to start server and host React App)

We want to access our assets via a different method than traditional servers and rather on decentralized file systems.

Install IPFS:

1. Go to this page: https://docs.ipfs.io/introduction/install/
2. Download respective binary at this page: https://dist.ipfs.io/#go-ipfs
3. According to 1's page: 
	* run `tar xvfz go-ipfs.tar.gz` at the directory of the downloaded
	* run `cd go-ipfs` (to get to install.sh script)
	* run `./install.sh` (runs the script that does installations)

We need an IPFS node running: 

* run `ipfs init` (initiates a new node)
* run `ipfs daemon` (runs the ipfs node process)

We make a folder for our assets:

