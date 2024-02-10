import { useEffect } from "react"
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom"
import { postAction, GET } from "../API/APIconfig";
import updateSessionId from "../redux/actions/updateSessionId";
import updateUserInf from "../redux/actions/updateUserInf";


const useUpdateUserNSignIn = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const fetchUser = async (request_token) => {
        const POST = postAction(JSON.stringify({ request_token: request_token }))

        const session_id = await fetch('https://api.themoviedb.org/3/authentication/session/new', POST)
            .then(response => response.json())
            .then(data => data.session_id)
            .catch(err => console.error(err));
        if (session_id) {
            await fetch(`https://api.themoviedb.org/3/account/20792554?session_id=${session_id}`, GET)
                .then(response => {
                    if (response.status === 200){return response.json()}
                    else {
                        console.error(response);
                        throw new Error('Something wrong!')
                    }
                })
                .then(response => {
                    localStorage.setItem('session_id', session_id);
                    dispatch(updateSessionId(session_id));
                    dispatch(updateUserInf(response));
                    navigate('/home');
                })
                .catch(err => console.error(err));
        }
    }
    useEffect(() => {
        const session_id_storage = localStorage.getItem('session_id');
        if (session_id_storage && session_id_storage !== '') {
            fetch(`https://api.themoviedb.org/3/account/20792554?session_id=${session_id_storage}`, GET)
                .then(response => {
                    if (response.status === 200){return response.json()}
                    else{
                        localStorage['session_id'] = '';
                        console.error(response);
                        throw new Error('session_id has expired!');
                    }
                })
                .then(user => {
                    dispatch(updateSessionId(session_id_storage));
                    dispatch(updateUserInf(user));
                })
                .catch(err => console.error(err));
        }
    }, [])
    useEffect(() => {
        if (location.search !== '') {
            let request_token = location.search.substring(location.search.indexOf('=') + 1, location.search.lastIndexOf('&'));
            fetchUser(request_token);
        }
    }, [location.search])
}

export default useUpdateUserNSignIn;