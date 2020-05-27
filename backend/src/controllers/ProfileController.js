//Banco de Dados
const conn = require('../database/connections');

module.exports = {
    async show(req,res){
        //Definir autoriazação
        const ong_id = req.headers.authorization;

        //Se não existir a autenticação
        if(!ong_id){
            return res.send( `Você ainda não está logado, faça <a href="http://localhost:8000/login">login</a> para prosseguir` );
        }
        //Coletar causas
        const incidents = await conn('incidents')
                               .where('ong_id', ong_id)
                               .select("id","title","description","value");

        //Se não tiver nenhuma
        if(incidents.length === 0){
            return res.send({ alert: "Esse perfil não tem causas ainda" });
        }

        //Retorne as causas dessa ONG
        return res.send(incidents);
    }
}