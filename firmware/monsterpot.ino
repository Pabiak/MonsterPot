#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <Wire.h>
#include <Digital_Light_TSL2561.h>
#include <DHT.h>

#define NO_TOUCH       0xFE
#define THRESHOLD      100
#define ATTINY1_HIGH_ADDR   0x78
#define ATTINY2_LOW_ADDR   0x77

unsigned char low_data[8] = {0};
unsigned char high_data[12] = {0};

const char* ssid = "TP-Link_9B88";
const char* password = "94398670";

const char* mqtt_server = "cdecc7ba2d894bf9ae21df95c7c8a10b.s1.eu.hivemq.cloud";
const char* mqtt_user = "pabiak";
const char* mqtt_password = "Xt*Go7YkilFp2n";

BearSSL::WiFiClientSecure espClient;
PubSubClient client(espClient);

const int temperaturePin = 4; // D2
const int soilMoisturePin = A0;
const int pumpPin = 12;

int waterLevel = 0;
unsigned long previousMillis = 0;

OneWire oneWire(temperaturePin);
DallasTemperature temperatureSensor(&oneWire);

// HiveMQ Cloud Let's Encrypt CA certificate (hardcoded)
static const char ca_cert[] PROGMEM = R"EOF(
-----BEGIN CERTIFICATE-----
MIIFazCCA1OgAwIBAgIRAIIQz7DSQONZRGPgu2OCiwAwDQYJKoZIhvcNAQELBQAw
TzELMAkGA1UEBhMCVVMxKTAnBgNVBAoTIEludGVybmV0IFNlY3VyaXR5IFJlc2Vh
cmNoIEdyb3VwMRUwEwYDVQQDEwxJU1JHIFJvb3QgWDEwHhcNMTUwNjA0MTEwNDM4
WhcNMzUwNjA0MTEwNDM4WjBPMQswCQYDVQQGEwJVUzEpMCcGA1UEChMgSW50ZXJu
ZXQgU2VjdXJpdHkgUmVzZWFyY2ggR3JvdXAxFTATBgNVBAMTDElTUkcgUm9vdCBY
MTCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoCggIBAK3oJHP0FDfzm54rVygc
h77ct984kIxuPOZXoHj3dcKi/vVqbvYATyjb3miGbESTtrFj/RQSa78f0uoxmyF+
0TM8ukj13Xnfs7j/EvEhmkvBioZxaUpmZmyPfjxwv60pIgbz5MDmgK7iS4+3mX6U
A5/TR5d8mUgjU+g4rk8Kb4Mu0UlXjIB0ttov0DiNewNwIRt18jA8+o+u3dpjq+sW
T8KOEUt+zwvo/7V3LvSye0rgTBIlDHCNAymg4VMk7BPZ7hm/ELNKjD+Jo2FR3qyH
B5T0Y3HsLuJvW5iB4YlcNHlsdu87kGJ55tukmi8mxdAQ4Q7e2RCOFvu396j3x+UC
B5iPNgiV5+I3lg02dZ77DnKxHZu8A/lJBdiB3QW0KtZB6awBdpUKD9jf1b0SHzUv
KBds0pjBqAlkd25HN7rOrFleaJ1/ctaJxQZBKT5ZPt0m9STJEadao0xAH0ahmbWn
OlFuhjuefXKnEgV4We0+UXgVCwOPjdAvBbI+e0ocS3MFEvzG6uBQE3xDk3SzynTn
jh8BCNAw1FtxNrQHusEwMFxIt4I7mKZ9YIqioymCzLq9gwQbooMDQaHWBfEbwrbw
qHyGO0aoSCqI3Haadr8faqU9GY/rOPNk3sgrDQoo//fb4hVC1CLQJ13hef4Y53CI
rU7m2Ys6xt0nUW7/vGT1M0NPAgMBAAGjQjBAMA4GA1UdDwEB/wQEAwIBBjAPBgNV
HRMBAf8EBTADAQH/MB0GA1UdDgQWBBR5tFnme7bl5AFzgAiIyBpY9umbbjANBgkq
hkiG9w0BAQsFAAOCAgEAVR9YqbyyqFDQDLHYGmkgJykIrGF1XIpu+ILlaS/V9lZL
ubhzEFnTIZd+50xx+7LSYK05qAvqFyFWhfFQDlnrzuBZ6brJFe+GnY+EgPbk6ZGQ
3BebYhtF8GaV0nxvwuo77x/Py9auJ/GpsMiu/X1+mvoiBOv/2X/qkSsisRcOj/KK
NFtY2PwByVS5uCbMiogziUwthDyC3+6WVwW6LLv3xLfHTjuCvjHIInNzktHCgKQ5
ORAzI4JMPJ+GslWYHb4phowim57iaztXOoJwTdwJx4nLCgdNbOhdjsnvzqvHu7Ur
TkXWStAmzOVyyghqpZXjFaH3pO3JLF+l+/+sKAIuvtd7u+Nxe5AW0wdeRlN8NwdC
jNPElpzVmbUq4JUagEiuTDkHzsxHpFKVK7q4+63SM1N95R1NbdWhscdCb+ZAJzVc
oyi3B43njTOQ5yOf+1CceWxG1bQVs5ZufpsMljq4Ui0/1lvh+wjChP4kqKOJ2qxq
4RgqsahDYVvTH9w7jXbyLeiNdd8XM2w9U/t7y0Ff/9yi0GE44Za4rF2LN9d11TPA
mRGunUHBcnWEvgJBQl9nJEiU0Zsnvgc/ubhPgXRR4Xq37Z0j4r7g1SgEEzwxA57d
emyPxgcYxn/eR44/KJ4EBs+lVDR3veyJm+kXQ99b21/+jh5Xos1AnX5iItreGCc=
-----END CERTIFICATE-----
)EOF";

void setClock() {
  configTime(3 * 3600, 0, "pool.ntp.org", "time.nist.gov");

  Serial.print("Waiting for NTP time sync: ");
  time_t now = time(nullptr);
  while (now < 8 * 3600 * 2) {
    delay(500);
    Serial.print(".");
    now = time(nullptr);
  }
  Serial.println("");
  struct tm timeinfo;
  gmtime_r(&now, &timeinfo);
  Serial.print("Current time: ");
  Serial.print(asctime(&timeinfo));
}

void setup_wifi() {
  delay(10);

  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  randomSeed(micros());

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void startWatering() {
  digitalWrite(pumpPin, HIGH);
  delayMicroseconds(5000);
  digitalWrite(pumpPin, LOW);
  client.publish("monsterpot/watering", "watering complete");
}

void getSensorsData() {
  int maxHumidityValue = 1023;
  int minHumidityValue = 223;

  int maxTemperature  = 25;
  int maxLight = 1000;

  temperatureSensor.requestTemperatures(); 
  double celcius = temperatureSensor.getTempCByIndex(0);
  int light = TSL2561.readVisibleLux();
  int humidity = analogRead(soilMoisturePin);
  int humidityPercent = 100 - map(humidity, minHumidityValue, maxHumidityValue, 0, 100);
  humidityPercent = constrain(humidityPercent, 0, 100);

  Serial.println(humidityPercent);

  StaticJsonDocument<256> jsonDoc;
  jsonDoc["humidity"] = String(humidityPercent);
  jsonDoc["temperature"] = String(celcius, 2);
  jsonDoc["light"] = String(light);

  char jsonBuffer[256];
  serializeJson(jsonDoc, jsonBuffer);

  client.publish("monsterpot/sensors", jsonBuffer);
  Serial.println("Response published: ");
  Serial.println(jsonBuffer);

  if (celcius > maxTemperature) {
    client.publish("monsterpot/error/temperature", "to hight temperature");
  }

  if (light > maxLight) {
    client.publish("monsterpot/error/light", "to hight light intensity");
  }

  if (humidityPercent < 30 && waterLevel > 20) {
    startWatering();
  }
}

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");

  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();

  if (String(topic) == "monsterpot/request/sensors") {
    getSensorsData();
  }
}

void reconnect() {
  char err_buf[256];
  
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection..x.");
    String clientId = "ESP8266Client";

    if (client.connect(clientId.c_str(), mqtt_user, mqtt_password)) {
      Serial.println("connected");
      client.subscribe("monsterpot/request/sensors");

    } else {
      Serial.print("failed, rc=");
      Serial.println(client.state());
      espClient.getLastSSLError(err_buf, sizeof(err_buf));
      Serial.print("SSL error: ");
      Serial.println(err_buf);
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}

void getHigh12SectionValue() {
  memset(high_data, 0, sizeof(high_data));
  Wire.requestFrom(ATTINY1_HIGH_ADDR, 12);
  while (12 != Wire.available());

  for (int i = 0; i < 12; i++) {
    high_data[i] = Wire.read();
  }
  delay(10);
}

void getLow8SectionValue() {
  memset(low_data, 0, sizeof(low_data));
  Wire.requestFrom(ATTINY2_LOW_ADDR, 8);

  while (8 != Wire.available());

  for (int i = 0; i < 8 ; i++) {
    low_data[i] = Wire.read();
  }
  delay(10);
}

void checkWaterLevel() {
  int sensorvalue_min = 250;
  int sensorvalue_max = 255;
  int low_count = 0;
  int high_count = 0;

  while (true) {
    uint32_t touch_val = 0;
    uint8_t trig_section = 0;
    low_count = 0;
    high_count = 0;
    getLow8SectionValue();
    getHigh12SectionValue();

    Serial.println("low 8 sections value = ");

    for (int i = 0; i < 8; i++) {
      Serial.print(low_data[i]);
      Serial.print(".");

      if (low_data[i] >= sensorvalue_min && low_data[i] <= sensorvalue_max) {
        low_count++;
      }

      if (low_count == 8) {
        Serial.print("      ");
        Serial.print("PASS");
      }
    }

    Serial.println("  ");
    Serial.println("  ");
    Serial.println("high 12 sections value = ");

    for (int i = 0; i < 12; i++) {
      Serial.print(high_data[i]);
      Serial.print(".");

      if (high_data[i] >= sensorvalue_min && high_data[i] <= sensorvalue_max) {
        high_count++;
      }

      if (high_count == 12) {
        Serial.print("      ");
        Serial.print("PASS");
      }
    }

    Serial.println("  ");
    Serial.println("  ");

    for (int i = 0 ; i < 8; i++) {
      if (low_data[i] > THRESHOLD) {
        touch_val |= 1 << i;

      }
    }
    for (int i = 0 ; i < 12; i++) {
      if (high_data[i] > THRESHOLD) {
        touch_val |= (uint32_t)1 << (8 + i);
      }
    }

    while (touch_val & 0x01) {
      trig_section++;
      touch_val >>= 1;
    }

    if (trig_section * 5 <= 20) {
      client.publish("monsterpot/error/water-level", "low water level");
    }

    Serial.print("water level = ");
    Serial.print(trig_section * 5);
    Serial.println("% ");
    Serial.println(" ");
    Serial.println("*********************************************************");
    waterLevel = trig_section * 5;
    delay(1000);
  }
}

void setup() {
  Serial.begin(115200);
  BearSSL::X509List *serverTrustedCA = new BearSSL::X509List(ca_cert);
  espClient.setTrustAnchors(serverTrustedCA);
  setup_wifi();
  setClock(); // Required for X.509 validation
  client.setServer(mqtt_server, 8883);
  client.setCallback(callback);

  // sensors
  temperatureSensor.begin();
  Wire.begin();
  TSL2561.init();
  Serial.println("5 sekund ");
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
  checkWaterLevel();

  unsigned long currentMillis = millis();

    if (currentMillis - previousMillis >= 1000 * 60 * 5) {
        previousMillis = currentMillis;
        getSensorsData();
    }
}