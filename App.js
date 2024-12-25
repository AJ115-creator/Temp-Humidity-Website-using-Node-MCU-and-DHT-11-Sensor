import React, { useState, useEffect, useRef } from 'react';
import firebase from './firebase';
import { Chart, CategoryScale, LinearScale, BarController, BarElement } from 'chart.js';
import './App.css';
import vbg from './downarr.mp4';

const App = () => {
  const [data, setData] = useState({});
  const humidityChartRef = useRef(null);
  const temperatureChartRef = useRef(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await firebase.database().ref('readings').once('value');
        if (snapshot.exists()) {
          const fetchedData = snapshot.val();
          console.log('Fetched data:', fetchedData);
          setData(fetchedData);
        } else {
          console.log('No data available');
          setData({}); // Set to an empty object
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setData({}); // Handle errors by resetting data to an empty object
      }
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
          label: 'Humidity',
          data: humidityValues,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 1000,
        easing: 'easeInOutQuart',
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(0, 0, 0, 0.1)',
          },
          ticks: {
            color: 'rgba(0, 0, 0, 0.7)',
          },
          title: {
            display: true,
            text: 'Time',
            color: 'rgba(0, 0, 0, 0.7)',
            font: {
              size: 14,
              weight: 'bold',
            }
          }
        },
        y: {
          grid: {
            color: 'rgba(0, 0, 0, 0.1)',
          },
          ticks: {
            color: 'rgba(0, 0, 0, 0.7)',
          },
          title: {
            display: true,
            text: 'Humidity (%)',
            color: 'rgba(0, 0, 0, 0.7)',
            font: {
              size: 14,
              weight: 'bold',
            }
          }
        },
      },
      plugins: {
        legend: {
          display: false,
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
          label: 'Temperature',
          data: temperatureValues,
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 1000,
        easing: 'easeInOutQuart',
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(0, 0, 0, 0.1)',
          },
          ticks: {
            color: 'rgba(0, 0, 0, 0.7)',
          },
          title: {
            display: true,
            text: 'Time',
            color: 'rgba(0, 0, 0, 0.7)',
            font: {
              size: 14,
              weight: 'bold',
            }
          }
        },
        y: {
          grid: {
            color: 'rgba(0, 0, 0, 0.1)',
          },
          ticks: {
            color: 'rgba(0, 0, 0, 0.7)',
          },
          title: {
            display: true,
            text: 'Temperature (°C)',
            color: 'rgba(0, 0, 0, 0.7)',
            font: {
              size: 14,
              weight: 'bold',
            }
          }
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });
};
return (
  <div className="container">
    <header className="header">
      <h1>Realtime Readings Just A Click Away</h1>
    </header>
    
    <div className="content">
      <h2 className="heading">Temperature & Humidity Readings</h2>
      
      <div className="table-container">
        <table>
          <thead>
            <tr className="tableHeads">
              <th>Humidity (%)</th>
              <th>Temperature (ºC)</th>
              <th>Date & Time</th>
              <th>Chart</th>
            </tr>
          </thead>
          <tbody>
            {data && Object.keys(data).length > 0 ? (
              Object.keys(data).map((key) => (
                <tr key={key}>
                  <td>{data[key].humidity}</td>
                  <td>{data[key].temperature}</td>
                  <td>{data[key].datetime}</td>
                  <td>
                    <button onClick={createHumidityChart}>Show Humidity Chart</button>
                    <button onClick={createTemperatureChart}>Show Temperature Chart</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center' }}>
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="chart-container">
        <canvas id="humidityChart" className="chart-canvas"></canvas>
      </div>
      <div className="chart-container">
        <canvas id="temperatureChart" className="chart-canvas"></canvas>
      </div>
    </div>
  </div>
);
};

export default App;