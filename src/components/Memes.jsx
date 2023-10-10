import html2canvas from "html2canvas";
import React, { useState } from "react";

const Memes = () => {

    const [imgmeme,setImgmeme]= useState();
    const [textmeme, setTextmeme] = useState();

    const textomeme = (e) => {
        setTextmeme(e.target.value);
    }

    const seleccionarImg = (e) => {
        setImgmeme(e.target.value);
    }

    const descargar = (e) => {
        html2canvas(document.querySelector("#exportar")).then(function (canvas) {
            /*document.body.appendChild(canvas);*/ 
            let img = canvas.toDataURL("memes/jpg"); /*leer documentacion html2canvas*/
            let link = document.createElement("a"); /*creo elemento para descarga*/
            link.download = "memepropio.jpg";  /* apunto al elemento creado en el renglomn de arriba para descargar*/
            link.href = img;
            link.click();
        });
    }
    return (
        <div className="text-center">
            <h1 className="mt-3 mb-3 text-center">Editor de memes</h1>
            <h3>Ingresa el texto del meme</h3>
            <input onChange={textomeme} className="form-control w-50 m-50 m-auto d-block" type="text" placeholder="" />

            <h3 className="mt-3 mb-3 text-center">Elegi tu imagen favorita</h3>
            <select onChange={seleccionarImg} className="form-select form-select-lg mb-3 w-50 m-auto" aria-label=".form-select-lg example">
                <option value={1}>Futurama</option>
                <option value={2}>Bob esponja</option>
                <option value={3}>Señora</option>
                <option value={4}>Calamardo</option>
            </select>

            <figure className="text-center" id="exportar">
                <p>{textmeme}</p>
                <img src={`../img/${imgmeme}.jpg`} className="figure-img mt-3 d-block m-auto" alt="meme"/>
            </figure>

            <button onClick={descargar} type="button" className="btn btn-primary mt-4 mb-4">Descargar meme</button>
        </div>
    )
}
export default Memes; 
