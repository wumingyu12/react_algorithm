import React from 'react';

const HEIGHT_TO_TEN=60;//10升水对应的vh高度



export default class bucket extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={styles.contain}>
        <div style={styles.title}>{this.props.watercapacity+'升'+'/'+this.props.capacity+'升'}</div>
        {/*height 代表水桶的高度，waterPercent代表桶里面有百分多少的水*/}
        <div style={Object.assign({},styles.bucket,{height:this.props.capacity/10*HEIGHT_TO_TEN+'vh'})}>
          <div style={
            Object.assign(
              {},
              styles.nowater,
              {flex:this.props.capacity-this.props.watercapacity}
              )}>
            
          </div>
          <div style={
            Object.assign(
              {},
              styles.water,
              {flex:this.props.watercapacity}
              )}>
          </div>
        </div>
      </div>
    );
  }
}
var styles={
  contain:{
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'stretch',
    flex:'0 0 80%'
  },
  title:{
    display:'flex',
    justifyContent: 'center',
    alignItems:'center'
  },
  bucket:{
    display:'flex',
    flexDirection:'column',
    background:'lightgrey',
    justifyContent:'center',
    alignItems:'stretch'
  },
  nowater:{
    display:'flex',
    flex:1,
    justifyContent:'center'
  },
  water:{
    display:'flex',
    flex:1,
    background:'lightblue'
  }
}

