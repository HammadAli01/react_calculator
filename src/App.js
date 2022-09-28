import './App.css';
import React,{useState} from 'react';
function App() {
  
  const [expressionData,setExpressionData]=useState();
  const [arrayOperation,setArrayOperation]=useState();
  const [initialAccumulator,setInitialAccumulator]=useState();
  const [historyValues,setHistoryValues]=useState([]);
  const initialState={
    inputBox:'',
    arrayInputBox:''
  }
  const [state,setState]=useState(initialState);
  const changeHandler=(e)=>
  {
    setState({...state,[e.target.name]:e.target.value});
  }
  const UserClickButton=(input)=>{
    
    var currentInput,shouldCalculate=true,input_box=document.getElementById('calculation');
    console.log(input_box.disabled);
      if(input_box.disabled==true)
      {
        shouldCalculate=false;
        console.log("inside true");
        currentInput=state.arrayInputBox;
        if(input=="+")
        {
          setArrayOperation("+");
          setInitialAccumulator(0);
          
        }
        else if(input=="*"){
          setArrayOperation("*");
          setInitialAccumulator(1);
         
        }
        else if(input=="-"){
          setArrayOperation("-");
          setInitialAccumulator(0);
          
        }
        else if(input=="/"){
          setArrayOperation("/");
          setInitialAccumulator(1);
        
        }
      }
      else
      {
        currentInput=state.inputBox;
      }
      if(shouldCalculate)
      {
        var oldinput = currentInput;
        var newinput = oldinput + input;
       setExpressionData(newinput);
        setState({...state,inputBox:newinput});    
      }
    }
   
    const CalculateValue=()=> 
    {
      var input_box=document.getElementById('calculation');
      if(input_box.disabled){   
        var arrOfStr = (state.arrayInputBox).split(',');
        var arrOfNum = arrOfStr.map(element => { return Number(element); });
        console.log("array in num is=> ",arrOfNum,"state operation:",arrayOperation); 
        var calculatedResult=arrOfNum.reduce((res,val)=>{
          if(arrayOperation=="+")
          {
            return res+val;
          }
          else if(arrayOperation=="*") 
          { 
            return res*val; 
          } 
          else if(arrayOperation=="/") 
          {
            return  val/res; 
          } 
          else if(arrayOperation=="-") 
          {
            return  val-res; 
          }
         },initialAccumulator);
         console.log(calculatedResult,"initial accumulator:",initialAccumulator);
         storeHistory(state.arrayInputBox+" Operation ("+arrayOperation+")",calculatedResult);
         setState({...state,arrayInputBox:calculatedResult});
        }
        else
        { 
          var input = state.inputBox;
          var result = eval(input);
          calculatedResult = result;
          storeHistory(expressionData,calculatedResult);
          setState({...state,inputBox:calculatedResult});
        }
    }
    const ClearData=()=>
    {
      setState(initialState);
      console.log(state.inputBox,state.arrayInputBox);
    }
    const storeHistory=(expression,resultcalculated)=>{
      setHistoryValues(current=>([...current,{inputData: expression, result: resultcalculated}]));
      setExpressionData(resultcalculated);
    }
    function showLogdata() {
      var history = document.getElementById("history");
      var string = "";
      historyValues.forEach((input)=>{
        string +="" +input.inputData+" = " +input.result +"<br>";
      });
      history.innerHTML = string;
    }
    const changeDisplayArrayInput=()=>
    {
      var inputClass=document.getElementById("arraydata").classList;
      //console.log(inputClass);
      if(inputClass.contains("array-input-hide"))
      {
        inputClass.add("array-input-show");
        inputClass.remove("array-input-hide");
        document.getElementById("calculation").disabled = "true";
      }
      else 
      {
        inputClass.add("array-input-hide");
        inputClass.remove("array-input-show");
        document.getElementById("calculation").disabled = false;
      }
      
    }
  return (
    
    <div className="App">
<h1 className="text-center">Calculator</h1>
    <div className="container" style={{padding: 30,marginTop: 50,background: "#fff",borderRadius: 15}}>
        <div className="row">
            <div className="col-lg-12 ">
                <input type="text" value={state.arrayInputBox} name="arrayInputBox" onChange={(e)=>changeHandler(e)} id="arraydata" className="form-control array-input array-input-hide" style={{padding: 10,fontSize: 30,height: 50}}/>
            <input type="text" value={state.inputBox} name="inputBox" onChange={(e)=>changeHandler(e)} id="calculation" className="form-control normal-input" style={{padding: 10,fontSize: 30,height: 50}}/>
            </div>
        </div>
    <div className="row">
        <div className="col-xs-3 ">
            <button id="one" className="btn btn-info btn-block btn_font" onClick={()=>UserClickButton('1')}>1</button>
        </div>
        <div className="col-xs-3 ">
            <button id="two" className="btn btn-info btn-block btn_font" onClick={()=>UserClickButton('2')}>2</button>
        </div>
        <div className="col-xs-3 ">
            <button id="three" className="btn btn-info btn-block btn_font" onClick={()=>UserClickButton('3')}>3</button>
        </div>
        <div className="col-xs-3 ">
            <button id="add" className="btn btn-primary btn-block btn_font" onClick={()=>UserClickButton("+")}>+</button>
        </div>
    </div>
        <div className="row">
            <div className="col-xs-3 ">
                <button id="four" className="btn btn-info btn-block btn_font" onClick={()=>UserClickButton("4")}>4</button>
            </div>
            <div className="col-xs-3 ">
                <button id="five" className="btn btn-info btn-block btn_font" onClick={()=>UserClickButton("5")}>5</button>
            </div>
            <div className="col-xs-3 ">
                <button id="six" className="btn btn-info btn-block btn_font" onClick={()=>UserClickButton("6")}>6</button>
            </div>
            <div className="col-xs-3 ">
                <button id="minus" className="btn btn-primary btn-block btn_font" onClick={()=>UserClickButton("-")}>-</button>
            </div>
        </div>
        <div className="row">
            <div className="col-xs-3 ">
                <button id="seven" className="btn btn-info btn-block btn_font" onClick={()=>UserClickButton("7")}>7</button>
            </div>
            <div className="col-xs-3 ">
                <button id="eight" className="btn btn-info btn-block btn_font" onClick={()=>UserClickButton("8")}>8</button>
            </div>
            <div className="col-xs-3 ">
                <button id="nine" className="btn btn-info btn-block btn_font" onClick={()=>UserClickButton("9")}>9</button>
            </div>
            <div className="col-xs-3 ">
                <button id="multiply" className="btn btn-primary btn-block btn_font" onClick={()=>UserClickButton("*")}>*</button>
            </div>
        </div>
        <div className="row">
            <div className="col-xs-3 ">
                <button id="dot" className="btn btn-info btn-block btn_font" onClick={()=>UserClickButton(".")}>.</button>
            </div>
            <div className="col-xs-3 ">
                <button id="zero" className="btn btn-info btn-block btn_font" onClick={()=>UserClickButton("0")}>0</button>
            </div>
            <div className="col-xs-3 ">
                <button id="equal" className="btn btn-info btn-block btn_font" onClick={()=>CalculateValue()}>=</button>
            </div>
            <div className="col-xs-3 ">
                <button id="divide" className="btn btn-primary btn-block btn_font" onClick={()=>UserClickButton("/")}>/</button>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-12 ">
                <button className="btn btn-danger  clear-button" onClick={()=>ClearData()}>CLEAR</button>
                    <button onClick={()=>showLogdata()} className="btn btn-warning history-btn">History Log</button>
               <button onClick={()=>changeDisplayArrayInput()} id="array-btn" className="btn btn-success array-btn">Array Input</button>
               <div  id="history" >
            </div>
                </div>
            </div>
        </div>
        
    </div>
  
  );
}

export default App;
//setUserdata({...userData,[e.target.name]:e.target.value});
//correct way of updating mystate,,can we do history show like i did