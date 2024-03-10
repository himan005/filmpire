import axios from 'axios'

export const moviesApi = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params:{
        api_key: import.meta.env.VITE_TMDB_KEY
    },
})
export const fetchAuthToken = async () =>{
    try{
        //getting data auth token
        const {data} = await moviesApi.get('/authentication/token/new')
        const token = data.request_token
        //on Success
        if(data.success){
            //saving token in localstorage
            localStorage.setItem('request_token', token);
            //redirecting to url
            window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}/approved`

        }
    }catch(error){
        console.log("Token not created")
    }
}

export const createSessionId = async() =>{
    const token = localStorage.getItem('request_token') 
    if(token){
        try{
            const {data: {session_id}} = await moviesApi.post('authentication/session/new', {
                request_token:token,
            })
            localStorage.setItem('session_id', session_id)
            return session_id
        }catch(error){  
            console.log(error)
        }
    }   
}
