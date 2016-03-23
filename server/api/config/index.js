(function(){

    var express = require('express');
    var router = express.Router();
    
    var getConfig = function(req, res) {
      res.json({ 
          adalAppId: process.env.MS_APP_ID,
          o365tenant: process.env.O365_TENANT,
          crmtenant: process.env.CRM_TENANT
      });
    };
    
    router.get('/', getConfig);
    
    module.exports = router;
    
}());
