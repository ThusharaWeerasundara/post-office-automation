const mqtt = require('mqtt')
const client  = mqtt.connect('mqtt://broker.hivemq.com')

client.on('connect', function () {
  client.subscribe('yg', function (err) {
    if (!err) 
    {
      console.log("mqtt works in server")
    }
  })
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
 
})
