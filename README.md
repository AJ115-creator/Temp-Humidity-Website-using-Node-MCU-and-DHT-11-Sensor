# Firebase Temperature and Humidity Monitoring System

## Overview

This project is a comprehensive temperature and humidity monitoring system that utilizes an Arduino-based setup with a DHT11 sensor, a NodeMCU ESP8266 for WiFi connectivity, and a Firebase Realtime Database for data storage. The collected data is then retrieved and displayed using a React application, which visualizes the temperature and humidity variations over time using the Chart.js library.

## Table of Contents

- [Features](#features)
- [Hardware Requirements](#hardware-requirements)
- [Software Requirements](#software-requirements)
- [React Application](#react-application)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- Real-time data collection of temperature and humidity.
- Data storage in Firebase Realtime Database.
- Visualization of data using interactive charts.
- Responsive web application built with React.
- Easy to set up and use.

## Hardware Requirements

- NodeMCU ESP8266
- DHT11 Temperature and Humidity Sensor
- Breadboard and jumper wires
- Power supply (USB or battery)

## Software Requirements

- Arduino IDE
- Firebase account
- Node.js and npm (for React application)
- Libraries:
  - Firebase ESP Client
  - DHT sensor library
  - NTPClient library

## React Application

The React application retrieves data from the Firebase Realtime Database and displays it in a user-friendly format. It utilizes the Chart.js library to create interactive charts that visualize the temperature and humidity variations over time.

### Key Features of the React Application

- Fetches real-time data from Firebase.
- Displays data in a tabular format.
- Visualizes data trends using Chart.js.
- Responsive design for various devices.

## Setup Instructions

1. **Clone the Repository**: 
   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
## Install Dependencies

### Arduino Code
1. Open the project in Arduino IDE.
2. Install the required libraries.

### React Application
1. Navigate to the React folder.
2. Run the following command:

```bash
npm install
```

## Configure Firebase
1. Create a Firebase project and set up the Realtime Database.
2. Replace the `LEGACY_TOKEN` and `DATABASE_URL` in the Arduino code with your Firebase project details.

## Upload Arduino Code
1. Connect your NodeMCU ESP8266 to your computer.
2. Upload the Arduino code.

## Run the React Application
Start the React application by running:

```bash
npm start
```

## Usage
- Once the Arduino code is uploaded and the React application is running, you can view the temperature and humidity data in real-time.
- The application will display the data in a table and visualize it using charts.

## Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

