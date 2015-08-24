
/*
 * Serve JSON to our AngularJS client
 */

exports.name = function (req, res) {
    var name = req.params.name;
    res.render('api/' + name);    
};