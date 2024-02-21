import './Forms.css'
import * as CryptoJS from 'crypto-js';
import axios from 'axios';

import * as dotenv from 'dotenv';

const API_URL = "http://" + import.meta.env.VITE_SERVER_IP + ":" + import.meta.env.VITE_SERVER_PORT + "/";

const encryptMessage = (message: string, secretKey: string): string => {
    const encrypted = CryptoJS.AES.encrypt(message, secretKey).toString();
    return encrypted;
};

const key = import.meta.env.VITE_KEY

const sendMessage = () => {
    let date = new Date();
    console.log(API_URL)
    console.log(key)
    const message = encryptMessage(Date.now() + "\n" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + ":" + date.getMilliseconds() + "\nrlddn", key);
    console.log(message)
    axios.post(API_URL, { message: message });
}

function Forms() {
    return (
        <div className='parent'>
            <div className='container'>
                <form>
                    <fieldset className='container'>
                        <legend>Select the alliance that you play for:</legend>
                        <div>
                            <input type="radio" id="contactChoice1" name="contact" value="email" />
                            <label htmlFor="contactChoice1">Red</label>

                            <input type="radio" id="contactChoice2" name="contact" value="phone" />
                            <label htmlFor="contactChoice2">Blue</label>
                        </div>
                    </fieldset>
                </form>
                <form>
                    <fieldset className='container'>
                        <legend>Select the position where you will start:</legend>
                        <div>
                            <input type="radio" id="contactChoice4" name="contact" value="Emi" />
                            <label htmlFor="contactChoice4">Short</label>

                            <input type="radio" id="contactChoice5" name="contact" value="Fon" />
                            <label htmlFor="contactChoice5">Long</label>
                        </div>
                    </fieldset>
                </form>
                <form>
                    <fieldset className='container'>
                        <legend>Select the position where you will park:</legend>
                        <div>
                            <input type="radio" id="contactChoice4" name="contact" value="Emi" />
                            <label htmlFor="contactChoice4">Left</label>

                            <input type="radio" id="contactChoice5" name="contact" value="Fon" />
                            <label htmlFor="contactChoice5">Center</label>

                            <input type="radio" id="contactChoice5" name="contact" value="Fon" />
                            <label htmlFor="contactChoice5">Right</label>
                        </div>
                    </fieldset>
                </form>
                <form>
                    <fieldset className='container'>
                        <legend>Select the path that you will take:</legend>
                        <div>
                            <input type="radio" id="contactChoice4" name="contact" value="Emi" />
                            <label htmlFor="contactChoice4">Left</label>

                            <input type="radio" id="contactChoice5" name="contact" value="Fon" />
                            <label htmlFor="contactChoice5">Center</label>

                            <input type="radio" id="contactChoice5" name="contact" value="Fon" />
                            <label htmlFor="contactChoice5">Right</label>
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