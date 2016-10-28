const BrokelynEventsDAO = require('../services/brokelynEventsDAO');

class BrokelynEventsController {
  static getAllOfCurrentUser(req, res) {
    BrokelynEventsDAO.searchBy({ history_users_id: req.session.currentUser.id }).then((events) => {
      res.status(200).json(events);
    });
  }
  static create(req, res) {
    const eventData = {
      source: req.body.source,
      cost: req.body.cost,
      start_date: req.body.startDate,
      month: req.body.month,
      day: req.body.month,
      year: req.body.year,
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
 }

module.exports = BrokelynEventsController;
