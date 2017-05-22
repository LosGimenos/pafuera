const cheerio = require('cheerio');
const request = require('superagent');
const VillageVoiceEventsDAO = require('../services/villageVoiceEventsDAO');
const DateSearch = require('../services/timers/dateSearch');

class VillageVoiceEventsController {
  static getAllOfCurrentUser(req, res) {
    VillageVoiceEventsDAO.searchBy({ history_users_id: req.session.currentUser.id }).then((events) => {
      res.status(200).json(events);
    });
  }

  static getAllOfSelectedDay(req, res) {
    const date = new DateSearch();
    const searchDate = date.getSingleDigitDay();
    VillageVoiceEventsDAO.searchByLike({ start_date: `${searchDate}` }).then((events) => {
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
    const eventList = [];
    const baseUrl =
      'http://www.villagevoice.com';
    const queryUrl =
      '/datebook';
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
      fullQueryUrl = `${baseUrl}${queryUrl}`;
      readableDate = `${monthKey} ${getDayNum}: `;
    }

    getDate();

    request
      .get(fullQueryUrl)
      .then((res) => {
        let eventsArray = [];
        let wrapperArray = [];
        const $ = cheerio.load(res.text);

        const wrappers = $('div[class=c-CalendarDay__wrapper]');
        const dateStuff = $('div[class=c-Today]');
        const headers = $('h1[class=c-Today__abbrev]');
        const todayDate = $('h1[class=c-Today__date]');

        wrappers.each(function(index, wrapper) {
          wrapperArray[index] = $(wrapper);
        });

        const todaysWrapper = wrapperArray[0];

        $('.c-CalendarEach', todaysWrapper).each(function(index, event) {
          eventsArray[index] = $(event);
        });

        $(eventsArray).each(function(index, item) {
          const title = $('.c-Date__title', item).text();
          const eventURL = $('.c-Date__linkContainer a', item).attr('href');
          const description = $('div.c-Date__innerContainer p', item).text();
          let cost;
          let time;
          let location;

          $('.c-Date__metadata', item).each(function(index, subject) {
            const locationWrapper = $(subject).find('.c-Date__metadata__each')[0];
            const timeWrapper = $(subject).find('.c-Date__metadata__each')[1];
            const costWrapper = $(subject).find('.c-Date__metadata__each')[2];
            location = $(locationWrapper).text();
            time = $(timeWrapper).text();
            cost = $(costWrapper).text();
          });

          const eventInfo = {
            source: 'Village Voice',
            title: title,
            event_url: eventURL,
            cost: cost,
            address: location,
            start_date: `${readableDate}${time}`,
            description: description,
            img_src: 'http://socobk.com/wp-content/uploads/2014/07/villagevoice.png'
          }

          eventList.push(eventInfo);
          VillageVoiceEventsDAO.create(eventInfo);

          console.log(eventInfo);
        })

        return eventList;
      })
      .then((event) => response.status(200).json(event));
  };
};

module.exports = VillageVoiceEventsController;
