import axios from "axios";

const url = 'http://localhost:5001/productos/';
    
async function request (httpCall)
{
    const response = await httpCall();
    return response.data;
};

const getAll = () => request(()=>axios.get(url));
const getSingle = (codigo) => request(() => axios.get(url+codigo));
const add = (producto) => request(() => axios.post(url, producto));
const update = ({codigo, ...producto}) => request(() => axios.put(url+codigo, producto));
const remove = (codigo) => request(() => axios.delete(url+codigo));


export default{
    getAll, getSingle, add, update, remove
}