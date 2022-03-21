import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './../../App';
import Cookies from 'js-cookie';
export default function DeleteUser() {
    const Auth = React.useContext(AuthContext);
    const storage = JSON.parse(localStorage.getItem('user'));
    const userId = storage.id;
    let token = "Bearer " + storage.token;
    const handleSubmit = useCallback(function (value) {
        fetch(('/users/' + userId), {
            method: "delete",
            headers:
            {
                "Content-type": 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                id: value.id,
                userId: userId,
               
            })
        })
            .then(res => res.json())
            .then(
                (res) => {
                    if (res.error) {
                        alert("Votre compte n'a pas pu être supprimé.");
                    } else {
                        alert("Compte supprimé !")
                        Auth.setAuth(false);
                        Cookies.remove("user");
                        localStorage.clear();
                    }
                }
            )
            .catch(error => {
          
                alert("Votre compte n'a pas pu être supprimé !");
                console.error('There was an error!', error);
            })
    }, [Auth, userId, token])
    return (
        <div className="container">
            <h1>Souhaitez vous vraiment supprimer votre compte ?</h1>
            <div className="form-submit">
        <Link to={'/profile/' + userId} className="btn btn-outline-info btn-sm">Retour à mon compte</Link> 
                <button className="btn btn-outline-danger btn-sm" onClick={handleSubmit}>Supprimer mon compte</button>
            </div>
        </div>
    );
}
