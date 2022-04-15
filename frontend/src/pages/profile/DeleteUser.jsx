import React, { useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from './../../App';

export default function DeleteUser() {
    const history = useHistory();
    const Auth = React.useContext(AuthContext);
    const storage = JSON.parse(localStorage.getItem('user'));
    const userId = storage.id;
    let token = "Bearer " + storage.token;
    const handleSubmit = useCallback(function (value) {
        const conf = window.confirm('Etes vous sur de vouloir Supprimer definitivement votre compte ?')
      if(conf)  fetch(('/users/' + userId), {
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
                        history.push("/");
        window.location.reload();
       
        localStorage.clear();
                        // Auth.setAuth(false);
                        // localStorage.remove("user");
                        // localStorage.clear();
                    }
                }
            )
            .catch(error => {
          
                alert("Votre compte n'a pas pu être supprimé !");
                console.error('There was an error!', error);
            })
    }, [Auth, userId, token])
    return (
        <div className="card">
            <h1>Souhaitez vous vraiment supprimer votre compte ?</h1>
            <div className="form-submit">
        <Link to={'/' } className="btn btn-outline-info btn-sm">Home</Link> 
                <button className="btn btn-outline-danger btn-sm" onClick={handleSubmit}>Supprimer mon compte</button>
            </div>
        </div>
    );
}
