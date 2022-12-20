import {useEffect, useState} from 'react'
import "./App.css"; 
import { Line } from "react-chartjs-2";
import axios from 'axios'; 
import CardPrincipal from './CardPrincipal';
import TableCoins from './TableCoins';
import Card from './Card'
import Convert from './Convert';
import Footer from './Footer'
import Header from './Header'
import {ThemeProvider} from "./Context/ThemeProvider";

//
export default function App() {
  //coins moneda
  //en la variable coins esta guardando las 4 tipos de monedas ejemplo BTC
  const [coins, setCoins] = useState()
  //currency divisa aqui me guarda los nombres de cada moneda ejemplo USD
  const [currency, setCurrency] = useState()
  //el estado final de como queremos ver los precios de las monedas que se encuentra en el Header
  //en la parte lateral 
  const [selCur, setSelCur] = useState("usd")
  //funcion para poder trabajar con el consumo de la api
  const getData = async () =>{
    //con el await podemos ya trabajar con lo que necesitamos de la api 
    //aplicandole su cur correspondiente y en el Selcur va a variar depende de la moneda que eliga el usuario
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selCur}&order=market_cap_desc&per_page=4&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C30d%2C90d%2C1y`)
    //se le pasa al formato Json
    const json = await response.json()
    const response_cur = await fetch("https://api.coingecko.com/api/v3/simple/supported_vs_currencies")
    const cur = await response_cur.json()
    setCoins(json)
    setCurrency(cur)
  }
  //cada vez que el componente sea renderizado se le va hacer consulta a la api
  //llamando la funcion getData
  useEffect(() => {
    getData()
  },[])

  //aqui me muestra el listado de las monedas como tal que se encuentra en la parte lateral del header
  useEffect(() => {
    getData()
  },[selCur])
  /* async function getApi(){
    /* fetch("https://api.coingecko.com/api/v3/simple/price?idszfsdf")
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(e => console.log("Error:",e))
    try{
      const response = await fetch("https://api.coingecko.com/api/v3/cosdfsd")
      const json = await response.json()
      console.log(json)
    }catch(e){
      console.log(e)
    }
  } */
  

  return (
    //en el coins esta guardadas lo que son las monedas le dice si no ha llegado datos 
    //a la variable coins basicamente ponme cargando en la pantalla del navegador
    !coins ? "Cargando..." :(
      //cuando ya entren todos los datos a coins se me van a renderizar todos los componentes
      //el Header el Card principal, que se me muestren todos los datos al terminar de cargar.
      //en en main cardprincipal me dice que me muestre de coin el array que se esta trayendo
      //que son todas las monedas en este caso son 4 monedas me dice que me traiga la primera moneda
      //posicion (0) que seria BTC , con el map me trae el id de las monedas el symbol
      //que seria el simbolo de cada moneda como tal, la imagen el current price que seria el precio
      //que tuvo hace 30 dias y el porcentaje que se tuvo hace 30 dias si bajo de precio o subio.
    <div className='App'>
       <ThemeProvider>
        <Header currencys={currency} fun={setSelCur} cur={selCur}/>
       </ThemeProvider>
      <main>    
        <CardPrincipal json={coins[0]} cur={selCur}/>
        <div className="cards_con">
          { coins.map(({id,symbol, image, current_price,price_change_percentage_30d_in_currency},index) =>{
           //aqui me esta diciendo basicamente es que todos lo numeros que sean distinto a cerpo traimelos
           //y como se estra trayendo 4 entonces restarian 3 nada mas ejemplo BTC,ETH,BNB ,
           //cada carta me la pinta
           if(index != 0) {
             return <Card key={index} price={`${symbol} - ${current_price} ${selCur} `} porcentaje={deleteDec(price_change_percentage_30d_in_currency,2)} img={image} coinId={id} cur={selCur}/>
            }
          })
          }
        </div>
      </main>
      <Convert/>
      <TableCoins coins={coins}/>
      <Footer/>
    </div>
  )
  )
  

}
//en esta funcion me dice que me formatee el precio y traimelo en 2 decimales nada mas 
export function deleteDec(val, decimal) {
  return val.toFixed(decimal)
}
//aqui si el porcentaje a esta por encima de 0 pintamelo verde y si esta por debajo pintamelo rojo.
export function colorDec(num){
  return num > 0 ? "green" : "red"
}
//cada 3 numeros ponme un punto en el precio.
export const numberF = Intl.NumberFormat("es-ES")
