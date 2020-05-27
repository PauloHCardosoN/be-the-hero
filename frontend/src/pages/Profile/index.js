import React, { useState, useEffect } from "react";
import logoImg from "../../assets/logo.svg";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";
import api from "../../services/api";
import "./styles.css";

import cookie from "../../services/cookieController";

export default function Profile() {
  const [incidents, setIncidents] = useState([]);
  const [name, setName] = useState('carregando'); 


  const ongId = cookie.get('id');

  const history = useHistory();


  useEffect(() => {
    api
      .post("/", {
        id: ongId
      })
      .then(response => {
        const res = response.data;

        if(!res.name)
          history.push('/');

        setName(res.name);
      });


    api
      .get("/profile", {
        headers: { Authorization: ongId }
      })
      .then(response => {
        const warning = document.querySelector('p.warning');

        setIncidents(response.data);

        if(response.data.length === 0)
          warning.textContent = "Você não tem incidentes cadastrados";
      });
  }, [ongId, history]);


  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId
        }
      });

      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch (err) {
      alert("Erro ao deletar o caso");
    }
  }


  function handleLogout() {
    cookie.delete('id');
    history.push("/");
  }

  return (
    <div className="profile-container">
      <header>
        <div>
          <img src={logoImg} alt="Be The Hero" className="logo"/>
        </div>
        

        <div>
          <span>Bem vinda, <span className="primary-color">{name}</span></span>

          <Link to="/incidents/new" className="button">
            Cadastrar novo caso
          </Link>

          <button type="button" onClick={handleLogout}>
            <FiPower size={14} color="#e02041" />
          </button>
        </div>
        
      </header>

      <h1>Casos cadastrados</h1>

      <p className="warning"></p>

      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>
              {Intl.NumberFormat("pt-br", {
                style: "currency",
                currency: "BRL"
              }).format(incident.value)}
            </p>

            <button
              type="button"
              onClick={() => handleDeleteIncident(incident.id)}
            >
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
