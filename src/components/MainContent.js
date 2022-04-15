import React, { useState } from 'react'
import { Button, Card, CardContent, Grid, TextField } from '@mui/material';
import QRCode from "qrcode";

function MainContent() {

    const [text, setText] = useState('Attestation');
    const [imgUrl, setImageUrl] = useState('');
    const [imgUpload, setImgUpload] = useState('');

    const generateCodeQr = async () => {
        try {
            const resp = await QRCode.toDataURL(text);
            setImageUrl(resp);
        } catch (error) {
            console.log(error)
        }
    }

    const hanldeImage = (e) =>{
        console.log(e.target.files[0])
    }

    return (
        <Card>
            <CardContent>
                <h2>Attestations</h2>
            </CardContent>
            <CardContent>
                <Grid container spacing={2}>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <TextField
                            type="file"
                            label="Entrer votre secret"
                            variant="standard"
                            onChange={(e) => hanldeImage(e)}
                        />
                        <Button
                            style={{ marginTop: "10px", marginBottom: "20px" }}
                            variant="contained" color="primary"
                            onClick={() => generateCodeQr()}
                        >
                            Générer
                        </Button> <br /> <br />
                        {imgUrl ? <a href={imgUrl} download>
                            <img src={imgUrl} alt='Code QR attestation' />
                        </a> : null}
                    </Grid>

                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        
                    </Grid>
                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}></Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default MainContent