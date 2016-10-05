(function () {
  'use strict';

  function sendEmail (req, res) {
    var nodemailer          = require('nodemailer'),
        path                = require('path'),
        EmailTemplate       = require('email-templates').EmailTemplate,
        TEMPLATES_FOLDER    = 'templates',
        templatesDir        = path.resolve(__dirname, '..', TEMPLATES_FOLDER),
        config              = req.body.config,
        templateName        = req.body.templateName,
        templateParams      = req.body.templateParams,
        to                  = req.body.to,
        attachments         = req.body.attachments,
        subject             = req.body.subject,
        transporterBuilder  = require('./../../config/transporter')[config],
        template            = new EmailTemplate(path.join(templatesDir, templateName)),
        transporter,
        mailOptions;
    if (!transporterBuilder) {
      res.status(400);
      res.json({message: "Configuração de email inválida"});
    }

    if (!template) {
      res.status(400);
      res.json({message: "O template " + templateName + " não foi encontrado"});
    }

    transporter = nodemailer.createTransport(transporterBuilder.build());

    template.render(templateParams, function (err, results) {
      if (err) {
        return console.log(err);
      }

      mailOptions = {
        from:     'MAS <programador.programando@outlook.com>',
        to:       to,
        subject:  subject,
        html:     results.html,
        style:    results.style
      };

      if (attachments) {
        mailOptions.attachments = attachments;
      }

      transporter.sendMail(mailOptions, function (err, data){
        var json = {};
        if (err) {
          console.log(err);
          json.message = "Houve um erro ao enviar o e-mail";
          json.error   = err;
          res.status(500);
        } else {
          json.message = "Email enviado com sucesso";
          res.status(200);
        }
        res.json(json);
      });
    });
  }

  var service = {
    sendEmail: sendEmail
  };

  module.exports = service;
}());