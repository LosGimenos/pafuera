const db = require('../config/db');
const sql = require('../config/sqlProvider').skintEvents;
const SkintEvent = require('../models/SkintEvent');

class SkintEventsDAO {
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
      .then((data) => new SkintEvent(data));
  }
  static delete(id) {
    return db.none(sql.delete, [id]);
  }
  static searchBy(keyValue) {
    const key = Object.keys(keyValue)[0];
    const value = keyValue[key];
    return db.map(sql.find, [key, value], (row) => new SkintEvent(row));
  }
  static searchByLike(keyValue) {
    const key = Object.keys(keyValue)[0];
    const value = keyValue[key];
    return db.map(sql.findByLike, [key, `%${value}%`], (row) => new SkintEvent(row));
  }
}

module.exports = SkintEventsDAO;


