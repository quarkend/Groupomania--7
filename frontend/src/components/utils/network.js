import { HTTP, HTTPS } from '../constants/api';
/**
 * Envoie la requête fetch
 * @param {String} url - url de requête
 * @returns {Promise} - Promise avec le résultat de requête
 */
export const getApiResource = async (url) => {
	try {
		const res = await fetch(url);
		if (!res.ok) {
			console.error('Could not fetch. ', res.status);
			return false;
		};
		return await res.json();
	} catch(error) {
		console.error('Could not fetch. ', error.message);
		return false;
	}
}



export const postApiObjet = async (url, body) => {
	try {
		const res = await fetch(url, {
			method: "POST",
			headers: {
			"Content-Type": "application/json"
			},
			credentials: 'include',
			body: JSON.stringify(body)
		});

		if (!res.ok) {
			console.error('Could not fetch. ', res.status);
			return false;
		};
		return await res.json();
	} catch(error) {
		console.error('Could not fetch. ', error.message);
		return false;
	}

}

/**
 * Change URL (HTTP sur HTTPS)
 * @param {String} url - url qui va être changé
 * @returns {String} - url avec HTTPS
 */
export const changeHTTP = url => {
	const result = url ? url.replace(HTTP, HTTPS) : url;
	return result;
}
