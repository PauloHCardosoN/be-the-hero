//Importando dependencias
const crypto = require('crypto');
const conn = require('../database/connections');

module.exports ={
    //Cadastrar uma ONG
    async create(req, res){
        //Desestruturar requisição
        const { 
            name,
            email,
            whatsapp,
            city,
            uf 
        } = req.body;

        //Criar id
        const id = crypto.randomBytes(6).toString('HEX');

        //Inserir dados
        await conn('ongs').insert({
            id,
            name,
            email,
            whatsapp: '+'+ whatsapp,
            city,
            uf
        });

        //Retornar mensagem com o id da ONG
        return res.send({ 
            message: `Parabéns, sua ONG foi cadastra com sucesso, seu id é`,
            id: id
        });
    },

    //Mostrar todas as ONG's
    async show(req, res){
        //Selecionar todas as ONG'S
        const ongs = await conn('ongs').select("name","email","whatsapp","city","uf");

        //Retornar ONG's
        return res.send(ongs);
    }
}