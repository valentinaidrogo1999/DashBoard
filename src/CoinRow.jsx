import React from "react";
import "./coinRow.css"
import Graph from './Graph'
import {deleteDec, colorDec, numberF} from './App'

export default function CoinRow({ coin, index }) {
  console.log(index);
  // el td es basicamente la numeracion en fila de los numeros ejemplo 1,2,3,4,5,6,7 etc ya despues 
  //al div que tiene todas las imagenes traime el nombre de cada moneda, luego me formatea el numero
  //y al final ponme que es en dolares
  return (
    <tr>
      <td>{index}</td>
      <td>
        <div className="coin_image_container">
            <img src={coin.image} title={coin.name} alt={coin.name} />
        </div>
      </td>
      <td>{numberF.format(coin.current_price)}US$</td>
      <td className={colorDec(coin.market_cap_change_percentage_24h)}>{deleteDec(coin.market_cap_change_percentage_24h, 2)}%</td>
      <td>{numberF.format(coin.total_volume)}US$</td>
      <td>{numberF.format(coin.market_cap)}US$</td>
      <td><Graph coin={coin.id} days={7} color={colorDec(coin.market_cap_change_percentage_24h)}/></td>
    </tr>
  );
}
