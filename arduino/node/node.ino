#include <HX711.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
#include <PubSubClient.h>

#define LED D4

#define calibration_factor 285.5 //This value is obtained using the SparkFun_HX711_Calibration sketch
#define LOADCELL_DOUT_PIN  D2
#define LOADCELL_SCK_PIN  D3
HX711 scale;

const char* SSID = "gayan";
const char* PWD = "12345678";

int state = 0;

// MQTT Broker
const char *mqtt_broker = "broker.hivemq.com";
const char *topic = "ygTest/weight";
const int mqtt_port = 1883;

WiFiClient espClient;
PubSubClient client(espClient);

//connect to the wifi
void connectToWiFi() 
{
  Serial.print("Connectiog");
 
  WiFi.begin(SSID, PWD);
  //Serial.println(SSID);
  while (WiFi.status() != WL_CONNECTED) 
  {
    Serial.print(".");
    delay(500);
  }
  Serial.print("\nConnected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());
  
}

void setupScale()
{
  Serial.println("HX711 scale initialization");

  scale.begin(LOADCELL_DOUT_PIN, LOADCELL_SCK_PIN);
  scale.set_scale(calibration_factor); //This value is obtained by using the SparkFun_HX711_Calibration sketch
  scale.tare(); //Assuming there is no weight on the scale at start up, reset the scale to 0

}

//handling the incomming message
void handleMessage(char *topic, byte *payload, unsigned int length) {
 Serial.print("Message arrived in topic: ");
 Serial.println(topic);
 Serial.print("Message:");
 for (int i = 0; i < length; i++) {
     Serial.print((char) payload[i]);
     
 }
 Serial.println();
 Serial.println("-----------------------");

 if(payload[0] == 111 &&  payload[1] == 110){//turn on LED
    digitalWrite(LED, HIGH);
  }
  else if(payload[0] == 111 && payload[1] == 102 && payload[2] == 102){//turn off LED
    digitalWrite(LED, LOW);
  }
 
 
}



void setup() 
{
  Serial.begin(9600);
  connectToWiFi();
  setupScale();
  pinMode(LED, OUTPUT);
  digitalWrite(LED, LOW);

 //connecting to a mqtt broker
 client.setServer(mqtt_broker, mqtt_port);
 client.setCallback(handleMessage);
 while (!client.connected()) 
 {
     String client_id = "esp32-client-";
     client_id += String(WiFi.macAddress());
     Serial.printf("The client %s connects to the public mqtt broker\n", client_id.c_str());
     if (client.connect(client_id.c_str())) 
     {
         Serial.println("Public emqx mqtt broker connected");
     } 
     else 
     {
         Serial.print("failed with state ");
         Serial.print(client.state());
         delay(2000);
     }

 }

 // publish and subscribe
 client.publish(topic, "111");
 //client.subscribe(topic);

}

void stateChange(int weight, bool verified)
{
  if(weight > 100 && verified)
  {
    state = 2;
  }
  else if(weight > 100 && !verified)
  {
    state = 1;
    Serial.println("Weight in state change: ");
    Serial.println(weight);
    client.publish(topic, String(weight).c_str());
  }
  else
  {
    state = 0;
  }
}

int measureWeight()
{
  return (int)scale.get_units();
}

void loop() 
{

 

  switch (state) 
  {

  case 1:
    // verify
    Serial.println("waiting for verify");
    break;
  case 2:
    // error
    Serial.println("Verification error");
    break;
  default:
    // measure weight
    int weight = measureWeight();
    Serial.println("Weight: ");
    Serial.println(weight);
    stateChange(weight, false);
    delay(5000);
    break;
}

 
}
