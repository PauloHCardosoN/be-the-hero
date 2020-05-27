//Banco de Dados
const conn = require('../database/connections');

module.exports = {
    async login (req,res){
        //Pegar o ID da requisição
        const { id } = req.body;
        
        //Encontrar ONG
        const ong = await conn('ongs').where('id',id).select('*').first();

        //Se não tiver uma ONG
        if(!ong){
            return res.status(400).send({ erro:'Nenhuma ONG foi encontrada com esse ID' })
        };

        //Retornar a ong encontrada
        return res.header('Authorization', id).send({success: "Login realizado com sucesso",name: ong.name });
    }
}