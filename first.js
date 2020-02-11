// // 2. This code loads the IFrame Player API code asynchronously.
// var tag = document.createElement('script');

// tag.src = "https://www.youtube.com/iframe_api";
// var firstScriptTag = document.getElementsByTagName('script')[0];
// firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// // 3. This function creates an <iframe> (and YouTube player)
// //    after the API code downloads.
// var player;

// function onYouTubeIframeAPIReady() {
//     player = new YT.Player('player', {
//         height: '365',
//         width: '645',
//         videoId: 'MtN1YnoL46Q',
//         //'M7lc1UVf-VE',
//         //viudeoId: '5rGgrPCsVZE',
//         events: {
//             'onReady': onPlayerReady,
//             //'onStateChange': onPlayerStateChange
//         }
//     });
// }

// // 4. The API will call this function when the video player is ready.
// function onPlayerReady(event) {
//     event.target.playVideo();
// }

// // 5. The API calls this function when the player's state changes.
// //    The function indicates that when playing a video (state=1),
// //    the player should play for six seconds and then stop.
// // var done = false;

// // function onPlayerStateChange(event) {
// //     if (event.data == YT.PlayerState.PLAYING && !done) {
// //         setTimeout(stopVideo, 6000);
// //         done = true;
// //     }
// // }

// // function stopVideo() {
// //     player.stopVideo();
// // }

// let convertBtn = document.querySelector('.convert-button');
// let URLinput = document.querySelector('.URL-input');

//let cntry = document.getElementsByClassName('cntry');



function getWeanter(key) {
    const corsProxy = 'https://cors-anywhere.herokuapp.com/'
    fetch(`${corsProxy}https://api.darksky.net/forecast/2193b72d9d8d28e6ee85fc66feba3057/${key}`)
        .then(res => res.json())
        .then(json => {
            console.log(json)
            let temp = document.getElementById('temp'),
                day = document.getElementById('day'),
                humidity = document.getElementById('humidity'),
                windStrength = document.getElementById('wind-strength'),
                atmosphericPressure = document.getElementById('atmospheric-pressure'),
                tempImg = document.getElementById('temp-photo');
            tempImg.classList.remove('weant-photo');
            let nextDays = document.getElementById('next-days');
            nextDays.classList.remove('next-days-cntry');
            let icon = document.getElementsByClassName('icon'),
                maxTemp = document.getElementsByClassName('max-temp'),
                celsius = (json.currently.temperature - 32) * 5 / 9;
            temp.innerHTML = `\u2600 -${Math.round(celsius)} °C `;
            let currentDay = new Date(json.currently.time)
            let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            day.innerHTML = ` ${days[currentDay.getDay()]}`
            humidity.innerHTML = `Humidity - ${json.currently.humidity} %`
            windStrength.innerHTML = `Wind speed -  ${json.currently.windSpeed} km/h`
            atmosphericPressure.innerHTML = `Presure -  ${json.currently.pressure} hPa`

            let dayData = json.daily.data;
            for (let i in dayData) {
                for (let j in icon) {
                    if (dayData[i].icon === 'clear-day') {
                        icon[j].src = "sunrise.png";
                    } else if (dayData[i].icon == 'rain') {
                        icon[j].src = 'rain.png'
                    } else if (dayData[i].icon == 'partly-cloudy-day') {
                        icon[j].src = 'cloudytwo.jpg'
                    } else if (dayData[i].icon == 'cloudy') {
                        icon[j].src = 'cloudy.png'
                    }

                }
            }
            let dataTempHigh = json.daily.data;
            for (let i in dataTempHigh) {
                for (let j in maxTemp) {
                    let tempHigh = Math.round((dataTempHigh[i].temperatureHigh - 32) * 5 / 9) + "°C";
                    maxTemp[j].innerHTML = `- ${tempHigh}`
                    i++
                }


            }

        })
}


function selectCuntry() {
    let selectCntry = document.getElementById('select-cntry').options,
        optCntry = document.getElementById('select-cntry').selectedIndex,
        cntry = selectCntry[optCntry].index;
    if (cntry == 1) {
        getWeanter('40.177200, -44.503490')
    } else if (cntry == 2) {
        getWeanter('37.8267, -122.4233')
    } else if (cntry == 3) {
        getWeanter('41.905991, -12.482775')
    } else
    if (cntry == 4) {
        getWeanter('-1.619644, -13.601546')
    } else if (cntry == 5) {
        getWeanter('20.007376, -73.767365')
    }

};