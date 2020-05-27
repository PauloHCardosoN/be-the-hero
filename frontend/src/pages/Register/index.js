import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import "./styles.css";

import api from "../../services/api";

import logoImg from "../../assets/logo.svg";

export default function Register(){
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity]         = useState('');
  const [uf, setUf]             = useState('');

  const history = useHistory();
    

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      name,
      email,
      whatsapp,
      city,
      uf
    };

    try {
      const response = await api.post("/ongs", data);

      alert(`Seu ID de acesso: ${response.data.id}`);

      history.push("/");
    } catch (err) {
      console.log(err)
      alert("Erro no cadastro, tente novamente");
    }
  }

  return (
    <div className="register-container">
      <div className="content">

        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude pessoas a encontrar
            os casos da sua ONG
          </p>

          <Link to="/" className="back-link">
            <FiArrowLeft size={16} color="#e02041" />
            Não tenho cadastro
          </Link>
        </section>

        <form onSubmit={handleRegister}>

          <div tovalidate="">
            <input
              placeholder="Nome da ONG"
              onChange={e => setName(e.target.value)}
              name="name"
            />
          </div>

          <div tovalidate="">
            <input
              placeholder="E-mail"
              onChange={e => setEmail(e.target.value)}
              name="email"
            />
          </div>
          
          <div tovalidate="">
            <input
              placeholder="WhatsApp"
              onChange={e => setWhatsapp(e.target.value)}
              name="whatsapp"
            />
          </div>
          
          <div className="input-group">

            <div tovalidate="">
              <input
                placeholder="Cidade"
                onChange={e => setCity(e.target.value)}
                name="city"
              />
            </div>

            <div tovalidate="">
              <input
                placeholder="UF"
                onChange={e => setUf(e.target.value)}
                name="uf"
              />
            </div>
            
          </div>

          <button className="button" type="submit">
            Cadastrar
          </button>
      
        </form>

      </div>
    </div>
  );
}
