// SYSTEM_MODE(MANUAL);
int FORCE = A0;

int fvalue;

void setup()
{
  pinMode(FORCE, INPUT);
  Particle.variable("force_level", &fvalue, INT);
}

void loop()
{
   fvalue = analogRead(FORCE);
}
