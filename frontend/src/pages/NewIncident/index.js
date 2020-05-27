import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from "../../services/api";

import "./styles.css";
import cookie from "../../services/cookieController";

import logoImg from "../../assets/logo.svg";

export default function NewIncident() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState(0);

  const ongId = cookie.get('id');


  const history = useHistory();

  async function handleNewIncident(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      value
    };

    try {
      await api.post("/incidents", data, {
        headers: { Authorization: ongId }
      });

      history.push("/profile");
    } catch (err) {
      console.log(err);
      alert("Erro no cadastro, tente novamente");
    }
  }
  

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1>Cadastrar novo caso</h1>
          <p>
            Descreva o caso detalhadamente para encontrar um herói para resolver
            isso.
          </p>

          <Link to="/" className="back-link">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para home
          </Link>
        </section>

        <form onSubmit={handleNewIncident}>
          <input
            placeholder="Título do caso"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          <div className="value-container">
              <input
                type="range"
                placeholder="Valor em reais"
                value={value}
                max="999"
                min="0"
                onChange={e => setValue(e.target.value)}
              />
              <input
                type="text"
                placeholder="Valor em reais"
                value={`R$ ${value}`}
                maxLength="3"
                onChange={e => setValue(e.target.value)}
              />
          </div>
          

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
