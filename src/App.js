import React from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	window.Aepp.request.connect().then(result => {
		// get the result
		// and make action
		console.log(result);
	});

	return (
		<div className="App">
			<div className="options">
				<div className="connect-wallet">
					<Button variant="primary">Connect Wællet</Button>
				</div>
			</div>
		</div>
	);
}

export default App;
