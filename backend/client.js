const mqtt = require('mqtt')
const client  = mqtt.connect('mqtt://test.mosquitto.org')

client.on('connect', function () {
  client.subscribe('yg', function (err) {
    if (!err) 
    {
      client.publish('yg', 'Hello mqtt')
      client.publish('yg', 'Hello mqtt1')
      client.publish('yg', 'Hello mqtt2')
    }
  })
})

console.log("Server sdsd is running at port 3000");