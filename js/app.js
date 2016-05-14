import React from 'react';
import ReactDOM from 'react-dom';
import Bucket from './bucket/bucket.js';
import RaisedButton from 'material-ui/lib/raised-button';//0.14的注入方式，注意切换官网的文档
import TextField from 'material-ui/lib/text-field';
//state 动画
import ReactStateAnimation from 'react-state-animation'
//方法求解算法
import * as Alg_bucket from './algorithm/bucket_algorithm.js'

//var waterstate=[[0,0,8],[2,2,3],[2,2,4],[1,3,2]];
//getload([8,5,3],4)代表我们的水桶的容积为8,5,3最后我们需要得到的水为4升水
var waterstate=Alg_bucket.getload([8,5,3],4)[0] || [[0,0,0]];
class App extends React.Component{
  constructor(props) {
    super(props);
    this.currentStateIndex=0;
    this.state = {
      bucket_one_cap:8,//水桶1的容积
      bucket_two_cap:5,
      bucket_three_cap:3,
      //水桶当前的水量
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
  // start(){
  //   this.changeWaterUseAnimation(3,3,3)
  // }
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
  //设置初始值和求解
  SetAndSolve(){
    var bucket_cap = this.refs.text_bucket_cap.getValue();
    var bucket_cap_slice=bucket_cap.split(",");//输入为3,5,6的格式我们以”，“分割
    this.setState({
      bucket_one_cap:Number(bucket_cap_slice[0]),
      bucket_two_cap:Number(bucket_cap_slice[1]),
      bucket_three_cap:Number(bucket_cap_slice[2])
    })
    console.log(bucket_cap_slice);
  }
  render() {
    return (
      <div style={styles.contain}>
        {/*顶部可以设置水桶初始值的地方*/}
        <div style={styles.titlePan}>
          <div>
            水桶容积:  <TextField ref="text_bucket_cap" hintText="如为8升,5升,3升，请输入 8,5,3" />
          </div>
          <div>
             最终值:  <TextField ref="text_last_value" hintText="如为4升,4升,0升，请输入 4,4,0" />
          </div>
          <div>
            <RaisedButton label="设置并求解" 
              secondary={true} 
              style={styles.panelbtn} 
              onMouseDown={this.SetAndSolve.bind(this)}
              />
          </div>
        </div>
        {/*水桶容器*/}
        <div style={styles.bucketcontain}>
          <div style={styles.jiange}></div>
          <div style={styles.bucket}>
            <Bucket capacity={this.state.bucket_one_cap} watercapacity={this.state.bucket_one}></Bucket>
          </div>
          <div style={styles.jiange}></div>
          <div style={styles.bucket}>
            <Bucket capacity={this.state.bucket_two_cap} watercapacity={this.state.bucket_two}></Bucket>
          </div>
          <div style={styles.jiange}></div>
          <div style={styles.bucket}>
            <Bucket capacity={this.state.bucket_three_cap} watercapacity={this.state.bucket_three}></Bucket>
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
                        //onMouseDown={this.start.bind(this)}
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
  titlePan:{
    flex:1,
    display:'flex',
    alignItems:'center',
    justifyContent:'space-around'
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
