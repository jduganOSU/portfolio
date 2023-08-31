import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDate, formatCoordinates } from '../utils/helpers';


function FavoritesRow({ fav_panorama }) {
    
    const { latitude, longitude } = formatCoordinates(fav_panorama.latitude, fav_panorama.longitude);
    const navigate = useNavigate();

    const handleGeneratePanorama = () => {
        const { latitude, longitude } = fav_panorama;
        navigate(`/individual/${latitude}/${longitude}`);
    };
    
    return (
        <tr>
            <td>{fav_panorama.description}</td>
            <td>{latitude}</td>
            <td>{longitude}</td>
            <td>{formatDate(fav_panorama.dateGenerated)}</td>
            <td>
                <button id="generate_favorite" onClick={handleGeneratePanorama}>Generate Panorama</button>
            </td>
        </tr>
    );
}

export default FavoritesRow;
