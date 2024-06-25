import axios from 'axios'


const instance=axios.create({
    BAZE_URL:import.meta.env.REACT_APP_BASE_URL,
    timeout:1000,
    headers:{"Content-Type":"application/json"}
})

export default instance

