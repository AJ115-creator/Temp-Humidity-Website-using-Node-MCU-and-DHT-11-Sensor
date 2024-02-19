import React, { useState, useEffect, useRef } from 'react';
import firebase from './firebase';
import { Chart, CategoryScale, LinearScale, BarController, BarElement } from 'chart.js';
import './App.css';
import vbg from './downarr.mp4';

const App = () => {
  const [data, setData] = useState([]);
  const humidityChartRef = useRef(null);
  const temperatureChartRef = useRef(null);
  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await firebase.database().ref('UsersData').child('8NTo1UotLlh4nDePR0ub8TRimrB3').child('readings').once('value');
      const data = snapshot.val();
      setData(data);
    };

    fetchData();
  }, []);
 
  const createHumidityChart = () => {
  if (humidityChartRef.current) {
    humidityChartRef.current.destroy();
  }
  Chart.register(CategoryScale, LinearScale, BarController, BarElement);

  const ctx = document.getElementById('humidityChart').getContext('2d');
  const labels = Object.keys(data).sort();
  const humidityValues = labels.map((key) => data[key].humidity);

  const formattedLabels = labels.map((key) => data[key].datetime);

  humidityChartRef.current = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: formattedLabels,
      datasets: [
        {
          label: 'Humidity VS Time',
          data: humidityValues,
          backgroundColor:  [
     'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
     
    ], // Set the background color for the bars
          borderColor: [
    'black',
     
    ],
          borderWidth: 3,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
       animation: {
        duration: 1000, // Set the duration of the animation in milliseconds
          easing: 'easeInCirc', // Set the easing function for the animation
        from: 0, // Animate the chart starting from 0 (initial state)
      },
      scales: {
        x: {
          grid: {
            color: 'black',
            lineWidth: 2,
          },
          ticks: {
            color: 'red',
            size:'10em',
            weight:'bolder'
          },
           title: {
            display: true,
            text: 'TIME',
            color: 'black',
            font: {
               
              size: '50px',
              weight: 'bold',
              borderColor: 'black'
            
            }
          }
        },
        y: {
          grid: {
            color: 'black',
            lineWidth: 2,
          },
          ticks: {
            color: 'red',
             size:'10em',
             weight:'bolder'
          },
           title: {
            display: true,
            text: 'HUMIDITY',
            color: 'black',
            font: {
               
              size: '50px',
              weight: 'bold',
              borderColor: 'black'
            }
          }
        },
      },
    },
  });
};


  const createTemperatureChart = () => {
  if (temperatureChartRef.current) {
    temperatureChartRef.current.destroy();
  }

  Chart.register(CategoryScale, LinearScale, BarController, BarElement);

  const ctx = document.getElementById('temperatureChart').getContext('2d');
  const labels = Object.keys(data).sort();
  const temperatureValues = labels.map((key) => data[key].temperature);

  const formattedLabels = labels.map((key) => data[key].datetime);

  temperatureChartRef.current = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: formattedLabels,
      datasets: [
        {
          label: 'Temperature Vs Humidity',
          data: temperatureValues,
          backgroundColor:  [
       'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
     
    ], // Set the background color for the bars
          borderColor:  [
     'black',
     
     
    ],
          borderWidth: 3,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
       animation: {
        duration: 1000, // Set the duration of the animation in milliseconds
          easing: 'easeInCirc', // Set the easing function for the animation
        from: 0, // Animate the chart starting from 0 (initial state)
      },
      scales: {
        x: {
          grid: {
            color: 'black',
            lineWidth: 2,
          },
          ticks: {
            color: 'red',
            weight:'bolder',
            size:'10em'
          },
          title: {
            display: true,
            text: 'TIME',
            color: 'black',
            font: {
               
              size: '50px',
              weight: 'bold',
              borderColor: 'black'
            }
          }
        },
        y: {
          grid: {
            color: 'black',
            lineWidth: 2,
          },
          ticks: {
            color: 'red',
            weight:'bolder',
            size:'10em'
          },
           title: {
            display: true,
            text: 'TEMPERATURE',
            color: 'black',
            font: {
               
              size: '50px',
              weight: 'bold',
              borderColor: 'black'
            }
          }
        },
      },
    },
  });
};
  return (
     <><body>
     <div className="container" >
     
      
      <div class="header">
      <h1 style={{marginBottom:'100px'}}>Realtime Readings Just A Click Away</h1>
      </div>
</div>
     <div class='bg' style={{
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: '100vh',
}}>
  <div style={{
    textAlign: "center",
    fontStyle: "italic",
    color: "#1abc9c",
    fontWeight: "bolder",
    marginTop: "30px",
    fontSize:'20px',
   
  }}>
    <h3>SCROLL DOWN</h3>
    <video className="video-background" autoPlay loop muted style={{
      maxWidth: '50%',
      maxHeight: '50%',
    }}>
        <source src={vbg} type="video/mp4" />
      </video>
  </div>
</div>

       <div className="content">
        <div class='sub'>  
    <div className="contain" style={{ marginTop: '10px' }}>
       
        <h2 class='heading'>Temperature & Humidity Readings</h2>
        
        <div className="table-container">
          <table>
            <thead>
              <tr class='tableHeads'style={{ fontSize:'20px' }}>
                <th>Humidity (%)</th>
                <th>Temperature (ºC)</th>
                <th>Date &amp; Time</th>
                <th>Chart</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(data).map((key) => (
                <tr key={key}>
                  <td style={{ color: 'black',fontSize:'18px', fontWeight: 'bold' }}>{data[key].humidity}</td>
                  <td style={{ color: 'black',fontSize:'18px',fontWeight: 'bold' }}>{data[key].temperature}</td>
                  <td style={{ color: 'black',fontSize:'18px',fontWeight: 'bold' }}>{data[key].datetime}</td>
                  <td>
                    <div>
                      <button onClick={createHumidityChart}>Show Humidity Chart</button>
                    </div>
                    <div>
                      <button onClick={createTemperatureChart}>Show Temperature Chart</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
        <div className="chart-container">
          <canvas id="humidityChart"className="chart-canvas"></canvas>
          </div>
          <div>
          <div className="chart-container">
          <canvas id="temperatureChart"className="chart-canvas"></canvas>
          </div>
        </div>
      </div>
      </div>
     </body>  </>
  );
};

export default App;
