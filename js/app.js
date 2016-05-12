import React from 'react';
import ReactDOM from 'react-dom';
import Bucket from './bucket/bucket.js';
import RaisedButton from 'material-ui/lib/raised-button';//0.14的注入方式，注意切换官网的文档
//state 动画
import ReactStateAnimation from 'react-state-animation'

const waterstate=[[0,0,8],[2,2,3],[2,2,4],[1,3,2]];
class App extends React.Component{
  constructor(props) {
    super(props);
    this.currentStateIndex=0;
    this.state = {
      bucket_one:waterstate[this.currentStateIndex][0],//第一个水桶水量
      bucket_two:waterstate[this.currentStateIndex][1],//第二个水桶水量
      bucket_three:waterstate[this.currentStateIndex][2]//第三个水桶水量
    };

    this._animate = new ReactStateAnimation(this)
  }
  //====================水位变化动画=============================
  changeWaterUseAnimation(cap_one,cap_two,cap_three) {
    this._animate.linearInOut('bucket_one', cap_one, 1000);
    this._animate.linearInOut('bucket_two', cap_two, 1000);
    this._animate.linearInOut('bucket_three', cap_three, 1000);
  }
  //=======
  start(){
    this.changeWaterUseAnimation(3,3,3)
  }
  //=================回复上一个倒水动作==========================
  lastStep(){
    //console.log(this.state);
    if(this.currentStateIndex==0){
      alert("已经是最前面的一个动作");
      return
    }
    this.currentStateIndex=this.currentStateIndex-1;
    let newWaterState=waterstate[this.currentStateIndex];
    this.changeWaterUseAnimation(newWaterState[0],newWaterState[1],newWaterState[2])
    //console.log(this.state);
  }
  //下一个倒水动作
  nextStep(){
    //console.log(this.state);
    if(this.currentStateIndex==waterstate.length-1){
      alert("已经是最后的一个动作");
      return
    }
    this.currentStateIndex=this.currentStateIndex+1;
    let newWaterState=waterstate[this.currentStateIndex];
    this.changeWaterUseAnimation(newWaterState[0],newWaterState[1],newWaterState[2])
    //console.log(this.state);
  }
  render() {
    return (
      <div style={styles.contain}>
        {/*水桶容器*/}
        <div style={styles.bucketcontain}>
          <div style={styles.jiange}></div>
          <div style={styles.bucket}>
            <Bucket capacity={3} watercapacity={this.state.bucket_one}></Bucket>
          </div>
          <div style={styles.jiange}></div>
          <div style={styles.bucket}>
            <Bucket capacity={5} watercapacity={this.state.bucket_two}></Bucket>
          </div>
          <div style={styles.jiange}></div>
          <div style={styles.bucket}>
            <Bucket capacity={8} watercapacity={this.state.bucket_three}></Bucket>
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
    //borderColor:'green',
    //bordrWidth:'2px',
    //borderStyle:'solid',
    alignItems:'center',
    justifyContent: 'center',
  },
  bucket:{
    display:'flex',
    flex:2,
    //borderColor:'green',
    //bordrWidth:'2px',
    //borderStyle:'solid',
    alignItems:'center',
    justifyContent: 'center',
    position:'relative'
  }

};
ReactDOM.render(<App/>,document.getElementById("app"));
