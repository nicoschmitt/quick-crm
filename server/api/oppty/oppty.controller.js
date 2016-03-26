(function(){
    
    var request = require("request");
    var crmapi = "https://" + process.env.CRM_TENANT + ".crm.dynamics.com/api/data/v8.0";
    
    module.exports.my = function(req, res) {
        var authtoken = req.headers.authorization.substr("Bearer ".length);
        var auth = { auth: { "bearer": authtoken } };
        
        var url = crmapi + "/opportunities?$top=20";
        console.log(url);
        
        request(url, auth, function(error, response, body) {
           if (error) {
               console.log("error");
               console.log(error);
               return res.status(500).send(error);
           } else if (response.statutCode != 200) {
               console.log(body);
               return res.status(response.statusCode).send(body);
           }
           
           res.json({status: "ok"}); 
        });
    };
    
}());
