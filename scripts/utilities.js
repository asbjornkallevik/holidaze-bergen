// Helper methods
export const utilities = {
  addLeadingZero: (num) => {
    num = num < 10 ? "0" + num : num;
    return num;
  },
  getTimeStamp: (time) => {
    const date = new Date(time);

    let year = date.getFullYear();
    let month = utilities.addLeadingZero(date.getMonth() + 1);
    let day = utilities.addLeadingZero(date.getDate());

    let hours = utilities.addLeadingZero(date.getHours());
    let minutes = utilities.addLeadingZero(date.getMinutes());

    const dateStamp = `${year}-${month}-${day}`;
    const timeStamp = `${hours}:${minutes}`;

    return {
      dateStamp,
      timeStamp,
    };
  },
};
