(function(){
    
    var register = function(app) {
        app.use('/api/config', require('./api/config'));        
        app.use('/api/oppty', require('./api/oppty'));
    };

    module.exports.register = register;

}());