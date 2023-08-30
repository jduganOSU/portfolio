export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

export const formatCoordinates = (latitude, longitude) => {
    // Truncate to 4 digits after the decimal
    let formattedLat = parseFloat(latitude.toFixed(4));
    let formattedLon = parseFloat(longitude.toFixed(4));

    // Convert to E/W and N/S format
    let latDirection = formattedLat >= 0 ? 'N' : 'S';
    let lonDirection = formattedLon >= 0 ? 'E' : 'W';

    // Remove the negative sign if present
    formattedLat = Math.abs(formattedLat);
    formattedLon = Math.abs(formattedLon);

    return {
        latitude: `${formattedLat}° ${latDirection}`,
        longitude: `${formattedLon}° ${lonDirection}`
    };
}
