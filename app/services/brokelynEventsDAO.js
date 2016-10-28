const db = require('../config/db');
const sql = require('../config/sqlProvider').brokelynEvents;
const BrokelynEvent = require('../models/BrokelynEvent');

class BrokelynEventDAO {
  static create({ source,
                cost,
                start_date,
                month,
                day,
                year,
                title,
                event_url,
                img_src,
                address,
                description }) {
    return db.one(sql.create, [source,
                                cost,
                                start_date,
                                month,
                                day,
                                year,
                                title,
                                event_url,
                                img_src,
                                address,
                                description
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
}

module.exports = BrokelynEventDAO;

