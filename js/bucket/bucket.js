import React from 'react';



export default class bucket extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={styles.bucket}></div>
    );
  }
}

var styles={
	bucket:{
		height:'50%',
		width:'10%',
		background:'red'
	}
}
