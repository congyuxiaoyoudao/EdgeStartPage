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
    const inputBox = document.getElementById('inputbox');
    const clearButton = document.getElementById('clear');

    // inputbox监听input事件
    inputBox.addEventListener('input', () => {
        if (inputBox.value.length > 0) {
            clearButton.style.display = 'inline';
        } else {
            clearButton.style.display = 'none';
        }
    });

    // clear按钮监听click事件
    clearButton.addEventListener('click', () => {
        inputBox.value = '';
        clearButton.style.display = 'none';
        inputBox.focus();
    });

    // 搜索引擎下拉框
    const selectEngine = document.getElementById('select-engine');
    selectEngine.addEventListener('click', () => {
        isExpanded = !isExpanded;
        if(isExpanded) expandDropdown();
        else foldDropdown();
    });

    // 时间框
    const timeBox = document.getElementById('time-box');
    timeBox.addEventListener('click', () => {
        console.log('on time box clicked');
    });

    // 切换选项卡
    var prevTabID = 'tab-resource';
    const tabs = document.querySelectorAll('.tab-item');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.id;
            switchTab(prevTabID,tabId);
            console.log(prevTabID,tabId);
            prevTabID = tabId;
        });
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

function switchTab(prevTabId,tabId) {
    hideElementById(prevTabId + '-content');
    showElementById(tabId + '-content');
}

function hideElementById(elementId) {
    const element = document.getElementById(elementId);
    element.style.display = 'none';
}

function showElementById(elementId) {
    const element = document.getElementById(elementId);
    element.style.display = 'block';
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
