const request = require('superagent'),
      express = require('express'),
      cheerio = require('cheerio');

const urls = [];
const baseUrl =
  'http://brokelyn.com/events/list/?action=tribe_list&tribe_paged=1&tribe_event_display=list'
const bkLogoImg =
  'http://brokelyn.wpengine.netdna-cdn.com/wp-content/uploads/2014/01/bk-logo.png'

const brokelynFetch = request.get(baseUrl)
       .then((res) => {
         const $ = cheerio.load(res.text);
         $('.tribe-events-loop').children().each((inx, article) => {
           const cost = $('.tribe-events-event-cost', article).children().text();
           const startDate = $('.vcard', article).find('.dtstart').text();
           const streetAddress = $('.vcard', article).find('span.street-address').text();
           const city = $('.vcard', article).find('span.locality').text();
           const zip = $('.vcard', article).find('span.postal-code').text();
           const eventURL = $('a<h2', article).children().attr('href');
           const title = $('a<h2', article).children().attr('title');
           const imgSrc = $('div.tribe-events-event-image', article).find('img').attr('data-lazy-src');
           const description = $('.description', article).find('p').text();


           const eventInfo = {
                                source: 'Brokelyn',
                                cost: cost || 'Gratis!',
                                startDate: startDate,
                                title: title,
                                eventURL: eventURL,
                                imgSrc: imgSrc || bkLogoImg,
                                address: `${streetAddress}, ${city}, ${zip}`,
                                description: description,
                             };
           urls.push(eventInfo);
         });
         console.log(urls);
       })
       .catch((err) => {
        console.log(err);
       });

module.exports = brokelynFetch;

