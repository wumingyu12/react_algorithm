import React from 'react';
import Bucket from './bucket/bucket.js'

var styles={
	contain:{
		width:'100px',
		height:'100px',
		background:'red'
	}
}

class MainPan extends React.Component {
	render(){
		return(
			<div style={styles.contain}>
				<div></div>
				<div></div>
				<div></div>
				<Bucket></Bucket>
				<Bucket></Bucket>
				<Bucket></Bucket>
			</div>
		)

	}
}


export default MainPan;