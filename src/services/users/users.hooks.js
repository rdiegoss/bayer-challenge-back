
const associationHook = (context) => {
  const AdressModel = context.app.services.address.Model;

  context.params.sequelize = {
      include: [{ model: AdressModel }]
  }
}

module.exports = {
  before: {
    all: [],
    find: [associationHook],
    get: [],
    patch: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
