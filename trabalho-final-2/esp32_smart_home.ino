#include <WiFi.h>
#include <Firebase_ESP_Client.h>

#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"

#define PWM_FREQUENCY 1000
#define PWM_RESOLUTION 10

/* ROOM TYPES AVAILABLE: BEDROOM, KITCHEN, LIVING ROOM, OFFICE */

#define BEDROOM_1 0
#define KITCHEN_1 1
#define LIVING_ROOM_1 2
#define OFFICE_1 3

/* ROOMS PWM CHANNELS */

#define BEDROOM_1_PWM_CHANNEL 0
#define KITCHEN_1_PWM_CHANNEL 1
#define LIVING_ROOM_1_PWM_CHANNEL 2
#define OFFICE_1_PWM_CHANNEL 3

/* ROOMS LIGHTS */

#define BEDROOM_1_LIGHT_1_PIN 17
#define KITCHEN_1_LIGHT_1_PIN 4
#define LIVING_ROOM_1_LIGHT_1_PIN 16
#define OFFICE_1_LIGHT_1_PIN 18

/* ROOMS SOCKETS */

#define BEDROOM_1_SOCKET_1_PIN 22
#define KITCHEN_1_SOCKET_1_PIN 19
#define LIVING_ROOM_1_SOCKET_1_PIN 21
#define OFFICE_1_SOCKET_1_PIN 23

/* ROOMS SENSORS */

#define BEDROOM_1_TEMPERATURE_SENSOR_PIN 39
#define OFFICE_1_TEMPERATURE_SENSOR_PIN 32

void initWifi();

const char* wifi_ssid = "";
const char* wifi_password = "";

void initFirebase();

const char* api_key = "";
const char* database_url = "";

const char* user_email = "";
const char* user_password = "";

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

bool isUserAuthenticate = false;

String uid;
String userRoomsBasePath;

int pwm_duty = 0;
float sensorValue = 0;

unsigned long elapsed_millis = 0;

int percentageToBit(int percentage);

void updateRoomLight(int roomIndex, int lightIndex, int pwmChannel);
void updateRoomSocket(int roomIndex, int socketIndex, int socketPin);

void setupBedroom_1();
void updateBedroom_1();
void setupKitchen_1();
void updateKitchen_1();
void setupLivingRoom_1();
void updateLivingRoom_1();
void setupOffice_1();
void updateOffice_1();

void setup()
{
  Serial.begin(115200);

  Serial.println("[APP] INIT");

  initWifi();
  initFirebase();  

  setupBedroom_1();
  setupKitchen_1();
  setupLivingRoom_1();
  setupOffice_1();
}

void loop()
{
  if (!isUserAuthenticate) return;

  if (!Firebase.ready()) return;

  if (Firebase.isTokenExpired()){
    Firebase.refreshToken(&config);
    Serial.println("[FIREBASE] TOKEN REFRESHED");
  }

  if (millis() - elapsed_millis > 100) {
    elapsed_millis = millis();

    updateBedroom_1();
    updateKitchen_1();
    updateLivingRoom_1();
    updateOffice_1();
  }
}

void initWifi()
{
  WiFi.begin(wifi_ssid, wifi_password);
  Serial.print("[WI-FI] CONNECTING");

  while (WiFi.status() != WL_CONNECTED) {
    Serial.print('.');
    delay(1000);
  }

  Serial.println();
  Serial.print("[WI-FI] IP ADRESS: ");
  Serial.println(WiFi.localIP());
  Serial.println();
}

void initFirebase()
{
  config.api_key = api_key;
  config.database_url = database_url;

  auth.user.email = user_email;
  auth.user.password = user_password;

  Firebase.reconnectWiFi(true);

  config.token_status_callback = tokenStatusCallback;

  Serial.println("[FIREBASE]");

  Firebase.begin(&config, &auth);

  Serial.println("[FIREBASE] GETTING USER UID");
  while (auth.token.uid == "") {
    Serial.print('.');
    delay(1000);
  }

  isUserAuthenticate = true;

  uid = auth.token.uid.c_str();
  Serial.print("[FIREBASE] USER UID: ");
  Serial.print(uid);
  Serial.println();

  userRoomsBasePath = "/users/" + uid + "/rooms";
}

void setupBedroom_1()
{
  ledcSetup(BEDROOM_1_PWM_CHANNEL, PWM_FREQUENCY, PWM_RESOLUTION);
  ledcAttachPin(BEDROOM_1_LIGHT_1_PIN, BEDROOM_1_PWM_CHANNEL);

  pinMode(BEDROOM_1_SOCKET_1_PIN, OUTPUT);
}

void setupKitchen_1()
{
  ledcSetup(KITCHEN_1_PWM_CHANNEL, PWM_FREQUENCY, PWM_RESOLUTION);
  ledcAttachPin(KITCHEN_1_LIGHT_1_PIN, KITCHEN_1_PWM_CHANNEL);

  pinMode(KITCHEN_1_SOCKET_1_PIN, OUTPUT);
}

void setupLivingRoom_1()
{
  ledcSetup(LIVING_ROOM_1_PWM_CHANNEL, PWM_FREQUENCY, PWM_RESOLUTION);
  ledcAttachPin(LIVING_ROOM_1_LIGHT_1_PIN, LIVING_ROOM_1_PWM_CHANNEL);

  pinMode(LIVING_ROOM_1_SOCKET_1_PIN, OUTPUT);
}

void setupOffice_1()
{
  ledcSetup(OFFICE_1_PWM_CHANNEL, PWM_FREQUENCY, PWM_RESOLUTION);
  ledcAttachPin(OFFICE_1_LIGHT_1_PIN, OFFICE_1_PWM_CHANNEL);

  pinMode(OFFICE_1_SOCKET_1_PIN, OUTPUT);
}

void updateBedroom_1()
{
  updateRoomLight(BEDROOM_1, 0, BEDROOM_1_PWM_CHANNEL);
  updateRoomSocket(BEDROOM_1, 1, BEDROOM_1_SOCKET_1_PIN);

  sensorValue = analogRead(BEDROOM_1_TEMPERATURE_SENSOR_PIN)/50.0;

  if (!Firebase.RTDB.setFloat(&fbdo, String(userRoomsBasePath + "/" + BEDROOM_1 + "/sensors/0/value"), sensorValue))
    Serial.println("[FIREBASE] FAILED ON SETTING BEDROOM 1 TEMPERATURE VALUE");
}

void updateKitchen_1()
{
  updateRoomLight(KITCHEN_1, 0, KITCHEN_1_PWM_CHANNEL);
  updateRoomSocket(KITCHEN_1, 1, KITCHEN_1_SOCKET_1_PIN);
}

void updateLivingRoom_1()
{
  updateRoomLight(LIVING_ROOM_1, 0, LIVING_ROOM_1_PWM_CHANNEL);
  updateRoomSocket(LIVING_ROOM_1, 1, LIVING_ROOM_1_SOCKET_1_PIN);
}

void updateOffice_1()
{
  updateRoomLight(OFFICE_1, 0, OFFICE_1_PWM_CHANNEL);
  updateRoomSocket(OFFICE_1, 1, OFFICE_1_SOCKET_1_PIN);

  sensorValue = analogRead(OFFICE_1_TEMPERATURE_SENSOR_PIN)/50.0;

  if (!Firebase.RTDB.setFloat(&fbdo, String(userRoomsBasePath + "/" + OFFICE_1 + "/sensors/0/value"), sensorValue))
    Serial.println("[FIREBASE] FAILED ON SETTING OFFICE 1 TEMPERATURE VALUE");
}

void updateRoomLight(int roomIndex, int lightIndex, int pwmChannel)
{
  if (Firebase.RTDB.getInt(&fbdo, String(userRoomsBasePath + "/" + roomIndex + "/devices/" + lightIndex + "/value"))) {
    pwm_duty = percentageToBit(fbdo.to<int>());
    ledcWrite(pwmChannel, pwm_duty);
  } else {
    Serial.println("[FIREBASE] ERROR: " + fbdo.errorReason());
  }
}

void updateRoomSocket(int roomIndex, int socketIndex, int socketPin)
{
  if (Firebase.RTDB.getInt(&fbdo, String(userRoomsBasePath + "/" + roomIndex + "/devices/" + socketIndex + "/value"))) {
    digitalWrite(socketPin, fbdo.to<bool>());
  } else {
    Serial.println("[FIREBASE] ERROR: " + fbdo.errorReason());
  }
}

int percentageToBit(int percentage)
{
  return percentage*(pow(2, PWM_RESOLUTION) - 1)/100.0;
}
