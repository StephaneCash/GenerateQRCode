import React, { useState, useEffect } from 'react'
import { Button, TextField } from '@mui/material';
import QRCode from "qrcode.react";
import { storage } from '../ConfigFirebase';
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from 'uuid';
import Load from "./Load";
import '../css/MainContent.css';
import AttUse from "../AttUse.gif";

function MainContent() {

    const [text, setText] = useState('');
    const [imgUrl, setImageUrl] = useState('');
    const [imgUpload, setImgUpload] = useState(null);
    const [imgList, setImgList] = useState([]);
    const [etatBtn, setEtatBtn] = useState(false);

    const generateCodeQr = async () => {
        setEtatBtn(true)
    }
     
    const qrCode = (
        <QRCode
            id="qrCodeId"
            size={90}
            value={text}
            bgColor="white"
            fgColor="black"
            level="L"
        />
    ) 

    const hanldeImage = (e) => {
        setImgUpload(e.target.files[0]);
    }

    const imgListRef = ref(storage, "/images");
 
    const uploadHandle = () => {
        setEtatBtn(true);
        if (imgUpload === null) return;
        const imgRef = ref(storage, `images/${imgUpload.name + v4()}`);
        uploadBytes(imgRef, imgUpload).then((snaphsot) => {
            getDownloadURL(snaphsot.ref).then((url) => {
                setImgList((prev) => [...prev, url])
                setText(url)
            })  
        })  
    }
     
    useEffect(() => {
        listAll(imgListRef).then((resp) => {
            resp.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImgList((prev) => [...prev, url]);
                })
            })
            console.log(imgList)
        })
    }, [])    
  
    return (
        <div className='col-12' style={{ marginTop: '100px' }}>
            <div className="d-flex dFlex">
                <div className="col-2">
                    <TextField
                        type="file"
                        label="Entrer votre secret"
                        variant="standard"
                        onChange={(e) => hanldeImage(e)}
                    />
                    {
                        etatBtn ? <Button
                            disabled={text ? "" : "disabled"}
                            style={{ marginTop: "10px", marginBottom: "20px" }}
                            variant="contained" color="primary"
                            onClick={() => generateCodeQr()}
                        >
                            Générer
                        </Button> : <Button
                            style={{ marginTop: "10px", marginBottom: "20px" }}
                            variant="contained" color="primary"
                            onClick={() => uploadHandle()}
                        >
                            Télécharger
                        </Button>
                    }

                    <br /> <br />
                    {imgUrl ? <a href={imgUrl} download>
                        {qrCode}
                    </a> : ""}
                </div>

                <div className="col-10" style={{ border: "1px solid blue", width: 'auto' }}>

                    {
                        etatBtn ?
                            text ?
                                <div>
                                    <img src={AttUse} className="imgConvert" />
                                    {qrCode}

                                </div> : <Load />
                            : <h5 className="p-5" style={{ textAlign: "center" }}>
                                Votre Image sera affichée ici
                            </h5>
                    } 
                 
                    <h5 className="text-center mt-3">
                        {etatBtn ? "" : ""}
                    </h5>

                </div>
            </div>
        </div>
    )
}

export default MainContent