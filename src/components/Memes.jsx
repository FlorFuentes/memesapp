import html2canvas from "html2canvas";
import React, { useState, useEffect } from "react";

const Memes = () => {

    const [imgmeme, setImgmeme] = useState("");
    const [textmeme, setTextmeme] = useState("");
    const [memes, setMemes] = useState([]);


    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(data => setMemes(data.data.memes));
    }, []);

    const textomeme = (e) => {
        setTextmeme(e.target.value);
    }

    const seleccionarImg = (e) => {
        setImgmeme(e.target.value);
    }

    const descargar = (e) => {
        const meme = memes.find(m => m.name === imgmeme);
        if (!meme) return;



        //No anda cuando descargo la img,sale en blanco
        html2canvas(document.querySelector("#exportar"), { loggging: true, letterRendering: 1, allowTaint: false, useCors: true }).then(function (canvas) {
            /*document.body.appendChild(canvas);*/
            let img = canvas.toDataURL("image/jpg"); /*leer documentacion html2canvas*/
            let link = document.createElement("a"); /*creo elemento para descarga*/
            link.download = "memepropio.jpg";  /* apunto al elemento creado en el renglon de arriba para descargar*/
            link.href = img;
            link.click();
        });


    }
    return (
        <div className="text-center">
            <h1 className=" text-center">Editor de memes</h1>

            <h2>Ingresa el texto del meme</h2>
            <input onChange={textomeme} className="form-control w-50 m-auto d-block" type="text" placeholder="" />

            <h3 className="mt-3 mb-3 text-center">Elige tu meme favorito</h3>

            <select onChange={seleccionarImg} value={imgmeme} className="form-select form-select-lg mb-3 w-50 m-auto" aria-label=".form-select-lg example">
                {memes.map((meme, index) => (
                    <option key={index} value={meme.name}>{meme.name}</option>
                ))}
            </select>

            <figure className="text-center" id="exportar">
                <p>{textmeme}</p>
                <img src={memes.find(m => m.name === imgmeme)?.url} className="figure-img mt-3 d-block m-auto" alt="meme" />
            </figure>

            <button onClick={descargar} type="button" className="btn btn-color mt-4 mb-4">Descargar meme</button>
        </div>
    )
}
export default Memes; 
