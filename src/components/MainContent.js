import React, { useState, useEffect } from 'react'
import { Button, TextField } from '@mui/material';
import QRCode from "qrcode.react";
import { storage } from '../ConfigFirebase';
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from 'uuid';
import Load from "./Load";
import '../css/MainContent.css';
import AttUse from "../AttUse.gif"

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
            value={"https://firebasestorage.googleapis.com/v0/b/gerenaretecodeqr.appspot.com/o/images%2F(1)Banza_Nkasa_AttestationDeReussite_2021.pdf?alt=media&token=6cf2d3dd-a986-488d-a571-e7e9c7bed2eb"}
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
                <div className="col-3">
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
                    </a> : qrCode}
                </div>
                <div className="col-9" style={{ border: "1px solid blue", width: 'auto' }}>
                    
                                <div>
                                    <img src={AttUse} className="imgConvert" />
                                
                                        {qrCode}

                                </div> :
                                <h5 className="text-center mt-3"><Load /></h5>
                     
                </div>
            </div>
        </div>
    )
}

export default MainContent