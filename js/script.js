function updateTime() {
    // date
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // 从0开始
    const monthName = "月";
    const dayName = "日";
    const day = now.getDate();
    
    const date = String(month) + monthName + String(day) + dayName;

    // weekday
    const dayOfWeek = now.getDay();
    const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const dayOfWeekName = weekDays[dayOfWeek];

    // time
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    // lunar
    const solar= Solar.fromYmd(year,month,day);
    const lunarDate = solar.getLunar();
    const lunardate = String(lunarDate.getMonthInChinese()) + '月' + String(lunarDate.getDayInChinese()) + '日';
    
    document.getElementById('hour').textContent = hours;
    document.getElementById('minute').textContent = minutes;
    document.getElementById('date').textContent = date;
    document.getElementById('weekday').textContent = dayOfWeekName;
    document.getElementById('lunarday').textContent = lunardate;
}
    
updateTime();
    
setInterval(updateTime, 1000);

let isExpanded= 0;
document.addEventListener('DOMContentLoaded', (event) => {
    const selectEngine = document.getElementById('select-engine');
    selectEngine.addEventListener('click', () => {
        isExpanded = !isExpanded;
        if(isExpanded) expandDropdown();
        else foldDropdown();
    });

    const timeBox = document.getElementById('time-box');
    timeBox.addEventListener('click', () => {
        console.log('on time box clicked');
    });
});

function foldDropdown(){
    document.getElementById('search-down').style.transform = `scaleY(0)`;
    isExpanded = 0;
}
function expandDropdown(){
    document.getElementById('search-down').style.transform = `scaleY(1)`;
    isExpanded = 1;
}

function changeEngine(actionUrl,index) {
    document.getElementById('search-form').action = actionUrl;
    var engineIcon = document.getElementById('engine-icon');
    switch(index){
        case 0:
            engineIcon.src = '../rc/bing.svg';
            break;
        case 1:
            engineIcon.src='../rc/google.png';
            break;
    }
    console.log(actionUrl);
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.search-engine').forEach(function(element, index) {
        element.addEventListener('click', function() {
            var actionUrl = index === 0 ? 'https://www.bing.com/search' : 'https://www.google.com/search';
            changeEngine(actionUrl, index);
            foldDropdown();
        });
    });
});
