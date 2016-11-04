const db = require('../config/db');
const sql = require('../config/sqlProvider').brokelyn_events;
const BrokelynEvent = require('../models/BrokelynEvent');

class BrokelynEventsDAO {
  static create({
    source,
    cost,
    start_date,
    title,
    event_url,
    img_src,
    address,
    description,
    }) {
    return db.one(sql.create, [
      source,
      cost,
      start_date,
      title,
      event_url,
      img_src,
      address,
      description,
    ])
      .then((data) => new BrokelynEvent(data));
  }
  static delete(id) {
    return db.none(sql.delete, [id]);
  }
  static searchBy(keyValue) {
    const key = Object.keys(keyValue)[0];
    const value = keyValue[key];
    return db.map(sql.find, [key, value], (row) => new BrokelynEvent(row));
  }
  static searchByLike(keyValue) {
    const key = Object.keys(keyValue)[0];
    const value = keyValue[key];
    return db.map(sql.findByLike, [key, `%${value}%`], (row) => new BrokelynEvent(row));
  }
}

module.exports = BrokelynEventsDAO;

