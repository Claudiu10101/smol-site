import './Forms.css'
import zyzz from './zyzz.jpg'

function Forms() {
    return (
        <div className='parent'>
            <div className='container'>
                <form>
                    <fieldset className='container'>
                        <legend>Please select your preferred contact method:</legend>
                        <div>
                            <input type="radio" id="contactChoice1" name="contact" value="email" />
                            <label htmlFor="contactChoice1">Email</label>

                            <input type="radio" id="contactChoice2" name="contact" value="phone" />
                            <label htmlFor="contactChoice2">Phone</label>

                            <input type="radio" id="contactChoice3" name="contact" value="mail" />
                            <label htmlFor="contactChoice3">Mail</label>
                        </div>
                    </fieldset>
                </form>
                <form>
                    <fieldset className='container'>
                        <legend>Plis swelect yo fav contact metod:</legend>
                        <div>
                            <input type="radio" id="contactChoice4" name="contact" value="Emi" />
                            <label htmlFor="contactChoice4">Emi</label>

                            <input type="radio" id="contactChoice5" name="contact" value="Fon" />
                            <label htmlFor="contactChoice5">Fon</label>

                            <input type="radio" id="contactChoice6" name="contact" value="Mei" />
                            <label htmlFor="contactChoice6">Mei</label>
                            <input type="radio" id="contactChoice7" name="contact" value="Stitch" />
                            <label htmlFor="contactChoice7">Stitch</label>

                            <input type="radio" id="contactChoice8" name="contact" value="kiti" />
                            <label htmlFor="contactChoice8">I would be very grateful if you decided to contact me using my discord</label>

                            <input type="radio" id="contactChoice9" name="contact" value="cuki" />
                            <label htmlFor="contactChoice9">cuki</label>
                        </div>
                    </fieldset>
                </form>
                <a href={zyzz} download="zyzz" target='_blank'>
                    <div>
                        <button>Submit</button>
                    </div>
                </a>
            </div>
        </div>
    )
}

export default Forms