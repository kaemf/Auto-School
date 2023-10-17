var dropList = document.querySelectorAll('.drop-custom-shell'), svg = document.querySelectorAll('.open-doc-svg'), sendLocal = document.querySelector('.record-btn-send'), downPanel = document.querySelectorAll('.down-panel'), lineBetween = document.querySelectorAll('.line-between-main-content'), categoryContainer = document.querySelectorAll('.category'), mainMenuButton = document.querySelector('.menu'), cpuCores = navigator.hardwareConcurrency, ambientsRecord = document.querySelectorAll('.image-ambient'), greenAmbientRecord = document.querySelector('.green-ambient'), redAmbientRecord = document.querySelector('.red-ambient'), yellowAmbientRecord = document.querySelector('.yellow-ambient'), ambientsMain = document.querySelectorAll('.content-ambient'), mainOrderButton = document.querySelector('.main-order-button-v2'), fastRecordShell = document.querySelector('.shell-fast-record-limit'), fastRecordOutside = document.querySelector('.fast-record'), mainContent = document.querySelector('.main-content'), menuHeader = document.querySelector('.menu-header'), recordPlace = document.querySelector('.fast-record'), v1Switch = document.querySelector('.version1'), v2Switch = document.querySelector('.version2'), uaLanguageSwitch = document.querySelector('.ukrainian'), ruLanguageSwitch = document.querySelector('.russian'), enLanguageSwitch = document.querySelector('.english');
var activeV2 = true;
function addUserToLocalStorage(user) {
    var users = [];
    var existingData = localStorage.getItem('../data/storage/users');
    if (existingData) {
        users = JSON.parse(existingData);
    }
    users.push(user);
    localStorage.setItem('../data/storage/users', JSON.stringify(users));
}
function sortUsersByName() {
    var existingData = localStorage.getItem('../data/storage/users');
    if (existingData) {
        var users = JSON.parse(existingData);
        users.sort(function (a, b) { return a.name.localeCompare(b.name); });
        return users;
    }
    else {
        return [];
    }
}
dropList.forEach(function (Object) {
    Object.addEventListener('click', function () {
        var category = Object.closest('.category');
        var _target = category === null || category === void 0 ? void 0 : category.querySelector('.information-drop');
        var svg = category === null || category === void 0 ? void 0 : category.querySelector('.open-doc-svg');
        var isActive = Object.getAttribute('data-active') === 'true';
        if (_target && svg) {
            if (!isActive) {
                _target.style.maxHeight = '999px';
                svg.style.transform = 'rotate(45deg)';
                Object.setAttribute('data-active', 'true');
            }
            else {
                _target.style.maxHeight = '0';
                svg.style.transform = 'rotate(0deg)';
                Object.setAttribute('data-active', 'false');
            }
        }
    });
    Object.addEventListener('mouseover', function () {
        var category = Object.closest('.category');
        var svg = category === null || category === void 0 ? void 0 : category.querySelector('.open-doc-svg');
        svg.style.transform = 'rotate(15deg)';
    });
    Object.addEventListener('mouseout', function () {
        var category = Object.closest('.category');
        var svg = category === null || category === void 0 ? void 0 : category.querySelector('.open-doc-svg');
        var isActive = Object.getAttribute('data-active') === 'true';
        if (!isActive) {
            svg.style.transform = 'rotate(0deg)';
        }
        else {
            svg.style.transform = 'rotate(45deg)';
        }
    });
});
sendLocal.addEventListener('click', function () {
    var email = document.querySelector('.mail');
    var name = document.querySelector('.name');
    var number = document.querySelector('.number-in');
    if (email.value === '' || name.value === '' || number.value === '') {
        alert('Error of Sending Data. One of the input fields is empty');
    }
    else {
        var dataToSend = {
            email: email.value,
            name: name.value,
            phoneNumber: number.value
        };
        addUserToLocalStorage(dataToSend);
        var sortedUsers = sortUsersByName();
        console.log(sortedUsers);
    }
});
window.addEventListener('load', function () {
    if (cpuCores <= 4) {
        greenAmbientRecord.style.display = 'none';
        redAmbientRecord.style.display = 'none';
        yellowAmbientRecord.style.display = 'none';
        ambientsMain.forEach(function (ambientsMainObject) {
            ambientsMainObject.style.display = 'none';
        });
        recordPlace.style.background = 'rgba(1,1,1, .1)';
        mainContent.style.background = 'rgba(1,1,1, .1)';
    }
});
downPanel.forEach(function (downPanelObject) {
    downPanelObject.style.display = 'none';
});
lineBetween.forEach(function (lineBetweenObject) {
    lineBetweenObject.style.opacity = '0';
});
// categoryContainer.forEach(categoryContainerObject => {
//     categoryContainerObject.style.marginTop = '122px';
// })
mainMenuButton.addEventListener('click', function (e) {
    if (activeV2) {
        menuHeader.style.opacity = '1';
        // menuHeader.style.maxHeight = '999px';
        menuHeader.style.transform = 'scaleY(1) translate(0%, 0%)';
        activeV2 = false;
    }
    else {
        menuHeader.style.opacity = '0';
        // menuHeader.style.maxHeight = '0px';
        menuHeader.style.transform = 'scaleY(0) translate(0%, -150%)';
        activeV2 = true;
    }
});
v1Switch.addEventListener('click', function (e) {
    ambientsMain.forEach(function (ambientsMainObject) {
        ambientsMainObject.style.display = 'none';
    });
    ambientsRecord.forEach(function (ambientsRecordObject) {
        mainContent.style.background = 'transparent';
        ambientsRecordObject.style.display = 'block';
    });
    mainContent.style.overflow = 'visible';
    downPanel.forEach(function (downPanelObject) {
        downPanelObject.style.display = 'block';
    });
    lineBetween.forEach(function (lineBetweenObject) {
        lineBetweenObject.style.opacity = '1';
    });
    mainOrderButton.style.display = 'none';
    fastRecordShell.style.width = '76%';
    fastRecordOutside.style.width = '100%';
    fastRecordOutside.style.borderRadius = '0px';
});
v2Switch.addEventListener('click', function (e) {
    ambientsMain.forEach(function (ambientsMainObject) {
        if (cpuCores <= 4) {
            mainContent.style.background = 'rgba(1,1,1, .1)';
            ambientsMainObject.style.display = 'none';
        }
        else {
            ambientsMainObject.style.display = 'block';
        }
    });
    ambientsRecord.forEach(function (ambientsRecordObject) {
        ambientsRecordObject.style.display = 'none';
    });
    mainContent.style.overflow = 'hidden';
    downPanel.forEach(function (downPanelObject) {
        downPanelObject.style.display = 'none';
    });
    lineBetween.forEach(function (lineBetweenObject) {
        lineBetweenObject.style.opacity = '0';
    });
    mainOrderButton.style.display = 'flex';
    fastRecordShell.style.width = '100%';
    fastRecordOutside.style.width = '';
    fastRecordOutside.style.borderRadius = '50px';
});
mainOrderButton.addEventListener('click', function () {
    recordPlace.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
    });
});
document.querySelectorAll('.order-btn').forEach(function (orderObject) {
    orderObject.addEventListener('click', function () {
        recordPlace.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    });
});
document.querySelector('.btn-order-main').addEventListener('click', function () {
    recordPlace.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
    });
});
