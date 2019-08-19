import React from 'react'
import logo from './logo.svg'
import './App.css'
import JobAds from './jobAds'

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img
					src="https://cdn.seeklearning.com.au/media/images/seek-learning-logo-230.svg"
					className="App-logo"
					alt="logo"
				/>
				<h1>Job Ads Check Out System</h1>
			</header>
			<main>
				<JobAds />
			</main>
		</div>
	)
}

export default App
