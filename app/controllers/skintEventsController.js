const cheerio = require('cheerio');
const request = require('superagent');
const SkintScrape = require('./scrapers/skintScrape');
const SkintEventsDAO = require('../services/skintEventsDAO');

class SkintEventsController {
  static getAllOfCurrentUser(req, res) {
    SkintEventsDAO.searchBy({ history_users_id: req.session.currentUser.id }).then((events) => {
      res.status(200).json(events);
    });
  }
  static getAllOfSelectedDay(req, res) {
    SkintEventsDAO.searchByLike({ start_date: '11' }).then((events) => {
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
    SkintEventsDAO.create(eventData)
                     .then((event) => res.status(200).json(event));
  }
  static delete(req, res) {
    SkintEventsDAO.delete(req.params.id)
                    .then(() => res.status(204).end());
  }
  static scrape(req, res) {
    const skintScrape = new SkintScrape();
    skintScrape.makeRequest();
  }
}

module.exports = SkintEventsController;

