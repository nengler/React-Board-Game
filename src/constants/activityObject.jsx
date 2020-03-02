export class activityObject {
  constructor() {
    this.activityArray = [];
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
}
