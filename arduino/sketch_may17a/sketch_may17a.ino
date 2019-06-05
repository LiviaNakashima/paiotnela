#include <DHT.h>
#include <DHT_U.h>

#include <Adafruit_Sensor.h>



 #include <Adafruit_Sensor.h>
#include "DHT.h"

#define DHTPIN A0
#define DHTTYPE DHT11   // DHT 11

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);


  dht.begin();
}

void loop() {
 
   float h = dht.readHumidity();

  float t = dht.readTemperature()*6;
  // DETALHE PORQUE TA MULTIPLICANDO POR DOIS
  float f = dht.readTemperature(true);

  float hif = dht.computeHeatIndex(f, h);

  float hic = dht.computeHeatIndex(t, h, false);

//  Serial.print(F("Humidity: "));
  Serial.print(t);
  Serial.print(",");
  Serial.println(h);
 delay(10000);

}
