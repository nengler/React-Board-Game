export class activityObject {
  constructor(bigActivitiesArray) {
    this.activityArray = [];
    this.activityIndex = 0;
    this.bigActivitiesArray = bigActivitiesArray;
    this.bigIndex = 0;
  }
  addToArrayXTimes(item, iterationAmount) {
    for (let i = 0; i < iterationAmount; i++) {
      this.activityArray.push(item);
    }
  }
  getActivity() {
    console.log(this.activityIndex);
    return this.activityArray[this.activityIndex++];
  }
  getBigActivity() {
    return this.bigActivitiesArray[this.bigIndex++];
  }
  resetActivitiesIndex() {
    this.activityIndex = 0;
  }
}
