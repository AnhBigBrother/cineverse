import accessToken from './accessToken.js';

const GET = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: accessToken,
    }
};

const postAction = (bd) => {
    return {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: accessToken,
        },
        body: bd
    }
}

const deleteAction = (bd) => {
    return {
        method: 'DELETE',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: accessToken,
        },
        body: bd
    }
}



export { GET, postAction, deleteAction };