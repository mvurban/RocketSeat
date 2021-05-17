import axios from 'axios';

//Use o Json-server para simular uma url que traga os dados do server.json
//Instale se não tiver instalado o json-server
//Depois de instalado execute:
// json-server ./src/services/server.json --host 192.168.0.104 --port 3333 --delay 700



const api = axios.create({
   baseURL:'http:192.168.0.104:3333',
});

export default api; 