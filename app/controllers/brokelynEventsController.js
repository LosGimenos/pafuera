const cheerio = require('cheerio');
const request = require('superagent');
const BrokelynEventsDAO = require('../services/brokelynEventsDAO');
const DateSearch = require('../services/timers/dateSearch');

class BrokelynEventsController {
  static getAllOfCurrentUser(req, res) {
    BrokelynEventsDAO.searchBy({ history_users_id: req.session.currentUser.id }).then((events) => {
      res.status(200).json(events);
    });
  }
  static getAllOfSelectedDay(req, res) {
    const date = new DateSearch();
    const searchDate = date.getModifiedSearchDate(0);
    BrokelynEventsDAO.searchByLike({ start_date: `${searchDate}` }).then((events) => {
      res.status(200).json(events);
    });
  }
  static create(req, res) {
    const eventData = {
      source: req.body.source,
      cost: req.body.cost,
      start_date: req.body.startDate,
      title: req.body.title,
      event_url: req.body.eventURL,
      img_src: req.body.imgSrc,
      address: req.body.address,
      description: req.body.description,
    };
    BrokelynEventsDAO.create(eventData)
                     .then((event) => res.status(200).json(event));
  }
  static delete(req, res) {
    BrokelynEventsDAO.delete(req.params.id)
                    .then(() => res.status(204).end());
  }
  static scrape(req, response) {
    const eventArray = [];
    const baseUrl =
      'http://brokelyn.com/events/list/?action=tribe_list&tribe_paged=1&tribe_event_display=list';
    const bkLogoImg =
      'http://brokelyn.wpengine.netdna-cdn.com/wp-content/uploads/2014/01/bk-logo.png';

    request.get(baseUrl)
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
               eventArray.push(eventInfo);
             });
             eventArray.forEach((eventItem) => {
               if (eventItem !== eventArray[0]) {
                 const eventData = {
                   source: eventItem.source,
                   cost: eventItem.cost,
                   start_date: eventItem.startDate,
                   title: eventItem.title,
                   event_url: eventItem.eventURL,
                   img_src: eventItem.imgSrc,
                   address: eventItem.address,
                   description: eventItem.description,
                 };
                 BrokelynEventsDAO.create(eventData)
                         .then((event) => response.status(200).json(event));
               }
             });
           })
           .catch((err) => {
            console.log(err);
           });
  }
}

module.exports = BrokelynEventsController;
