import { useEffect, useState } from "react";
import axios from "axios";
import '../compForm/FormStyle.css';
import Cracha from "../compCracha/Cracha";
import ReactCrop from "react-image-crop";

function Form() {
    const [ufs, setUfs] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedUf, setSelectedUf] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [inputValueName, setInputValueName] = useState('Nome');
    const [inputValueSobre, setInputValueSobre] = useState('Sobrenome');
    const [imageSrc, setImageSrc] = useState(null); 
    const [imageAlt, setImageAlt] = useState("Escolha sua foto");
    const [crop, setCrop] = useState();
    const [isCropping, setIsCropping] = useState(false);
    const [croppedImageUrl, setCroppedImageUrl] = useState(null);

    // Fetch UFs
    useEffect(() => {
        axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/')
            .then(response => setUfs(response.data));
    }, []);

    // Fetch Cities
    useEffect(() => {
        if (selectedUf) {
            axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
                .then(response => setCities(response.data));
        }
    }, [selectedUf]);

    const handleSelectUfs = (event) => {
        const uf = event.target.value;
        setSelectedUf(uf);
    };

    const handleSelectCities = (event) => {
        const city = event.target.value;
        setSelectedCity(city);
    };

    const handleInputNomeChange = (event) => {
        setInputValueName(event.target.value);
    };

    const handleInputSobreChange = (event) => {
        setInputValueSobre(event.target.value);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImageSrc(event.target.result);
                setImageAlt(file.name);
            };
            reader.readAsDataURL(file);
        } else {
            setImageSrc(null);
            setImageAlt("Selecione uma foto");
        }
    };

    const onImageLoad = (e) => {
        const { width, height } = e.currentTarget;
        if (width && height) {
            setCrop({
                unit: 'px',
                width: 200,
                height: 300,
                aspect: 2 / 3,
                x: (width - 200) / 2,
                y: (height - 300) / 2,
            });
        } else {
            console.error("Erro ao carregar a imagem para recorte.");
        }
    };

    const resetChosePicture = (event) => {
        event.preventDefault();
        const fileInput = document.querySelector('.picture-input');
        if (fileInput) {
            fileInput.value = '';
        }
        setImageAlt("Selecione uma foto");
        setImageSrc(null);
        setCroppedImageUrl(null);
        setCrop(null);
        setIsCropping(false);
    };

    useEffect(() => {
        if (imageSrc) {
            setIsCropping(true);
        } else {
            setIsCropping(false);
        }
    }, [imageSrc]);

    const getCroppedImg = (image, crop) => {
        if (!crop || !image) {
            console.error("Recorte ou imagem não disponível.");
            return;
        }

        const canvas = document.createElement('canvas');
        canvas.width = crop.width;
        canvas.height = crop.height;
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            canvas.width,
            canvas.height
        );

        return new Promise((resolve, reject) => {
            if (canvas.toBlob) {
                canvas.toBlob(blob => {
                    if (!blob) {
                        console.error('Canvas está vazio.');
                        reject(new Error('Erro ao criar blob da imagem.'));
                        return;
                    }
                    const croppedImageUrl = URL.createObjectURL(blob);
                    setCroppedImageUrl(croppedImageUrl);
                    resolve(croppedImageUrl);
                }, 'image/jpeg');
            } else {
                const imageURL = canvas.toDataURL('image/jpeg');
                setCroppedImageUrl(imageURL);
                resolve(imageURL);
            }
        });
    };

    const handleRecorte = async (event) => {
        event.preventDefault();
        try {
            const image = document.querySelector('.picture-img');
            if (!image) {
                throw new Error('Imagem não encontrada.');
            }
            const croppedImage = await getCroppedImg(image, crop);
            setCroppedImageUrl(croppedImage);
        } catch (error) {
            console.error("Erro ao recortar a imagem:", error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!inputValueName || !inputValueSobre || !selectedUf || !selectedCity || !croppedImageUrl) {
            alert('Por favor, preencha todos os campos antes de enviar.');
            return;
        }

        const data = {
            nome: inputValueName,
            sobrenome: inputValueSobre,
            estado: selectedUf,
            cidade: selectedCity,
            imagem: croppedImageUrl
        };

        try {
            const response = await axios.post('http://localhost:5000/api/crachas', data);
            alert('Crachá salvo com sucesso!');
            console.log('Resposta da API:', response.data);
        } catch (error) {
            console.error('Erro ao salvar os dados:', error);
            alert('Erro ao salvar os dados.');
        }
    };

    return (
        <div className="div-form">
            <form action="" className="form-container" onSubmit={handleSubmit}>
                <label className='picture' tabIndex={0}>
                    <input 
                        type="file" 
                        accept="image/*" 
                        className="picture-input"
                        disabled={isCropping}
                        onChange={handleImageChange}
                    />
                    <span className="picture-image">
                        <ReactCrop 
                            keepSelection
                            src={imageSrc}
                            crop={crop}
                            onChange={(newCrop) => setCrop(newCrop)}
                            onImageLoaded={onImageLoad}>
                            {imageSrc ? <img src={imageSrc} alt={imageAlt} className="picture-img" onLoad={onImageLoad} /> : "Selecione uma foto"}
                        </ReactCrop>   
                    </span>
                </label>
                <div className="div-buttons">
                    {imageSrc && <button className="buttonVoltar" onClick={handleRecorte}>Recortar</button>}
                    {imageSrc && <button className="buttonVoltar" onClick={resetChosePicture}>Voltar</button>}
                </div>

                <div className="div-infoForm">
                    <label>Nome:</label>
                    <input 
                        type="text" 
                        name="nome" 
                        className="inputSelect"
                        value={inputValueName}
                        onChange={handleInputNomeChange} 
                    />

                    <label>Sobrenome:</label>
                    <input 
                        type="text"
                        name="sobrenome"
                        className="inputSelect"
                        value={inputValueSobre}
                        onChange={handleInputSobreChange} 
                    />
                </div>

                <div className="divSelectForm">
                    <label>Estado:</label>
                    <select 
                        name="uf" 
                        className="inputSelect"
                        onChange={handleSelectUfs}>
                        <option value="">Selecione o estado</option>
                        {ufs.map(uf => (
                            <option value={uf.sigla} key={uf.id}>{uf.nome}</option>
                        ))}
                    </select>

                    <label>Cidade:</label>
                    <select 
                        name="city" 
                        className="inputSelect"
                        value={selectedCity} 
                        onChange={handleSelectCities}>
                        <option value="">Selecione a cidade</option>
                        {cities.map(city => (
                            <option value={city.nome} key={city.id}>{city.nome}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="buttonSubmit">Enviar</button>
            </form>
            <Cracha 
                nome={inputValueName} 
                sobrenome={inputValueSobre} 
                estado={selectedUf} 
                cidade={selectedCity} 
                imagem={croppedImageUrl} 
            />
        </div>
    );
}

export default Form;
