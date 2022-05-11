const mqtt = require("mqtt");

var client = mqtt.connect("mqtt://broker.hivemq.com");



client.on("connect",function()

{

/*
    setInterval(function(){

        var random = Math.random()*5;

        console.log(random);

        if(random<30)

        {

            //client.publish("yg","temperature value: "+random.toString());

        }

    }),10000;

    var intervalID = setInterval(myCallback, 10000);

function myCallback(a, b)
{
 // Your code here
 // Parameters are purely optional.
 var random = (Math.ceil(Math.random()*5));
 console.log(random);
 client.publish("yg", random.toString());
}
*/

 var random = (Math.ceil(Math.random()*5));
 console.log(random);
 client.publish("yg", random.toString());


});