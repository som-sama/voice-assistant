import express from 'express';
import { SpeechClient } from '@google-cloud/speech';

import pkg from 'express';
const { Request, Response } = pkg;
const app = express();
const port = 3000;

app.use(express.json());

app.post('/api/voice-input', async (req, res) => {
    try{
        const audioContent = req.body;


        //audio into text transcribing 
        const client = new SpeechClient();
        const audio = {content: audioContent};
        const config = {
            encoding: 'LINEAR16',
            languageCode: 'en-US',
    };
    const[Response] = await client.recognize({config, audio});

    //retrieve the text from the response
    const transcript = Response.results[0].alternatives[0].transcript;

    //returning to client
    res.json({transcript});
}catch(error){
    res.status(500).json({error: error.toString()});
}
});

app.listen(port, () => {
    console.log(`Server running at https://localhost:${port}`);
});
