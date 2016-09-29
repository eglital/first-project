'use strict'

var moment = require("moment");

module.exports = function(app) {
    app.get("/:id", function(req, res) {
        var date = req.params.id;
        var unix = null;
        var natural = null;
        
        //check for unix time
        if (+date >= 0) {
            unix = +date;
            natural = unixToNat(unix);
        }
        
        //check for natural time
        else if (isNaN(+date) && moment(date, "MMMM D, YYYY").isValid()) {
            unix = natToUnix(date);
            natural = unixToNat(unix);
        }
        
        var obj = { "unix": unix, "natural": natural };
        res.send(obj);
    })
    
    function unixToNat(unix) {
        //converts unix timestamp to natural date
        return moment.unix(unix).format("MMMM D, YYYY")
    }
    
    function natToUnix(nat) {
        //converts from natural date to unix
        return moment(nat, "MMMM D, YYYY").format("X")
    }
}