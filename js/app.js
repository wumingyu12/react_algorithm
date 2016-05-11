import React from 'react';
import ReactDOM from 'react-dom';
import Bucket from './bucket/bucket.js'



let App = React.createClass({
  render() {
    return (
      <div style={styles.contain}>
        <div style={styles.jiange}></div>
        <div style={styles.bucket}>
          <Bucket capacity={3} watercapacity={2}></Bucket>
        </div>
        <div style={styles.jiange}></div>
        <div style={styles.bucket}>
          <Bucket capacity={5} watercapacity={2}></Bucket>
        </div>
        <div style={styles.jiange}></div>
        <div style={styles.bucket}>
          <Bucket capacity={8} watercapacity={2}></Bucket>
        </div>
        <div style={styles.jiange}></div>
      </div>
    );
  }
});

const styles = {
  contain:{
    width:'100%',
    height:'100%',
    display:'flex',
    alignItems:'stretch',
    //flexDirection:'column',
    //background:'red'
  },
  jiange:{
    display:'flex',
    flex:1,
    borderColor:'green',
    bordrWidth:'2px',
    borderStyle:'solid',
    alignItems:'center',
    justifyContent: 'center',
  },
  bucket:{
    display:'flex',
    flex:2,
    borderColor:'green',
    bordrWidth:'2px',
    borderStyle:'solid',
    alignItems:'center',
    justifyContent: 'center',
    position:'relative'
  }

};
ReactDOM.render(<App/>,document.getElementById("app"));
