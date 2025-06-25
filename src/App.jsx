import "./styles.css"
import API_APPID from "./env"
import API_KEY from "./env"
import { useState } from "react"
export default function App(){
const [food, setfood] = useState("")
const [quant, setquant] = useState("")
const [cal, setcal] = useState(null)
const [err, seterr] = useState(null)
const [serving, setserving] = useState(null)
const getcal=async()=>{
  const query=`${food} ${quant}`;
  if(`${food}`==""||`${quant}`=="")
  {
    alert("Please enter both food item and quantity.");
    return;
  }
  const response= await fetch("https://trackapi.nutritionix.com/v2/natural/nutrients",{
    method: "POST",
    headers:{
      "x-app-id": API_APPID,
      "x-app-key": API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({query})
  });
  const getdata=await response.json();
  if(getdata && getdata.foods && getdata.foods.length >0 ){
    const cal=getdata.foods[0].nf_calories;
    const unit = getdata.foods[0].serving_unit;
    const qty = getdata.foods[0].serving_qty;
    setserving(`${qty} ${unit}`);
    setcal(`${cal.toFixed(2)} kcal`);
    seterr(null)
  }
  else{
    seterr("Food Not Found")
    setcal(null);
  }
  }


  return(
    <>
      <h1>CALORIE TRACKER</h1>
      <div>
        <label >Enter Item: </label>
      <input className="ipfield" type="text" value={food} onChange={(e)=>setfood(e.target.value)} required></input>
      <label>Enter Quantity</label>
      <input className="ipfield" type="text" value={quant} onChange={(e)=>setquant(e.target.value)} required></input>
      <button onClick={getcal} type="submit">GET CALORIES</button>
      {cal && <h1 className="result">Total Calories: {cal}</h1>}
      {serving && <h1 className="serving">Serving Size: {serving}</h1>}
      {err && <h1 className="error">{err}</h1>}
      </div>
    </>
  )
}