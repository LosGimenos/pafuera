# Pa'Fuera!

![Pa'Fuera](https://github.com/LosGimenos/LosGimenos.github.io/blob/master/images/Screen%20Shot%202016-12-20%20at%201.56.31%20PM.png?raw=true) 

### NYC Events Blog Aggregator with consummable Api. 
#### Made with Node, Express, React, Postgresql, Cheerio.

Why is it that when your people come to visit NYC they always want to do things? My sister came over during Halloween weekend and I was in a scramble trying to find something to keep them occupied. I started going through my workflow of checking the various blogs I follow, suddenly wishing there was a way to have them all collected together...

Using Cheerio and and postgresql database I was able to take event information and format it a bit to make it consummable by other clients (An Alexa skill will be available shortly). More formatting will certainly be necessary as the information is rarely uniform. 

---

### API ENDPOINTS.
All endpoints will currently respond with event information for the current day. Event objects will include (as best as was included in the original source) SOURCE, TITLE, COST, DESCRIPTION, LOCATION, EVENT URL, and IMG URL.

#### BROKELYN
https://pafuera.herokuapp.com/brokelynEvents

#### VILLAGE VOICE
https://pafuera.herokuapp.com/villageVoiceEvents

#### BROOKLYN VEGAN
https://pafuera.herokuapp.com/brooklynVeganEvents

#### THE SKINT
https://pafuera.herokuapp.com/skintEvents

