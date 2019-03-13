window.addEventListener('load', () => {
	let lon, lat
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position => {
			lon = position.coords.longitude
			lat = position.coords.latitude
			console.log(`Lon: ${lon} Lat: ${lat}`)
		})
	} else {
		h1.textContent = 'Please Enable You Location Module'
	}
})
