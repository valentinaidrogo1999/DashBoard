import "./Graph.css"
import {useEffect, useState, useRef} from 'react'
import { Line } from "react-chartjs-2";

//se importan los graficos que se van a utilizar
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
  } from 'chart.js';
  //este seria mas para el tema de capturas las fechas 
import moment from "moment/moment";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
)
//aqui me trae el tipo de linea 1 
export default function Graph({type = 1, coin = "bitcoin", currency = "usd", days = 30,color = "#04D99D"}){
    const chartStyle = {
      //se le quita un borde 
        border: {
            display: false
        },
        // se le quita los cuadros del grid
        grid:{
            display: false,  
        },
        // y las etiquetas del las veces que ha subido
        ticks: {
            display: false
        }
    }
    // se vuelve a consumir la api 
    let url = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${currency}&days=${days}&interval=daily`
    let data , options
    //se crean los 3 estados 
    const [prices, setPrices] = useState()
    const [dates, setDates] = useState()
    const [gradient, setGradient] = useState()
    async function getData(){
      //se le dice intente ejecutar este codigo y si no 
        try{
            const response = await fetch(url)
            const json = await response.json()
            setPrices(json.prices.map(item => Math.round(item[1])))
            setDates(json.prices.map(item => moment.unix(item[0]).format("MM-DD")))
        }catch(e){
          //votame este error por consola
            console.log("error:",e)
        }
    }
    const chartRef = useRef(null);
    
    //se crea el canva de la carta principal
    useEffect(_ => {
        getData()
        const canvas = chartRef.current.firstChild
        let BGgradient = canvas.getContext("2d").createLinearGradient(0, 0, 0, canvas.height);
        BGgradient.addColorStop(0, 'rgba(4, 191, 157, 1)');   
        BGgradient.addColorStop(1, 'rgba(4, 191, 157, 0)')
        setGradient(BGgradient)
    },[])
    
    
    


//en caso de ser 0 le vota las opciones
    switch(type){
        case 0:

            options = {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                  legend: {
                    display: false,
                  },
                  title: {
                    display: false,
                  }
                },
                scales: {
                    x:{
                        grid:{
                            display: false
                        }
                    },
                    y:{
                        grid:{
                            display: false
                        },
                        ticks: {
                            callback: function(value, index, ticks) {
                                return `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} ${currency.toUpperCase()}`;
                            }
                        }
                    }
                }
              }
              //data
            data = {
                labels: dates,
                datasets: [
                  {
                    data: prices,
                    borderColor: color,
                    backgroundColor: gradient,
                    tension: .4,
                    pointRadius: 0,
                    fill: true
                  }
                ]
              }
              break
        case 1:
          //opciones
            options = {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                  legend: {
                    display: false,
                  },
                  title: {
                    display: false,
                  }
                },
                scales: {
                    x: chartStyle,
                    y: chartStyle
                }
              }
              //data
            data = {
                labels: dates,
                datasets: [
                  {
                    data: prices,
                    borderColor: color,
                    tension: .4,
                    pointRadius: 0,
                  }
                ]
              }
            break
    }
    //retorname el chertRef que este es el que contiene toda la grafica
    return (
        <div ref={chartRef} className="graph">
            <Line data={data} options={options}/>
        </div> 
    )
}