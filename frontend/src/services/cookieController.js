//Encontrar cookies
const cookie = {
    //Encontrar valor
    get: function(name){
        let cookie = document.cookie.split("; ");


        for(let values of cookie)
            if(values.indexOf(name) !== -1)
                return values.split('=')[1];
    },
    //Criar cookie
    set: function(name,value){
        document.cookie = `${name}=${value}; path=/;`;
    },
    //Deletar cookie
    delete: function(name){
        let cookie = document.cookie.split("; ");

 
        for(let values of cookie)
            if(values.indexOf(name) !== -1)
                document.cookie = `${name}=; expires=Mon, 01 Jan 1900 00:00:00 UTC;`;
    }
}

export default cookie;