import qwiic_bme280
import time
import sys
import requests

def runExample():
    
    print("Starting sensor...")
    mySensor = qwiic_bme280.QwiicBme280()
    
    if mySensor.is_connected() == False:
       print("The Qwiic BME280 device isn't connected to the system. Please check your connection", \
           file=sys.stderr)
       return
       
    mySensor.begin()
    
    
    #Converts pressure from Pascals to Millibars
    pressurePaTomB = mySensor.pressure / 100
    
    readings = {'temp':mySensor.temperature_celsius,
                'humidity':mySensor.humidity,
                'pressure':pressurePaTomB,
                'location':'bedroom'}
    
    print(readings)
    
    postURL = "http://localhost:3000/readings"
    jsonHeader = {"content-type":"application/json"}
    
    while True:
       request = requests.post(postURL, headers=jsonHeader, json=readings)
       print(request.status_code)
       time.sleep(5)
       
       
runExample()