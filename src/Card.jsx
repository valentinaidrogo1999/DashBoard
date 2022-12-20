import "./Card.css"
import Graph from "./Graph"
import {colorDec} from './App'
//practicamente aqui se destructura el Json  y entre llaves decimos{quiero que me traigas coinId el cur 
//el porcentaje y la imagen}
export default function Card({coinId, cur, porcentaje, price, img}){
    //se llama aqui el parametro img se estructura todo mi HTML, precio 
    //y el color correspondiente del porcentaje.
    return (
        <div className="card">
            <img src={img} alt=""/>
            <div className="con-main">
                <div className="con-title">
                    <h2 className={`price ${colorDec(porcentaje)}`}>{price}</h2>
                    <h4 className={`porcentajes ${colorDec(porcentaje)}`}>{porcentaje}%</h4>
                </div>
                <Graph coin={coinId} currency={cur} color={colorDec(porcentaje)}/>
            </div>
        </div>
    )
}