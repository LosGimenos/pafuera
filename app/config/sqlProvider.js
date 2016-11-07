const QueryFile = require('pg-promise').QueryFile;
const path = require('path');

function sql(file) {
  const fullPath = path.join(__dirname, file);
  return new QueryFile(fullPath, { minify: true });
}

const sqlProvider = {
  users: {
    all: sql('./sql/user/all.sql'),
    find: sql('./sql/user/find.sql'),
    create: sql('./sql/user/create.sql'),
    delete: sql('./sql/user/delete.sql'),
  },
  brokelyn_events: {
    all: sql('./sql/brokelynEvent/all.sql'),
    find: sql('./sql/brokelynEvent/find.sql'),
    findByLike: sql('./sql/brokelynEvent/find_by_like.sql'),
    create: sql('./sql/brokelynEvent/create.sql'),
    delete: sql('./sql/brokelynEvent/delete.sql'),
  },
  villageVoiceEvents: {
    all: sql('./sql/villageVoiceEvent/all.sql'),
    find: sql('./sql/villageVoiceEvent/find.sql'),
    findByLike: sql('./sql/villageVoiceEvent/find_by_like.sql'),
    create: sql('./sql/villageVoiceEvent/create.sql'),
    delete: sql('./sql/villageVoiceEvent/delete.sql'),
  },
  brooklynVeganEvents: {
    all: sql('./sql/brooklynVeganEvent/all.sql'),
    find: sql('./sql/brooklynVeganEvent/find.sql'),
    findByLike: sql('./sql/brooklynVeganEvent/find_by_like.sql'),
    create: sql('./sql/brooklynVeganEvent/create.sql'),
    delete: sql('./sql/brooklynVeganEvent/delete.sql'),
  },
  skintEvents: {
    all: sql('./sql/skintEvent/all.sql'),
    find: sql('./sql/skintEvent/find.sql'),
    findByLike: sql('./sql/skintEvent/find_by_like.sql'),
    create: sql('./sql/skintEvent/create.sql'),
    delete: sql('./sql/skintEvent/delete.sql'),
  },
};

module.exports = sqlProvider;
