class DateSearch {
  constructor() {
    this.date = new Date();
    this.months = {
      Jan: ['January', '1'],
      Feb: ['February', '2'],
      Mar: ['March', '3'],
      Apr: ['April', '4'],
      May: ['May', '5'],
      Jun: ['June', '6'],
      Jul: ['July', '7'],
      Aug: ['August', '8'],
      Sep: ['September', '9'],
      Oct: ['October', '10'],
      Nov: ['November', '11'],
      Dec: ['December', '12'],
    };
  }
  getSearchArray() {
    const dateString = this.date.toDateString();
    const dateArray = dateString.split(' ');
    return dateArray;
  }
  getSearchDate() {
    const dateArray = this.getSearchArray();
    const day = dateArray[2];
    return `${dateArray[1]} ${day}`;
  }
  getModifiedSearchDate(index) {
    const dateArray = this.getSearchArray();
    const longMonthKey = dateArray[1];
    const day = dateArray[2];
    const monthArray = this.months[longMonthKey];
    const monthName = monthArray[index];
    return (index < 1) ? `${monthName} ${day}` : `${monthName}/${day}`;
  }
}

module.exports = DateSearch;
