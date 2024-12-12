import { API_KEY } from "../constants/index.js"

const GET = {
	method: "GET",
	headers: {
		accept: "application/json",
		Authorization: API_KEY,
	},
}

const postAction = (bd) => {
	return {
		method: "POST",
		headers: {
			accept: "application/json",
			"content-type": "application/json",
			Authorization: API_KEY,
		},
		body: bd,
	}
}

const deleteAction = (bd) => {
	return {
		method: "DELETE",
		headers: {
			accept: "application/json",
			"content-type": "application/json",
			Authorization: API_KEY,
		},
		body: bd,
	}
}

export { GET, postAction, deleteAction }
