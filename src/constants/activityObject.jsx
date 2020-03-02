export class activityObject {
  constructor(bigActivitiesArray) {
    this.activityArray = [];
    this.bigActivitiesArray = bigActivitiesArray;
    this.bigIndex = 0;
  }
  addToArrayXTimes(item, iterationAmount) {
    for (let i = 0; i < iterationAmount; i++) {
      this.activityArray.push(item);
    }
  }
  getActivity() {
    return this.activityArray[
      Math.floor(Math.random() * this.activityArray.length)
    ];
  }
  getBigActivity() {
    return this.bigActivitiesArray[this.bigIndex++];
  }
}
