import './Funcionarios.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Funcionarios() {
    const [crachas, setCrachas] = useState([]); // Estado para armazenar os crachás

    // Função para buscar dados do backend
    const fetchCrachas = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/crachas'); // Substitua pelo seu endpoint
            setCrachas(response.data); // Atualiza o estado com os dados retornados
        } catch (error) {
            console.error('Erro ao buscar os crachás:', error);
        }
    };

    // Buscar dados ao carregar o componente
    useEffect(() => {
        fetchCrachas();
    }, []);

    return (
        <main className="mainPagPerfil">
            <h1>Funcionários cadastrados</h1>
            <h2></h2>
            <section className="SectionShowFuncionarios">
                {crachas.length > 0 ? (
                    <div className="cracha-list">
                        {crachas.map((cracha) => (
                            <div className="cracha-item" key={cracha._id}>
                                <img
                                    src="https://i.pinimg.com/564x/76/c1/02/76c10266832005183df1833e5a5a8dc3.jpg" // Exibe diretamente o campo "imagem"
                                    alt={`Crachá de ${cracha.nome} ${cracha.sobrenome}`}
                                    className="cracha-image"
                                />
                                <div className="cracha-info">
                                    <h2>{cracha.nome} {cracha.sobrenome}</h2>
                                    <p><strong>Estado:</strong> {cracha.estado}</p>
                                    <p><strong>Cidade:</strong> {cracha.cidade}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Nenhum crachá encontrado. Crie um para aparecer aqui!</p>
                )}
            </section>
        </main>
    );
}

export default Funcionarios;
