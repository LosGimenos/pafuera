const request = require('superagent');
const express = require('express');
const cheerio = require('cheerio');
const SkintEventsDAO = require('../../services/skintEventsDAO');

class SkintScrape {
  constructor() {
    this.eventArray = [];
    this.baseUrl =
      'https://theskint.com/';
    this.skintLogo =
      'https://static1.squarespace.com/static/5235cb72e4b01ae2ba612744/53cd8dbbe4b0640068f72698/53cd90a3e4b0669c8d1d4df1/1406041899578/TheSkintLogo.jpg';
    this.dateTimeArray = [];
    this.isSponsored = false;

    this.getDateOrTime = this.getDateOrTime.bind(this);
  }

  getDateOrTime(dateTimeInfo) {
    this.dateTimeArray = [];
    for (let i = 0; i < dateTimeInfo.length; i++) {
            if (dateTimeInfo[i] !== ':') {
              this.dateTimeArray.push(dateTimeInfo[i]);
            } else {
              const dateTimeContent = this.dateTimeArray.join('');
              return dateTimeContent;
            }
           }
  }

  findPrice(text) {
    let price = [];
    const index = text.search(/[$]/);

    if (index !== -1) {
      price.push(text[index]);
      for (let i = 1; i < 3; i++) {
        let checkNumberIndex = index + i;
        let indexValue = text[checkNumberIndex];
        if (parseInt(indexValue))
        price.push(parseInt(indexValue))
      }
      return price.join('');
    } else {
      return 'Gratis!';
    }
  }

  makeRequest(response) {
    const requestDate = this.getDateOrTime;
    const requestPrice = this.findPrice;
    const eventArray = this.eventArray;
    const requestLogo = this.skintLogo;

    request
       .get(this.baseUrl)
       .then(res => {
         const $ = cheerio.load(res.text);

         let dateHeader =
           $('div#content').find('header').first().find('a').text();

         if (dateHeader.search('(SPONSORED)') > 0) {
          dateHeader = $('article', 'div#content').next().find('a').text();
          this.isSponsored = true;
         };

         // Get the date //
         const splitDateHeader = dateHeader.split('');
         const eventDate = this.getDateOrTime(splitDateHeader);

         // Get the other details //
         let events =
          $('article').first().find('.entry-content').children();
         if (this.isSponsored) {
            events = $('article').next().find('.entry-content').children()
         }
          events.each(function(index, entry) {
            const singleEvent = $(entry).text();
            const eventTime = requestDate(singleEvent);
            const description = singleEvent;
            const eventURL = $('a', entry).attr('href');
            const price = requestPrice(singleEvent);

          // Consolodate into Event Information object //
          const eventInfo = {
            source: 'The Skint',
            price: price,
            startDate: `${eventDate}, ${eventTime}`,
            description: description,
            eventURL: eventURL,
            imgSrc: requestLogo,
          };
          if (eventTime && eventTime.includes('/') !== true) {
              eventArray.push(eventInfo);
          };
         });
          eventArray.forEach((eventItem) => {
               const eventData = {
                 source: eventItem.source,
                 cost: eventItem.price,
                 start_date: eventItem.startDate,
                 title: eventItem.title,
                 event_url: eventItem.eventURL,
                 img_src: eventItem.imgSrc,
                 address: eventItem.address,
                 description: eventItem.description,
               };
               SkintEventsDAO.create(eventData)
           });
          return eventArray;
       })
       .then(event => response.json(event))
       .catch((err) => {
        console.log(err);
       })
  }
}

module.exports = SkintScrape;
