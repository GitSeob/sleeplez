import md5 from "md5";

class Record {
  constructor(date, coffee, exerTime, lastEat) {
    this.date = date;
    this.id = md5("record:" + date);
    this.sleepStates = [];
    this.score = 0;
    this.wkRate = 0;
    this.shRate = 0;
    this.dpRate = 0;
    this.sleepTime = 0;
    this.wakeTime = 0;
    this.coffee = coffee;
    this.exerTime = exerTime;
    this.lastEat = lastEat;
  }

  setFromObject(ob) {
    this.date = ob.date;
    this.id = ob.id;
    this.sleepStates = ob.sleepStates;
    this.score = ob.score;
    this.wkRate = ob.wkRate;
    this.shRate = ob.shRate;
    this.dpRate = ob.dpRate;
    this.sleepTime = ob.sleepTime;
    this.wakeTime = ob.wakeTime;
    this.coffee = ob.coffee;
    this.exerTime = ob.exerTime;
    this.lastEat = ob.lastEat;
  }

  static fromObject(ob) {
    let r = new Record(ob.date,ob.sleepTime,ob.wakeTime,ob.coffee,ob.exerTime,ob.lastEat);
    r.setFromObject(ob);
    return r;
  }

  addSleepState(sleepState) {
    this.sleepStates = this.sleepStates.concat(sleepState);
  }
}

export default Record;