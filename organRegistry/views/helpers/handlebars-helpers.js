module.exports = function(hbs) {
    hbs.handlebars.registerHelper('formatDate', function(date) {
      let dd = String(date.getDate()).padStart(2, '0');
      let mm = String(date.getMonth() + 1).padStart(2, '0');
      let yyyy = date.getFullYear();
  
      return `${mm}/${dd}/${yyyy}`;
    });
  
    hbs.handlebars.registerHelper('formatYN', function(bool) {
      return bool === true ? "Yes" : "No";
    });
  
  };
  