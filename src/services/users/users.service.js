// Initializes the `users` service on path `/users`
const { UsersRequest, Users } = require('./users.class');
const data  = require('../../models/users.seed.json');
const createModel = require('../../models/users.model');
const hooks = require('./users.hooks');
const { ResponseFactory } = require('../../factory/response-factory');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };
  app.use('/users', new Users(options, app));

  app.use('/user', {
    async find(params) {
      const usersRequest = new UsersRequest();
      
      //check Params
      if (usersRequest.validParams(params.query)) {
        let objResponse = new ResponseFactory(400, 'Bad Request [Missing parameters (Name, Doc)] ', {});
        return objResponse;
      }
      
      const queryReturned = await usersRequest.getUsersByParams(app.service('users'), params.query['param']);
      let objResponse = new ResponseFactory(200, 'users loaded successfully ', queryReturned['data']);
      return objResponse.createResponseObj();
    }
  });
  
  const service = app.service('users');
  data.forEach( x => {
    setTimeout(() => {
      service.create(x);  
    }, 3000);
  });  
  service.hooks(hooks);
};
