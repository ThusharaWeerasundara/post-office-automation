import sys
import paho.mqtt.client as mqtt
import time

def on_connect(mqttc, obj, flags, rc):
    print("rc: " + str(rc))


def on_message(mqttc, obj, msg):
    print(msg.topic + " " + str(msg.qos) + " " + str(msg.payload))


def on_publish(mqttc, obj, mid):
    print("mid: " + str(mid))


client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message
client.on_publish = on_publish

client.connect("broker.hivemq.com", 1883, 8000)
client.loop_start()

value = 0
mySensVals = ['14', '13', '11', '22', '23', '24', '27', '28', '29', '37', '42', '39']

myCostVals = ['140', '130', '110', '220', '230', '240', '270', '280', '290', '370', '420', '390']

i = 1
while i < 6:
    time.sleep(5)
    infot = client.publish("ygTest/weight", mySensVals[value], qos=2)
    infot = client.publish("ygTest/cost", myCostVals[value], qos=2)
    print(mySensVals[value])
    value = value + 1
    if(value == 12):
        value = 0
    infot.wait_for_publish()
      
