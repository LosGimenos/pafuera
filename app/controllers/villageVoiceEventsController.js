const cheerio = require('cheerio');
const request = require('superagent');
const VillageVoiceEventsDAO = require('../services/villageVoiceEventsDAO');

class VillageVoiceEventsController {
  static getAllOfCurrentUser(req, res) {
    VillageVoiceEventsDAO.searchBy({ history_users_id: req.session.currentUser.id }).then((events) => {
      res.status(200).json(events);
    });
  }
  static getAllOfSelectedDay(req, res) {
    VillageVoiceEventsDAO.searchByLike({ start_date: 'Nov 10' }).then((events) => {
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
    VillageVoiceEventsDAO.create(eventData)
                     .then((event) => res.status(200).json(event));
  }
  static delete(req, res) {
    VillageVoiceEventsDAO.delete(req.params.id)
                    .then(() => res.status(204).end());
  }
  static scrape(req, response) {
    const eventArray = [];
    const testUrl =
      'http://www.villagevoice.com/calendar?dateRange[]=2016-11-06';
    const baseUrl =
      'http://www.villagevoice.com';
    const queryUrl =
      '/calendar?dateRange[]=';
    const bkLogoImg =
      'http://brokelyn.wpengine.netdna-cdn.com/wp-content/uploads/2014/01/bk-logo.png';
    let dateUrl;
    let readableDate;
    let fullQueryUrl;


    function parseItem(item) {
      return item.trim();
    }

    function getDate() {
      const months = [  {'Jan': '1'}, {'Feb': '2'}, {'Mar':'3'},
                        {'Apr':'4'}, {'May':'5'}, {'Jun':'6'},
                        {'Jul': '7'}, {'Aug': '8'}, {'Sep':'9'},
                        {'Oct': '10'}, {'Nov': '11'}, {'Dec':'12'}
                     ];
      const todayDate = new Date();
      const getYear = todayDate.getFullYear();
      const getDayNum = todayDate.getDate();
      const getMonth = todayDate.getMonth();
      const monthObject = months[getMonth];
      const monthKey = Object.keys(monthObject);
      const cleanMonth = monthObject[monthKey];

      dateUrl = `${getYear}-${cleanMonth}-${getDayNum}`;
      fullQueryUrl = `${baseUrl}${queryUrl}${dateUrl}`;
      readableDate = `${monthKey} ${getDayNum}: `;
    }

    getDate();

    request.get(fullQueryUrl)
           .then((res) => {
             const $ = cheerio.load(res.text);

             $('li[class=recommended]').each(function(index, event) {
               const findTitle = $('div.grid', this).find('div.title').text();
               const parseTitle = parseItem(findTitle);

               const timeLocation = $('div.grid', this).find('div.location').text();
               const parseTimeLocation = parseItem(timeLocation);

               const address = $('div.grid', this).find('div.address').text();
               const parseAddress = parseItem(address);

               const eventURL = $('div.grid', this).find('a', 'div.title').attr('href');
               const parseEventURL = `${baseUrl}${eventURL}`;

               const imgSrc = $('div.img-box', this).find('img', 'a').attr('src');

               const price = $(this).find('div.tix').text();
               const parsePrice = parseItem(price);

               const eventInfo = {
                 source: 'Village Voice',
                 cost: parsePrice || 'Gratis!',
                 startDate: `${readableDate}${parseTimeLocation}`,
                 title: parseTitle,
                 eventURL: parseEventURL,
                 imgSrc: imgSrc || bkLogoImg,
                 address: parseAddress,
                 description: 'Check event for more info',
               };
               eventArray.push(eventInfo);
             });
             eventArray.forEach((eventItem) => {
               console.log(eventItem);
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
               VillageVoiceEventsDAO.create(eventData)
                       .then((event) => response.status(200).json(event));
             });
           })
           .catch((err) => {
            console.log(err);
           });
  }
}

module.exports = VillageVoiceEventsController;

