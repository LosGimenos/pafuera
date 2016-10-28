class BrokelynEvent {
  constructor({ source,
                cost,
                start_date,
                month,
                day,
                year,
                title,
                event_url,
                img_src,
                address,
                description,
              }) {
    this.source = source;
    this.cost = cost;
    this.startDate = start_date;
    this.month = month;
    this.day = day;
    this.year = year;
    this.title = title;
    this.eventURL = event_url;
    this.imgSrc = img_src;
    this.address = address;
    this.description = description;
  }
}

module.exports = BrokelynEvent;
