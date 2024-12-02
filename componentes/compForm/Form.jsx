
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import '../compForm/FormStyle.css'
import Cracha from "../compCracha/Cracha";
import ReactCrop from "react-image-crop";





function Form(){

    const [ufs,setUfs] = useState([]);
    const[cities,setCities] =useState([]);
    const[selectedUf,setSelectedUf] = useState("");
    const[selectedCity,setSelectedCity] = useState("");
    const[inputValueName, setInputValueName] = useState('Nome');
    const[inputValueSobre, setInputValueSobre] = useState('Sobrenome');
    const [imageSrc, setImageSrc] = useState(null); 
    const [imageAlt, setImageAlt] = useState("Escolha sua foto");
    

    const[crop,setCrop] = useState();
    const [isCropping,SetIsCropping] = useState(false);
    const [croppedImageUrl, setCroppedImageUrl] = useState(null);
    
    useEffect(() =>{
        axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/').then(response =>{
            setUfs(response.data);
        })
    }, [])
    
    useEffect(() =>{
        axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response =>{
            setCities(response.data);
        })
    }, [selectedUf])
    

    function handleSelectUfs(event){
        const uf = event.target.value;
        setSelectedUf(uf);
    }

    function handleSelectCities(event){
        const city = event.target.value;
        setSelectedCity(city);
    }

    function handleInputNomeChange(event)
    {
        setInputValueName(event.target.value);
    };

    function handleInputSobreChange(event)
    {
        setInputValueSobre(event.target.value);
    }

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
                width: 200, // Largura fixa do recorte
                height: 300, // Altura fixa do recorte
                aspect: 2 / 3, // Proporção do recorte
                x: (width - 200) / 2, // Coordenada X para centralizar
                y: (height - 300) / 2, // Coordenada Y para centralizar
            });
        } else {
            console.error("Erro ao carregar a imagem para recorte.");
        }
    };
  

    const resetChosePicture = (event) => {
        
        const fileInput = document.querySelector('.picture-input');
        if(fileInput){
            fileInput.value =''
        }
        event.preventDefault();
        setImageAlt("Selecione uma foto");
        setImageSrc(null);
        setCroppedImageUrl(null);
        setCrop(null);  // Reseta o crop também
        SetIsCropping(false);
    };

    useEffect(() => {
        if (imageSrc) {
            SetIsCropping(true); // Ativa o cropping se uma imagem for carregada
        } else {
            SetIsCropping(false); // Desativa o cropping se não houver imagem
        }
    }, [imageSrc]);


    const getCroppedImg = (image, crop) => {
        if (!crop || !image) {
            console.error("Recorte ou imagem não disponível.");
            return;
        }
    
        const canvas = document.createElement('canvas');
        canvas.width = crop.width; // largura do recorte em pixels
        canvas.height = crop.height; // altura do recorte em pixels
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
       
        const ctx = canvas.getContext('2d');
    
        ctx.drawImage(
        image,
        crop.x * scaleX, // Coordenada X ajustada pela escala
        crop.y * scaleY, // Coordenada Y ajustada pela escala
        crop.width * scaleX, // Largura do recorte ajustada pela escala
        crop.height * scaleY, // Altura do recorte ajustada pela escala
        0, // Posição X inicial no canvas
        0, // Posição Y inicial no canvas
        canvas.width, // Largura do canvas
        canvas.height // Altura do canvas
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
                // Fallback para navegadores que não suportam canvas.toBlob
                const imageURL = canvas.toDataURL('image/jpeg');
                setCroppedImageUrl(imageURL);
                resolve(imageURL);
            }
        });
    };
    

    const handleRecorte = async (event) => 
    {
        event.preventDefault();
        try {
            const image = document.querySelector('.picture-img');
            if (!image) {
                throw new Error('Imagem não encontrada.');
            }
            const croppedImage = await getCroppedImg(image, crop);
            setCroppedImageUrl(croppedImage); // Certifique-se de que a URL recortada seja atualizada corretamente
            console.log("Imagem recortada:", croppedImage);
        } catch (error) {
            console.error("Erro ao recortar a imagem:", error);
        }
    };
    return(
            
        <div className="div-form">
           
            <form action="" className="form-container">
                <label className='picture' tabIndex={0}>
                    
                    <input 
                        type="file" 
                        accept="image/*" 
                        className="picture-input"
                        disabled = {isCropping} //desabilita o input enquanto está ativo o cropping
                        onChange={handleImageChange}
                    />
                    
                    <span className="picture-image">
                       
                        <ReactCrop 
                        keepSelection
                        src={imageSrc}
                        crop={crop}
                        onChange={(newCrop) => setCrop(newCrop)}
                        onImageLoaded={onImageLoad}>
                            {imageSrc ? <img src={imageSrc} alt={imageAlt} className="picture-img" onLoad={onImageLoad}/> : "Selecione uma foto" }
                        </ReactCrop>   
                    </span>
                    
                </label>
                <div className="div-buttons">
                    {imageSrc ? <button className="buttonVoltar" onClick={handleRecorte}>Recortar</button> :" "}
                    {imageSrc ? <button className="buttonVoltar" onClick={resetChosePicture}>voltar</button> : " "}
                </div>
                 
                

                <div className="div-infoForm">
                <label htmlFor="">Nome:</label>

                    <input type="text" 
                    name="nome" 
                    id="nome"
                    className="inputSelect"
                    value = {inputValueName}
                    onChange={handleInputNomeChange} />

                    <label htmlFor="" name="sobrenome" id="sobrenome">Sobrenome:</label>

                    <input type="text"
                    name="sobrenome"
                    id="sobrenome" 
                    className="inputSelect"
                    value = {inputValueSobre}
                    onChange={handleInputSobreChange}/>
                </div>

                <div className="divSelectForm">
                <label htmlFor="">Estado:</label>
                <select 
                name="uf" 
                id="uf" 
                className="inputSelect"
                onChange={handleSelectUfs}>

                    <option value="">Selecione o estado</option>

                    {ufs.map(uf =>(
                        <option value={uf.sigla} key={uf.id} >
                            {uf.nome}    
                        </option>
                    ))}

                </select>
                <label htmlFor="">Cidade:</label>
                <select 
                name="city" 
                id="city" 
                className="inputSelect"
                value={selectedCity} 
                onChange={handleSelectCities}>
                    <option value="">Selecione a cidade</option>
                    {cities.map(cities =>(
                        <option value={cities.sigla} key={cities.id} >
                            {cities.nome}
                        </option>
                    ))}
                </select>
                </div>
                
            </form>
            <Cracha nome={inputValueName} sobrenome={inputValueSobre} estado={selectedUf} cidade={selectedCity} imagem={croppedImageUrl}></Cracha>
        </div>
        

    )
}



export default Form;
