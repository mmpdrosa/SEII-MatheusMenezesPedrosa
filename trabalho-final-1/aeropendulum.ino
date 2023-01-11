#define ENA_PIN 9

#define IN1_PIN 4 
#define IN2_PIN 3

#define POT_PIN 0

#define ADC_RESOLUTION 1023

#define SAMPLE_TIME 50

#define MAX_ANGLE 105

#define MAX_PWM_VALUE 255

unsigned long last_millis = millis();
int pot_value = 0, pot_value_angle = 0, input_angle = 0, input_pwm = 0, angle = 0;
float e_1 = 0, u_1 = 0;

int controller(float in, float out) {
  float e, u;
  e = in - out;
  u = u_1 + 0.60645*e - 0.491523*(e_1);

  if (u > MAX_ANGLE)
    u = MAX_ANGLE;
  else if (u < 0)
    u = 0;
  
  e_1 = e;
  u_1 = u;

  return int(u);
}

void setup() {
  Serial.begin(9600);
  Serial.setTimeout(1);

  pinMode(ENA_PIN, OUTPUT); 
  pinMode(IN1_PIN, OUTPUT);
  pinMode(IN2_PIN, OUTPUT);

  digitalWrite(ENA_PIN, LOW);
  digitalWrite(IN1_PIN, HIGH); 
  digitalWrite(IN2_PIN, LOW);
}

void loop() {

  if (millis() - last_millis > SAMPLE_TIME)
  {
    last_millis = millis();
    
    pot_value = analogRead(POT_PIN);
    pot_value_angle = (30*pot_value - 4740)/119.0;
    angle = controller(input_angle, pot_value_angle);
    input_pwm =  MAX_PWM_VALUE/MAX_ANGLE*angle;
    if (Serial.available() > 0) {
      input_angle = Serial.parseInt();
      if (input_angle > 90) 
        input_angle = 90;
    }

    analogWrite(ENA_PIN, input_pwm);

    Serial.println(String(String(pot_value_angle) + ", " + String(pot_value) + ", " + String(input_angle) + ", " + String(input_pwm)));
  }
}
