const { Service } = require('feathers-sequelize');

exports.UsersRequest = class UsersRequest {
  
  async getUsersByParams(service, params) { 
    const queryReturned = service.find({
      query: {
        $or: [
          {'name': {$like: `%${params.toUpperCase()}%`}},
          {'documentNumber': {$like: `%${params}%`}},
        ]
      }
    });

    return await queryReturned.then();
  }

  validParams(value) {
    if (!value.param) {
      return 'Parameter Doc or Name missing';
    }
  }

};

exports.Users = class Users extends Service {
  create ( data, params ) {
    const { name, documentNumber, documentType, addressId } = data;
        
    const userData = {
      name,
      documentNumber,
      documentType,
      addressId
    };
    
    // Call the original `create` method with existing `params` and new data
    return super.create(userData, params);
  }
};
