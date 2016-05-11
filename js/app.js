import React from 'react';
import ReactDOM from 'react-dom';
import Bucket from './bucket/bucket.js'

const styles = {
  contain:{
    width:'100%',
    height:'100%',
    display:'flex',
    justifyContent:'space-around',
    alignItems:'stretch',
    //flexDirection:'column',
    //background:'red'
  },
  jiange:{
    display:'flex',
    flexGrow:'1',
    borderColor:'green',
    bordrWidth:'2px',
    borderStyle:'solid'
  }

};


let App = React.createClass({
  render() {
    return (
      <div style={styles.contain}>
        <div style={styles.jiange}></div>
        <div style={styles.jiange}><Bucket></Bucket></div>
        <div style={styles.jiange}></div>
        <div style={styles.jiange}><Bucket></Bucket></div>
        <div style={styles.jiange}></div>
        <div style={styles.jiange}><Bucket></Bucket></div>
        <div style={styles.jiange}></div>
      </div>
    );
  }
});

ReactDOM.render(<App/>,document.getElementById("app"));
