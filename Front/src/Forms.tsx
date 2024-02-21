import './Forms.css'
import * as CryptoJS from 'crypto-js';
import axios from 'axios';

import * as dotenv from 'dotenv';
import { useState } from 'react';

const API_URL = "http://" + import.meta.env.VITE_SERVER_IP + ":" + import.meta.env.VITE_SERVER_PORT + "/";

const encryptMessage = (message: string, secretKey: string): string => {
    const encrypted = CryptoJS.AES.encrypt(message, secretKey).toString();
    return encrypted;
};

const key = import.meta.env.VITE_KEY


function Forms() {
    const [option1,setOption1] = useState("r")
    const [option2,setOption2] = useState("s")
    const [option3,setOption3] = useState("c")
    const [option4,setOption4] = useState("c")

    const sendMessage = () => {
        const info = option1 + option2+ option3 + option4
    
        let date = new Date();
        console.log(API_URL)
        console.log(key)
        const message = encryptMessage(Date.now() + "\n" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + ":" + date.getMilliseconds() + "\n" + info, key);
        console.log(message)
        axios.post(API_URL, { message: message });
    }
    

    return (
        <div className='parent'>
            <div className='container'>
                <form>
                    <fieldset className='container'>
                        <legend>Select the alliance that you play for:</legend>
                        <div>
                            <input type="radio" id="red" name="contact" value="email" onClick={() => {setOption1("r")}} />
                            <label htmlFor="red">Red</label>

                            <input type="radio" id="blue" name="contact" value="phone" onClick={() => {setOption1("b")}}/>
                            <label htmlFor="blue">Blue</label>
                        </div>
                    </fieldset>
                </form>
                <form>
                    <fieldset className='container'>
                        <legend>Select the position where you will start:</legend>
                        <div>
                            <input type="radio" id="short" name="contact" value="Emi" onClick={() => {setOption2("s")}}/>
                            <label htmlFor="short">Short</label>

                            <input type="radio" id="long" name="contact" value="Fon" onClick={() => {setOption2("l")}}/>
                            <label htmlFor="long">Long</label>
                        </div>
                    </fieldset>
                </form>
                <form>
                    <fieldset className='container'>
                        <legend>Select the position where you will park:</legend>
                        <div>
                            <input type="radio" id="start_left" name="contact" value="Emi" onClick={() => {setOption3("l")}}/>
                            <label htmlFor="start_left">Left</label>

                            <input type="radio" id="start_center" name="contact" value="Fon" onClick={() => {setOption3("c")}}/>
                            <label htmlFor="start_center">Center</label>

                            <input type="radio" id="start_right" name="contact" value="Fon" onClick={() => {setOption3("r")}}/>
                            <label htmlFor="start_right">Right</label>
                        </div>
                    </fieldset>
                </form>
                <form onChange={() => {console.log("aaa")}}>
                    <fieldset className='container'>
                        <legend>Select the path that you will take:</legend>
                        <div>
                            <input type="radio" id="path_left" name="contact" value="Emi" onClick={() => {setOption4("l")}}/>
                            <label htmlFor="path_left">Left</label>

                            <input type="radio" id="path_center" name="contact" value="Fon" onClick={() => {setOption4("c")}}/>
                            <label htmlFor="path_center">Center</label>

                            <input type="radio" id="path_right" name="contact" value="Fon" onClick={() => {setOption4("r")}}/>
                            <label htmlFor="path_right">Right</label>
                        </div>
                    </fieldset>
                </form>
                <div>
                    <button onClick={sendMessage}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default Forms