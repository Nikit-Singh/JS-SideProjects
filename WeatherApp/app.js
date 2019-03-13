window.addEventListener('load', () => {
	let lon, lat, loc, far, summary, cel
	let card = document.querySelector('.card')
	let location = document.querySelector('.location')
	let tempType = document.querySelector('.temperature-type')
	let tempDesc = document.querySelector('.temperature-desc')
	let tempSection = document.querySelector('.temp-section')
	let tempSectionSpan = document.querySelector('.temp-section span')

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position => {
			lon = position.coords.longitude
			lat = position.coords.latitude
			const proxy = `https://cors-anywhere.herokuapp.com/`
			const api = `${proxy}https://api.darksky.net/forecast/46fb480569d82eb957795d4c6281a310/${lat},${lon}`

			fetch(api)
				.then(res => {
					return res.json()
				})
				.then(data => {
					loc = data.timezone
					far = data.currently.temperature
					summary = data.currently.summary

					cel = (far - 32) * (5 / 8)
					location.textContent = loc

					tempType.textContent = far
					tempDesc.textContent = summary

					card.style.display = 'block'

					tempChange(far, cel)
					gradientChange(cel)
				})
		})
	} else {
		h1.textContent = 'Please Enable You Location Module'
	}

	const tempChange = (far, cel) => {
		tempSection.addEventListener('click', () => {
			if (tempSectionSpan.textContent === 'F') {
				tempSectionSpan.textContent = 'C'
				tempType.textContent = cel.toFixed(2)
			} else {
				tempSectionSpan.textContent = 'F'
				tempType.textContent = far.toFixed(2)
			}
		})
	}

	const gradientChange = cel => {
		if (cel <= 15) {
			card.style.background = `linear-gradient(to bottom right, #6dd5ed, #2193b0)`
		} else {
			card.style.background = `linear-gradient(to bottom right, #fc4a1a, #f7b733)`
		}
	}
})
