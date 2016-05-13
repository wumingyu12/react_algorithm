//在算法乐趣中有这个算法的具体解释
//水桶分水问题
//这个算法解决的是比如有3个不同规格的水桶，如何用这3个水桶倒出指定的水的问题

const BUCKET_COUNT = 3;//水桶数量3个
//采用深度优先搜索状态树，会遇到重复的状态回路，比如上一个时刻从1号桶倒3升到3号桶，下一个时刻又从3号桶倒3升到1号桶
//创建一个数组来记录所有的状态，新生成的节点用先判断这个节点是否在以前出现过，如果是就停止继续的搜索
var STATE_ARR=[];
//每一次成功的深度优先的解搜索都会形成一个解状态的搜索路径数组，我们就输出这个路径
var SEARCH_LOAD=[];
//所有的成功可行的路径就是我们要求的所有解集合，作为最终输出
var ALL_SEARCH_LOAD=[];

/*用来判断数组里面是否具有某个数组
	var tem = new Array();
	tem=[[1,2,3],[3,2,1]];
	tem.contains([3,2,1])
	true
 */

Array.prototype.ArrContains = function (element) {
    for (var i = 0; i < this.length; i++) {
        if (this[i].toString() == element.toString()) {
            return true;
        }
    }
    return false;
}

//树节点
var treenode={
	value:[0,0,0],
	children:[]
}
//初始的树节点
var RootNode ={
	value:[8,0,0],
	children:[]
}
/*======================================================================================
	遍历3个水桶的所有倒水动作，就是对3个水桶进行两两全排列，就是6种倒水可能动作
	就是说每一个节点都可以生成新的6种状态，但并不是每一种倒水动作都是可行的，所以
	需要判断一下
	watercapacity[8.5.3]代表水桶的容积,waterArr[0.3,4]代表当前的水桶状态，numfrom numto代表从
 ==============================================================================*/
function _canTakeDumpAction(watercapacity,waterArr,numfrom,numto){
	//输入的水桶编号的范围不要超出了
	if( numfrom >= BUCKET_COUNT || numfrom < 0 || numto >= BUCKET_COUNT || numto < 0){
		console.log("输入的水桶编号有问题");
		return
	};
	//如果是同一个水桶，返回错误
	if(numfrom == numto) {
		return false;
		
	};
	//如果from水桶里面没有水的，就返回错误
	if(waterArr[numfrom]==0){
		return false;
	}
	//如果要倒入的水桶是满水的也返回错误
	if(waterArr[numto]==watercapacity[numto]){
		return false;
	}
	return true;//否则这个倒水动作成立
	
}
//=======================判断水桶里面是否

/*========================================
	树的子分支生成
	比如[8,0,0]节点可以生成[5,0,3],[3,5,0]=
 ============================================*/
function createChild(fatherObj){
	var treenode={
		value:[0,0,0],
		children:[]
	}
	//两重循环代表所有的倒水动作
	for (var numfrom = 0; numfrom < BUCKET_COUNT; numfrom++) {//代表从numfrom倒水到numto
		for (var numto = 0; numto < BUCKET_COUNT; numto++){
			//如果这个倒水动作,从numfrom倒水到numto 是可行的
			if( _canTakeDumpAction([8,5,3],fatherObj.value,numfrom,numto) ){
				//var tem = Object.assign({},fatherObj.value);//复制对象直接赋值就是地址传值
				var tem = fatherObj.value.slice();//数组的值传递，没有slice就会变成引用传递
				//如果倒出桶的水大于倒入桶的空位
				if( fatherObj.value[numfrom] >= ([8,5,3][numto]-fatherObj.value[numto]) ){
					tem[numto]=[8,5,3][numto];//倒水入的桶满了
					tem[numfrom]=(fatherObj.value[numfrom]-([8,5,3][numto]-fatherObj.value[numto]))//倒出水桶倒出后剩下的水
				}else{//如果倒出桶的水小倒入桶的空位
					tem[numfrom]=0;//倒出桶的水空了
					tem[numto]=fatherObj.value[numto]+fatherObj.value[numfrom]//倒入水桶后的水
				};
				var addnode={
					value:tem,
					children:[]
				};
				fatherObj.children.push(addnode);
			}
			
		}
	};
}

/*====================最核心的函数节点搜索,注意这个解法不能得到所有解,=============================================
	节点处理函数，递归方式 深度优先搜索
	1.每处理一个节点的时候在路径队列中就push这个状态代表我走到了这一步
	2.处理每一个节点时，先判断要处理的节点是否在已处理节点状态的列表中，如果在代表这个节点的状态
	  以前已经处理过了，没必要再处理，路径队列中pop，代表我返回上一步，直接return，
	3 如果这个要处理的节点也是我们需要的最终状态[4,4,0],那么将我的路径队列中的记录
	   push到解路径队列中，完成这个后，我还是需要return，路径队列中pop，代表我返回上一步
	  继续搜索兄弟节点是否可行。
	4.如果这个要处理的节点既不是我需要的[4,4,0]状态，有不在以前的已处理的状态列表中，说明是一个新的可以
	  继续搜索的节点，我们将其加入到已处理的状态列表中并
	  将生成他的所有可行的子节点，如果存在子节点我们对每一个子节点进行这个节点算法（递归）
	5.当以这个节点为父的所有节点和节点分支都搜索完成了，路径要pop掉该节点，并return
=====================================================================================*/
function nodeSearch(nodeObj){
	//debugger
	//步骤1
	SEARCH_LOAD.push(nodeObj.value);
	//步骤2
	if(STATE_ARR.ArrContains(nodeObj.value)){
		SEARCH_LOAD.pop();
		return;
	};
	//步骤3
	if(nodeObj.value.toString()==[4,4,0].toString()){
		ALL_SEARCH_LOAD.push(SEARCH_LOAD.slice());//记录这个路径解,注意是一个值传递
		SEARCH_LOAD.pop();
		return;
	};
	//步骤4 递归
	STATE_ARR.push(nodeObj.value);//标记这个为一个已处理的状态
	createChild(nodeObj);
	//此时nodeObj下面的children不为空
	if(nodeObj.children.toString() != [].toString() ){//如果nodeObj下面的儿子不为空
		//采用深度优先的方法搜索
		for (var i = 0; i < nodeObj.children.length; i++) {
			nodeSearch(nodeObj.children[i]);
		};
	};
	//步骤5
	SEARCH_LOAD.pop();
	return;
}

export function getload(){
	nodeSearch(RootNode);
	return ALL_SEARCH_LOAD;
}
// 生成子节点的测试
// createChild(RootNode);
// console.log(RootNode);

// nodeSearch(RootNode);
// console.log(ALL_SEARCH_LOAD)