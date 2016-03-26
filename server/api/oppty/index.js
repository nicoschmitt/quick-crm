(function(){
    
    var express = require('express');
    var router = express.Router();
    var passport = require("passport");

    var controller = require('./oppty.controller');
  
    router.get('/my', passport.authenticate('oauth-bearer', { session: false }), controller.my);
    // router.get('/:userid', controller.userwall);
    // router.post('/', ensureAuthenticated, controller.create);
    // router.delete('/:pin', ensureAuthenticated, controller.remove);

    module.exports = router;
    
}());
