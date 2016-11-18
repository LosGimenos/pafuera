const cheerio = require('cheerio');
const request = require('superagent');
const BrooklynVeganEventsDAO = require('../services/brooklynVeganEventsDAO');
const DateSearch = require('../services/timers/dateSearch');

class BrooklynVeganEventsController {
  static getAllOfCurrentUser(req, res) {
    BrooklynVeganEventsDAO.searchBy({ history_users_id: req.session.currentUser.id }).then((events) => {
      res.status(200).json(events);
    });
  }
  static getAllOfSelectedDay(req, res) {
    const date = new DateSearch();
    const searchDate = date.getSearchDate();
    BrooklynVeganEventsDAO.searchByLike({ start_date: `${searchDate}` }).then((events) => {
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
    BrooklynVeganEventsDAO.create(eventData)
                     .then((event) => res.status(200).json(event));
  }
  static delete(req, res) {
    BrooklynVeganEventsDAO.delete(req.params.id)
                    .then(() => res.status(204).end());
  }
  static scrape(req, response) {
    const eventArray = [];
    const searchUrl =
      'http://nyc-shows.brooklynvegan.com/events/today';
    const bkLogoImg =
      'http://brokelyn.wpengine.netdna-cdn.com/wp-content/uploads/2014/01/bk-logo.png';
    const baseUrl =
      'http://nyc-shows.brooklynvegan.com';

    request.get(searchUrl)
           .then((res) => {
             const $ = cheerio.load(res.text);

             // find date
             const date = new DateSearch();
             const startDate = date.getSearchDate();

             $('div.ds-listing', 'div#ds-events-list').each(function(i, e) {

              // find Location
               const findLocation = $('div.ds-venue-name', this).find('span').text();
               const location = findLocation.trim();

              // find address
               const address = $('div.ds-venue-name', this).find('meta','span').attr('content') || 'Check';
               const city = $('div.ds-venue-name', this).find('meta','span').next().attr('content') || 'Venue';

              // find title
               const title = $('span.ds-listing-event-title-text', this).text();

              // find imageURL
               const findImageURL = $('div.ds-cover-image', this).attr('style');
               const parseImageURL = findImageURL.replace(`background-image:url('`, '');
               const imageURL = parseImageURL.replace(`');`, '');

              // find eventUrl
               const findEventURL = $('a.ds-listing-event-title', this).attr('href');
               const eventURL = `${baseUrl}${findEventURL}`;

              // find start time
               const findStartTime = $('.ds-listing-details-container', this).find('div.dtstart').html();
               const startTime = findStartTime.trim();

               const eventInfo = {
                 source: 'Brooklyn Vegan',
                 cost: 'Undisclosed!',
                 startDate: startDate,
                 title: title,
                 eventURL: eventURL,
                 imgSrc: imageURL || bkLogoImg,
                 address: `${address}, ${city}`,
                 description: `${location}, @${startTime}`,
               };
               eventArray.push(eventInfo);
             });
             eventArray.forEach((eventItem) => {
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
               BrooklynVeganEventsDAO.create(eventData)
                         .then((event) => response.status(200).json(event));
             });
           })
         .catch((err) => {
          console.log(err);
         });
  }
}

module.exports = BrooklynVeganEventsController;

