const moment = require("moment");

function formatDate(dateString) {
  return moment(dateString).format("DD MMMM YYYY HH:mm:ss a");
}

module.exports = formatDate;
