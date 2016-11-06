class VillageVoiceEvent {
  constructor({ source,
                cost,
                start_date,
                title,
                event_url,
                img_src,
                address,
                description,
              }) {
    this.source = source;
    this.cost = cost;
    this.startDate = start_date;
    this.title = title;
    this.eventURL = event_url;
    this.imgSrc = img_src;
    this.address = address;
    this.description = description;
  }
}

module.exports = VillageVoiceEvent;
