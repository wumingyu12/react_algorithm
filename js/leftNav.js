import React from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import ActionGrade from 'material-ui/lib/svg-icons/action/grade';
import ActionInfo from 'material-ui/lib/svg-icons/action/info';
import ContentInbox from 'material-ui/lib/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/lib/svg-icons/content/drafts';
import ContentSend from 'material-ui/lib/svg-icons/content/send';
import Paper from 'material-ui/lib/paper';

import {SelectableContainerEnhance} from 'material-ui/lib/hoc/selectable-enhance';
let SelectableList = SelectableContainerEnhance(List);


function wrapState(ComposedComponent) {
  const StateWrapper = React.createClass({
    getInitialState() {
      return {selectedIndex: 1};
    },
    handleUpdateSelectedIndex(e, index) {
      this.setState({
        selectedIndex: index,
      });
    },
    render() {
      return (
        <ComposedComponent
          {...this.props}
          {...this.state}
          valueLink={{value: this.state.selectedIndex, requestChange: this.handleUpdateSelectedIndex}}
        />
      );
    },
  });
  return StateWrapper;
}

SelectableList = wrapState(SelectableList);

//定位css,用于初始化这个控件
const conSytles={
	box:{
		float:'left', //决定了这个控件放在左边还是右边
		margin:'5px'
	}
}

var sytles={
	main:{
		width:'60px'
	},
	mainDe:{
		width:'200px'
	},
	listSt:{
		height:'48px'
	}

}

class LeftNav extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	showDetial: "0",
	    	showDetialText: "0"
	    };
	 }
	mouseEnter(){
		var self=this;
		self.setState({
            showDetial:"1"
        });
        //字体延时出现
		setTimeout(function(){
			self.setState({
		        showDetialText:"1"
		    });
		},100)
	}
	mouseLeave(){
		var self=this;
		self.setState({
            showDetial:"0"
        });
		self.setState({
	        showDetialText:"0"
	    });
	}
	render(){
		return(
			<Paper style={
						Object.assign(
							{},
							(this.state.showDetial=="0" ? sytles.main : sytles.mainDe),
							conSytles.box
						)
					} 
				   zDepth={1} 
				   onMouseEnter={this.mouseEnter.bind(this)}
				   onMouseLeave={this.mouseLeave.bind(this)}
				   >
				<SelectableList  value={2}>
			      <ListItem  primaryText={this.state.showDetialText=="0" ? "":"设备查看"} leftIcon={<ContentInbox />}  style={sytles.listSt}/>
			      <ListItem primaryText={this.state.showDetialText=="0" ? "":"设备查看"} value={1} leftIcon={<ActionGrade />} style={sytles.listSt}/>
			      <ListItem primaryText={this.state.showDetialText=="0" ? "":"设备查看"} value={2} leftIcon={<ContentSend />} style={sytles.listSt}/>
			      <ListItem primaryText={this.state.showDetialText=="0" ? "":"设备查看"} value={3} leftIcon={<ContentDrafts />} style={sytles.listSt}/>
			      <ListItem primaryText={this.state.showDetialText=="0" ? "":"设备查看"} value={4} leftIcon={<ContentInbox />} style={sytles.listSt}/>
			    </SelectableList>
			</Paper>
		)
	}
}

export default LeftNav;
