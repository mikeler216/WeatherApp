window.addEventListener('load', () => {
    let long;
    let lat;
    const temperatureDescription = document.querySelector('.temperature-description');
    const temperatureDegree = document.querySelector('.temperature-degree');
    const locationTimezone = document.querySelector('.location-timezone');
    const temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.degree-section span');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/83fd4cd7f7eea310eeaa595386264b2b/${lat},${long}`;
            fetch(api)
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    console.log(data);
                    const {temperature, summary, icon} = data.currently;
                    // Set DOM Elements from the API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;

                    // Formula for celsius
                    let celsius = Math.floor((temperature - 32) * (5 / 9));
                    setIcons(icon, document.querySelector('.icon'));
                    temperatureSection.addEventListener('click', () => {
                        if (temperatureSpan.textContent === "F") {
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = celsius;

                        } else {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                        }
                    })

                    //
                })

        })
    }

    function setIcons(icon, iconId) {
        const skycons = new Skycons({color: 'white'});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconId, Skycons[currentIcon])
    }

});