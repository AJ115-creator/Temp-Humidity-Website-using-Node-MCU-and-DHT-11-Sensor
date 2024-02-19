#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include <DHT.h>

#define DHTPIN D4          // DHT11 sensor data pin

#define WIFI_SSID "RAILWIRE_FTTH"
#define WIFI_PASSWORD "ayush@123"

#define UPDATE_INTERVAL 3000   // Update interval in milliseconds

DHT dht(DHTPIN, DHT11);

unsigned long previousMillis = 0;
float humidity = 0.0;
float temperature = 0.0;

ESP8266WebServer server(80);

void handleRoot() {
  String webpage = "<html><head>";
  webpage += "<style>";
  webpage += "body { background-color: #FFFFE0; font-family: Arial, sans-serif; text-align: center; }";
  webpage += "h1 { color: #333333; }";
  webpage += ".temperature-icon { display: inline-block; width: 40px; height: 40px; }";
  webpage += ".humidity-icon { display: inline-block; width: 40px; height: 40px; }";
  webpage += ".reading { font-size: 24px; font-weight: bold; margin-left: 10px; }";
  webpage += ".temperature { display: inline-block; background-color: #ff8c00; color: #ffffff; border-radius: 50%; padding: 10px; }";
  webpage += ".humidity { display: inline-block; background-color: #4169e1; color: #ffffff; border-radius: 50%; padding: 10px; }";
  webpage += "</style>";
  webpage += "<script src='https://kit.fontawesome.com/a076d05399.js' crossorigin='anonymous'></script>";
  webpage += "</head><body>";
  webpage += "<h1>Temperature and Humidity</h1>";
  webpage += "<p><i class='fas fa-thermometer temperature-icon'></i> Temperature: <span id='temperature-reading' class='temperature reading'></span> &deg;C</p>";
  webpage += "<p><i class='fas fa-tint humidity-icon'></i> Humidity: <span id='humidity-reading' class='humidity reading'></span> %</p>";
  webpage += "<script>";
  webpage += "function updateReadings() {";
  webpage += "  fetch('/data')";
  webpage += "    .then(response => response.json())";
  webpage += "    .then(data => {";
  webpage += "      document.getElementById('temperature-reading').textContent = data.temperature;";
  webpage += "      document.getElementById('humidity-reading').textContent = data.humidity;";
  webpage += "    });";
  webpage += "}";
  webpage += "setInterval(updateReadings, " + String(UPDATE_INTERVAL) + ");";
  webpage += "</script>";
  webpage += "</body></html>";

  server.send(200, "text/html", webpage);
}


void handleData() {
  String jsonData = "{\"temperature\": " + String(temperature) + ", \"humidity\": " + String(humidity) + "}";
  server.send(200, "application/json", jsonData);
}

void updateReadings() {
  humidity = dht.readHumidity();
  temperature = dht.readTemperature();
}

void setup() {
  Serial.begin(115200);
  delay(100);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi!");
 Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
  dht.begin();

  server.on("/", handleRoot);
  server.on("/data", handleData); // Add a separate endpoint for data retrieval

  server.begin();
  Serial.println("HTTP server started");
}

void loop() {
  server.handleClient();

  unsigned long currentMillis = millis();
  if (currentMillis - previousMillis >= UPDATE_INTERVAL) {
    previousMillis = currentMillis;

    updateReadings(); // Update the temperature and humidity readings

    Serial.print("Temperature: ");
    Serial.print(temperature);
    Serial.print(" °C\tHumidity: ");
    Serial.print(humidity);
    Serial.println(" %");

    handleRoot(); // Update the web page with new temperature and humidity values
  }
}
