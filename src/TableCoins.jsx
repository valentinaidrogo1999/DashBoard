import React from "react";
import "./tableCoins.css";
import CoinRow from "./CoinRow";

function TableCoins({ coins }) {
  console.log(coins);
  // estructura HTML
  return (
    <table className="table_coins">
      <thead>
        <tr>
          <td>#</td>
          <td>Moneda</td>
          <td>Precio</td>
          <td>24h</td>
          <td>Vol. total</td>
          <td>Cap. mercado</td>
          <td>Ultimos 7 dias</td>
        </tr>
      </thead>
      <tbody>
        {coins.map((coin, index) => (
          <CoinRow coin={coin} key={index} index={index + 1} />
        ))}
      </tbody>
    </table>
    //recorre coins.map y me expulsa coninRow que es otro componente se le pasa el index 1 para que la cuenta
    //no empiece en 0 y las coins
  );
}

export default TableCoins;
