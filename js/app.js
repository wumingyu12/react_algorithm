import React from 'react';
import ReactDOM from 'react-dom';
import Bucket from './bucket/bucket.js';
import RaisedButton from 'material-ui/lib/raised-button';//0.14的注入方式，注意切换官网的文档
//state 动画
import ReactStateAnimation from 'react-state-animation'

const waterstate=[[1,2,3],[2,2,4],[1,3,2]];
class App extends React.Component{
  constructor(props) {
    super(props);
  
    this.state = {
      currentStateIndex:0,
      currentState:waterstate[0],
      x:0
    };

    this._animate = new ReactStateAnimation(this)
  }
  start() {
    // start animation
    this._animate.linearInOut('x', 2/*end value*/, 1000/*duration(ms)*/)
  }
  //回复上一个倒水动作
  lastStep(){
    console.log(this.state);
    var currentStateIndex=this.state.currentStateIndex;
    this.setState({
      currentStateIndex:currentStateIndex-1,
      currentState:waterstate[currentStateIndex-1]
    })
    console.log(this.state);
  }
  //下一个倒水动作
  nextStep(){
    console.log(this.state);
    var currentStateIndex=this.state.currentStateIndex;
    this.setState({
      currentStateIndex:currentStateIndex+1,
      currentState:waterstate[currentStateIndex+1]
    })
    console.log(this.state);
  }
  render() {
    return (
      <div style={styles.contain}>
        {/*水桶容器*/}
        <div style={styles.bucketcontain}>
          <div style={styles.jiange}></div>
          <div style={styles.bucket}>
            <Bucket capacity={3} watercapacity={this.state.x}></Bucket>
          </div>
          <div style={styles.jiange}></div>
          <div style={styles.bucket}>
            <Bucket capacity={5} watercapacity={this.state.currentState[1]}></Bucket>
          </div>
          <div style={styles.jiange}></div>
          <div style={styles.bucket}>
            <Bucket capacity={8} watercapacity={this.state.currentState[2]}></Bucket>
          </div>
          <div style={styles.jiange}></div>
        </div>
        {/*操作面板*/}
        <div style={styles.panel}>
          <RaisedButton label="上一步" 
                        secondary={true} 
                        style={styles.panelbtn} 
                        onMouseDown={this.lastStep.bind(this)}
                        />
          <RaisedButton label="自动运行" 
                        secondary={true}
                        onMouseDown={this.start.bind(this)}
                        style={styles.panelbtn} />
          <RaisedButton label="下一步" 
                        secondary={true}
                        onMouseDown={this.nextStep.bind(this)}
                        style={styles.panelbtn} 
                        />
        </div>
      </div>
    );
  }
}

const styles = {
  contain:{
    width:'100%',
    height:'100%',
    display:'flex',
    flexDirection:'column',
    alignItems:'stretch',
  },
  panel:{
    flex:1,
    display:'flex',
    alignItems:'center',
    justifyContent:'space-around'
  },
  panelbtn:{
    height:'40px',
  },
  bucketcontain:{
    flex:4,
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
