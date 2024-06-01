const exphbs = require("express-handlebars");
const formatDate = require("../helpers/formatDate");

const hbs = exphbs.create({
  helpers: {
    increment: (value) => {
      return value + 1;
    },
    isEqual: (value1, value2, options) => {
      const isEqual =
        value1 === value2 ? options.fn(this) : options.inverse(this);

      return isEqual;
    },
    formatDate: formatDate,
  },
});

module.exports = hbs;
