if (process.env.NODE_ENV === 'test') {
    module.exports = {
      JWT_SECRET: 'iBookitAppUserAuthentication',
      oauth: {
        google: {
          clientID: '205388889160-lkm9q0500ra1etqh52g2o8t6stvugejm.apps.googleusercontent.com',
          clientSecret: 'X0JbWydFDuj4br4ujOtQi2yB',
        },
        facebook: {
          clientID: '1270566513096409',
          clientSecret: '5396be21a79fc10ea0db24bbd302a412',
        },
      },
    };
  } else {
    module.exports = {
      JWT_SECRET: 'iBookitAppUserAuthentication',
      oauth: {
        google: {
          clientID: 'number',
          clientSecret: 'string',
        },
        facebook: {
          clientID: 'number',
          clientSecret: 'string',
        },
      },
    };
  }