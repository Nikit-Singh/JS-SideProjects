window.addEventListener('load', () => {
	let lon, lat, loc, far, flurries

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position => {
			lon = position.coords.longitude
			lat = position.coords.latitude
			const proxy = `https://cors-anywhere.herokuapp.com/`
			const api = `${proxy}https://api.darksky.net/forecast/46fb480569d82eb957795d4c6281a310/${lon},${lat}`

			fetch(api)
				.then(res => {
					return res.json()
				})
				.then(data => {
					loc = data.timezone
					far = data.currently.temperature
					summary = data.currently.summary
					console.log(`${loc}, ${far}`)
					document.querySelector('.location').innerHTML = loc
					document.querySelector('.temperature-type').innerHTML = far
					document.querySelector('.temperature-desc').innerHTML = summary
				})
		})
	} else {
		h1.textContent = 'Please Enable You Location Module'
	}
})
