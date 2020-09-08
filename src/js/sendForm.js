import urls from './urls.json'
import swal from 'sweetalert';

const pdf = 'http://mexicoprevieneac.org/wp-content/uploads/2020/09/DesastresyResiliencia.pdf'

const prod = urls.apiUrlProd
const dev = urls.apiUrlDev
const apiUrl = process.env.NODE_ENV === 'development' ? dev : prod ;

const sendForm = async params => {

    await fetch(apiUrl, {
        method: 'post',
        body: params
    }).then(response => response.json())
    .then( data => {
        console.log(data)
        if (!data.success) {
            swal("Atención", data.data, "warning");
        } else {
            swal("¡Gracias!", data.data, "success");
            // window.location.href = "./gracias.html"
            window.open(pdf);
        }
        return data
    })
    .catch (function(){
        swal("Error", 'Algo salió mal', "error");
    })
    
}
export default sendForm