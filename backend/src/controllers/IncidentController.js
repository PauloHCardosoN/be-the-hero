//Banco de dados
const conn = require('../database/connections');

module.exports ={
    //Criar um caso
    async create(req, res){
        //Desestruturar requisição
        const { 
            title,
            description,
            value
        } = req.body;

        //Criar id
        const ong_id = req.headers.authorization;

        //Ong que está fazendo a requisição
        const ong = await conn('ongs').where('id',ong_id).first();

        //Se não estiver cadastrada
        if(!ong){
            //Retorne o erro 401 - Sem autorização
            return res.status(401).send( `Sua ONG não está cadastrada, <a href="http://localhost:8000/ongs">cadatre-se</a>` );
        }


        //Tansformar tudo no id
        const [id] = await conn('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        //Retornar o id
        return res.json({ id });
    },

    //Mostrar casos
    async show(req, res){
        //Definir numero de paginas
        const { page = 1 } = req.query;

        //Cacular as paginas
        const [count] = await conn('incidents').count();


        //Selecionar 5 ONG's por pagina
        const incidents = await conn('incidents')
            .join('ongs','ongs.id','=','incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incidents.id',
                'incidents.title',
                'incidents.description',
                'incidents.value',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);

        
        //Definir header na resposta
        res.header('X-Total-Count', count["count(*)"]);

        //Retornar ONG's
        return res.send(incidents);
    },

    //Deletar um caso
    async delete(req, res){
        //Definir id
        const { id } = req.params;

        //Definar variavel do id da ONG que está tentando remover o caso
        const ong_id = req.headers.authorization;


        //Selecionar o caso de acordo com id definido no parametro
        const incident = await conn('incidents').where('id',id).first();

        
        //Se existir um caso
        if(incident){
            //Se os id's coincidirem
            if(ong_id != incident.ong_id){
               //Retornar erro 406 - Sem permissão
                return res.status(406).send({ erro:"Você não tem permissão para deletar essa causa" });
            }else{
                //Deletar caso
                await conn('incidents').where('id',id).delete();

                //Retornar status 204
                return res.send({ sucess: "Causa excluida com sucesso" });
            }
        }else{
            //Retornar erro 404 - Não encontrado
            return res.status(404).send({ erro: "Causa não encontrada" });
        }
    }
}