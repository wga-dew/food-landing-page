function timer(id, deadline) {
    //============== Timer ==============//


    // const t = Date.parse(deadline) - Date.parse(new Date);

    // console.log(t);
    // console.log(`Days ${t / (1000 * 60 * 60 * 24)}`);
    // console.log(`Hourse ${(t / (1000 * 60 * 60)) % 24}`);
    // console.log(`Minutes ${(t / 1000 / 60) % 60}`);
    // console.log(`Seconds ${(t / 1000) % 60}`);
    // console.log(new Date(deadline).getDate());


    function getTimeRemaining(endTime) {
        const t = (Date.parse(endTime) - Date.parse(new Date)),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endTime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000),
            deadlineSpan = document.querySelector('.deadline');

        deadlineSpan.textContent = `${getZero(new Date(endTime).getDate())}.${getZero(new Date(endTime).getMonth()+1)}.${new Date(endTime).getFullYear()}`;
        deadlineSpan.classList.remove('finish__timer');
        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endTime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
                days.innerHTML = getZero(0);
                hours.innerHTML = getZero(0);
                minutes.innerHTML = getZero(0);
                seconds.innerHTML = getZero(0);
                deadlineSpan.classList.add('finish__timer');
            }
        }
    }

    setClock(id, deadline);
}

export default timer;