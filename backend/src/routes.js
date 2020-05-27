//Importar dependencias
const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');



//Definir rotas
const routes = express.Router();


//Fazer login
routes.post('/', celebrate({
    [Segments.BODY]: Joi.object({
        id: Joi.string().required()
    })
}),SessionController.login );


//Consultar ONG's
routes.get('/ongs', OngController.show );
//Cadastrar ONG
routes.post('/ongs',celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required().min(3),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().length(12),
        city: Joi.string().required().min(2),
        uf: Joi.string().required().length(2) 
    })
}) ,OngController.create );


//Consultar causas da ONG
routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}) , ProfileController.show );


//Consultar casos
routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}),IncidentController.show );
//Cadastrar caso
routes.post('/incidents', celebrate({
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().min(1).max(999).required()
    })
}),IncidentController.create );
//Deletar caso
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number()
    }),
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.required()
    }).unknown()
}),IncidentController.delete );


//Exportar routes
module.exports = routes;