import '../sass/index.scss'
import images from './images'
import sendForm from './sendForm'

const imgHeader = document.getElementById('imgHeader')
const imgMockupInterior = document.getElementById('imgMockupInterior')

imgHeader.src = images.header
imgMockupInterior.src = images.mockup_interior

const newsletterForm = document.getElementById('newsletterForm')
    
    
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const formData = new FormData(newsletterForm)
        sendForm(formData)
        // console.log(response)
    })