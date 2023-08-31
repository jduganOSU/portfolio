import React, { useState, useEffect } from 'react';
import FavoritesTable from '../components/favoritesTable';
import FooterNav from '../components/footer';

function Favorites() {
    const [favorites, setFavorites] = useState([]);

    const getFavorites = async () => {
        const outcome = await fetch('favPanos');
        const data = await outcome.json();
        setFavorites(data);
    };

    useEffect(() => {
        getFavorites();
    }, []);

    return (
        <>
            <div className="page-container">
                <div className="content-wrap">
                    <h2>Jack's Favorite Panoramas</h2>
                    <FavoritesTable fav_panoramas={favorites} />
                </div>
            </div>
            <FooterNav />
        </>
    );
}

export default Favorites;
