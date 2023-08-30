import React from 'react';
import FavoritesRow from './favoritesRow';


function FavoritesTable({ fav_panoramas }) {


    return (
        <table id='favorites'>
            <caption>Check out our favorite panoramas</caption>
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                    <th>Date Generated</th>
                    <th>Generate Panorama</th>
                </tr>
            </thead>
            <tbody>
                {fav_panoramas.map((panorama, i) => 
                <FavoritesRow 
                    fav_panorama={panorama}
                    key={i} 
                />)}
            </tbody>
        </table>
    );
}

export default FavoritesTable;