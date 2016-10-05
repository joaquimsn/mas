module.exports = {
  'default': {
    build: function () {
      return {
        host: 'smtp-mail.outlook.com',
        port: 587,
        auth: {
            user: 'programador.programando@outlook.com',
            pass: 'piata46765000'
        },
        secure:false,
        tls: {rejectUnauthorized: false, requireTLS: false},
        debug: false
      };
    }
  },
  'naoresponder': {
    build: function () {
      return {
        host: 'smtp-mail.outlook.com',
        port: 587,
        auth: {
            user: 'programador.programando@outlook.com',
            pass: 'piata46765000'
        },
        secure:false,
        tls: {rejectUnauthorized: false, requireTLS: false},
        debug: false
      };
    }
  }
};