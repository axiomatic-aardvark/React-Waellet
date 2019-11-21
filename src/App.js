import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.scss';
import contractSource from './contractSource';

function App() {
	//connect wallet
	const [isWalletConnected, setIsWalletConnected] = useState(false);
	const [connectWalletMessage, setConnectWalletMessage] = useState('');
	//get one status
	const [isGetStatusInit, setIsGetStatusInit] = useState(false);
	const [getStatusMessage, setGetStatusMessage] = useState('');
	//get many status
	const [isGetManyStatusInit, setIsGetManyStatusInit] = useState(false);
	const [getManyStatusMessage, setGetManyStatusMessage] = useState('');

	const deployedContractAddr = 'ct_2k4bcDag18yqxoyRoFbnhUcFLeEAfvVFuyae6vqNT87srg63rT';

	const connectWallet = () => {
		window.Aepp.request.connect().then(result => {
			console.log('CONNECT WALLET');
			console.log(result);
			const err = result.error;
			setConnectWalletMessage(err ? err.message : result.message);
			setIsWalletConnected(true);
		});
	};

	let newContractArgs = {
		outputAmount: '5939679548',
		expiration: '1773653015196',
		hashLock: 'c506a97bdc819655ec213f698f2b6f86d53ede567f661ab4a077b1c95a17812b',
		receiver: 'ak_2mwRmUeYmfuW93ti9HMSUJzCk1EYcQEfikVSzgo6k2VghsWhgU',
		outputNetwork: 'TRX',
		outputAddress: '0x9cc7a534cf742cdb9ee16fbf6b5f48a09e485c52',
	};

	const newContract = async () => {
		await window.Aepp.request
			.contractCall({
				source: contractSource,
				address: deployedContractAddr,
				method: 'new_contract',
				params: Object.values(newContractArgs),
				amount: 1000000000000000,
			})
			.then(result => {
				console.log('NEW CONTRACT');
				const res = result.decodedResult;
				const status = Object.keys(res)[0];
				console.log(status);
			});
	};

	let getOneStatusArgs = {
		id: '894b990456d1565816ee3e8d1f457d99bc6f5933801c56d989664e11b0ff7d48',
	};

	const getOneStatus = async () => {
		await window.Aepp.request
			.contractCallStatic({
				source: contractSource,
				address: deployedContractAddr,
				method: 'get_one_status',
				params: Object.values(getOneStatusArgs),
			})
			.then(result => {
				console.log('GET ONE STATUS');
				console.log(result.decodedResult);
				const res = result.decodedResult;
				const status = Object.keys(res)[0];
				const err = result.error;
				setGetStatusMessage(err ? err.message : status);
				setIsGetStatusInit(true);
			});
	};

	let getManyStatusArgs = {
		ids: ['894b990456d1565816ee3e8d1f457d99bc6f5933801c56d989664e11b0ff7d48'],
	};

	// const formatGetManyStatus = (arr) => {
	// 	const res = arr.map(obj => Object.keys(obj)[0])
	// 	return res.join(", ")
	// }

	const getManyStatus = async () => {
		await window.Aepp.request
			.contractCallStatic({
				source: contractSource,
				address: deployedContractAddr,
				method: 'get_many_status',
				params: Object.values(getManyStatusArgs),
			})
			.then(result => {
				console.log('GET MANY STATUS');
				const err = result.error;
				const res = result.decodedResult;
				// TODO:this line is too complicated
				const statuses = Object.keys(Object.values(res)[0]);
				console.log(statuses);
				setGetManyStatusMessage(err ? err.message : statuses);
				setIsGetManyStatusInit(true);
			});
	};

	return (
		<div className="App">
			<div className="options">
				<div className="connect-wallet">
					<Button variant="primary" onClick={() => connectWallet()}>
						Connect Wællet
					</Button>
					<span className={isWalletConnected ? '' : 'hidden'}>{'Status: ' + connectWalletMessage}</span>
				</div>
				<div className="new-contract">
					<Button variant="primary" onClick={() => newContract()}>
						New Contract
					</Button>
					<span className="hidden">{'Status: '}</span>
				</div>
				<div className="get-status">
					<Button variant="primary" onClick={() => getOneStatus()}>
						Get Status
					</Button>
					<span className={isGetStatusInit ? '' : 'hidden'}>{'Status: ' + getStatusMessage}</span>
				</div>
				<div className="get-many-status">
					<Button variant="primary" onClick={() => getManyStatus()}>
						Get All Statuses
					</Button>
					<span className={isGetManyStatusInit ? '' : 'hidden'}>{'Statuses: ' + getManyStatusMessage}</span>
				</div>
			</div>
		</div>
	);
}

export default App;
