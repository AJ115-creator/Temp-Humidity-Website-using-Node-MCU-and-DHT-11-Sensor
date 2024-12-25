#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <Firebase_ESP_Client.h>
#include <NTPClient.h>
#include <WiFiUdp.h>
#include <DHT.h>
#include <TimeLib.h>

// Provide the RTDB payload printing info and other helper functions
#include "addons/RTDBHelper.h"

// WiFi credentials
#define WIFI_SSID "F_U"
#define WIFI_PASSWORD "Bit@2021"

// Insert Firebase Legacy Token
#define LEGACY_TOKEN "K06lK1ms0XHqF3yQLvuJhSdHsjugpUQNlf8mDirU"

// Insert Firebase Realtime Database URL
#define DATABASE_URL "https://temperature-readings-1799b-default-rtdb.firebaseio.com"

// Define Firebase objects
FirebaseData fbdo;
FirebaseConfig config;

// Database main path
String databasePath = "/readings";

// Define NTP Client to get time
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org", 19800); // Adjust for IST (UTC +5:30)

// DHT11 sensor
#define DHT_PIN D4
DHT dht(DHT_PIN, DHT11);
float temperature;
float humidity;

// Timer variables (send new readings every 3 minutes)
unsigned long sendDataPrevMillis = 0;
unsigned long timerDelay = 180000;

// Initialize WiFi
void initWiFi() {
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to WiFi ..");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print('.');
    delay(1000);
  }
  Serial.println("\nConnected to WiFi");
  Serial.println(WiFi.localIP());
}

// Function that gets current epoch time
unsigned long getTime() {
  timeClient.update();
  return timeClient.getEpochTime();
}

// Function that gets the current date and time as a formatted string
String getDateTime() {
  time_t now = timeClient.getEpochTime();
  struct tm *timeinfo;
  timeinfo = localtime(&now);

  char buffer[20];
  sprintf(buffer, "%04d-%02d-%02d %02d:%02d:%02d",
          timeinfo->tm_year + 1900, timeinfo->tm_mon + 1, timeinfo->tm_mday,
          timeinfo->tm_hour, timeinfo->tm_min, timeinfo->tm_sec);

  return String(buffer);
}

void setup() {
  Serial.begin(115200);

  // Initialize WiFi
  initWiFi();

  // Synchronize time
  timeClient.begin();
  while (!timeClient.update()) {
    timeClient.forceUpdate();
  }

  // Firebase configuration
  config.database_url = DATABASE_URL;
  config.signer.tokens.legacy_token = LEGACY_TOKEN;

  // Initialize Firebase
  Firebase.begin(&config, nullptr);
  Firebase.reconnectWiFi(true);

  // Debug info
  Serial.println("Firebase initialized.");
  Serial.println("Database Path: " + databasePath);

  // Initialize DHT11 sensor
  dht.begin();
}

void loop() {
  // Send new readings to database
  if (Firebase.ready() && (millis() - sendDataPrevMillis > timerDelay || sendDataPrevMillis == 0)) {
    sendDataPrevMillis = millis();

    // Reconnect WiFi if disconnected
    if (WiFi.status() != WL_CONNECTED) {
      Serial.println("WiFi disconnected! Reconnecting...");
      initWiFi();
    }

    // Synchronize time
    timeClient.update();

    // Read DHT sensor values
    temperature = dht.readTemperature();
    humidity = dht.readHumidity();

    if (isnan(temperature) || isnan(humidity)) {
      Serial.println("Failed to read from DHT sensor!");
      return;
    }

    // Create JSON payload
    String timestamp = String(getTime());
    String datetime = getDateTime();

    FirebaseJson json;
    json.set("/temperature", String(temperature, 2));
    json.set("/humidity", String(humidity, 2));
    json.set("/timestamp", timestamp);
    json.set("/datetime", datetime);

    // Send data to Firebase
    String path = databasePath + "/" + timestamp;

    if (Firebase.RTDB.setJSON(&fbdo, path.c_str(), &json)) {
      Serial.println("Data sent to Firebase successfully!");
    } else {
      Serial.print("Failed to send data: ");
      Serial.println(fbdo.errorReason());
    }

    // Debugging logs
    Serial.printf("Temperature: %.2f°C, Humidity: %.2f%%\n", temperature, humidity);
    Serial.printf("Database Path: %s\n", path.c_str());
  }
}
