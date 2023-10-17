const dropList: NodeListOf<HTMLDivElement> = document.querySelectorAll('.drop-custom-shell'),
    svg: NodeListOf<SVGSVGElement> = document.querySelectorAll('.open-doc-svg'),
    sendLocal : SVGElement = document.querySelector('.record-btn-send') as SVGElement,
    downPanel : NodeListOf<HTMLDivElement> = document.querySelectorAll('.down-panel'),
    lineBetween: NodeListOf<HTMLDivElement> = document.querySelectorAll('.line-between-main-content'),
    categoryContainer: NodeListOf<HTMLDivElement> = document.querySelectorAll('.category'),
    mainMenuButton: HTMLImageElement = document.querySelector('.menu') as HTMLImageElement,
    cpuCores : number = navigator.hardwareConcurrency,
    ambientsRecord : NodeListOf<HTMLDivElement> = document.querySelectorAll('.image-ambient'),
    greenAmbientRecord : HTMLDivElement = document.querySelector('.green-ambient') as HTMLDivElement,
    redAmbientRecord : HTMLDivElement = document.querySelector('.red-ambient') as HTMLDivElement,
    yellowAmbientRecord : HTMLDivElement = document.querySelector('.yellow-ambient') as HTMLDivElement,
    ambientsMain : NodeListOf<HTMLDivElement> = document.querySelectorAll('.content-ambient'),
    mainOrderButton : HTMLDivElement = document.querySelector('.main-order-button-v2') as HTMLDivElement,
    fastRecordShell : HTMLDivElement = document.querySelector('.shell-fast-record-limit') as HTMLDivElement,
    fastRecordOutside : HTMLDivElement = document.querySelector('.fast-record') as HTMLDivElement,
    mainContent : HTMLDivElement = document.querySelector('.main-content') as HTMLDivElement,
    menuHeader : HTMLDivElement = document.querySelector('.menu-header') as HTMLDivElement,
    recordPlace : HTMLDivElement = document.querySelector('.fast-record') as HTMLDivElement,
    v1Switch : HTMLDivElement = document.querySelector('.version1') as HTMLDivElement,
    v2Switch : HTMLDivElement = document.querySelector('.version2') as HTMLDivElement,
    uaLanguageSwitch : HTMLDivElement = document.querySelector('.ukrainian') as HTMLDivElement,
    ruLanguageSwitch : HTMLDivElement = document.querySelector('.russian') as HTMLDivElement,
    enLanguageSwitch : HTMLDivElement = document.querySelector('.english') as HTMLDivElement;
let activeV2 : boolean = true;

interface User{
    email: string;
    name: string;
    phoneNumber: string;
}

function addUserToLocalStorage(user: User) {
    let users: User[] = [];

    const existingData = localStorage.getItem('../data/storage/users');
    if (existingData) {
        users = JSON.parse(existingData);
    }

    users.push(user);

    localStorage.setItem('../data/storage/users', JSON.stringify(users));
}

function sortUsersByName(): User[] {
    const existingData = localStorage.getItem('../data/storage/users');
    if (existingData) {
        const users: User[] = JSON.parse(existingData);

        users.sort((a, b) => a.name.localeCompare(b.name));

        return users;
    } 
    else {
        return [];
    }
}

dropList.forEach(Object => {
    Object.addEventListener('click', () => {
        const category: HTMLElement = Object.closest('.category') as HTMLDivElement;
        const _target: HTMLDivElement = category?.querySelector('.information-drop') as HTMLDivElement;
        const svg: SVGSVGElement = category?.querySelector('.open-doc-svg') as SVGSVGElement;
        const isActive: boolean = Object.getAttribute('data-active') === 'true';

        if (_target && svg) {
            if (!isActive) {
                _target.style.maxHeight = '999px';
                svg.style.transform = 'rotate(45deg)';
                Object.setAttribute('data-active', 'true');
            } else {
                _target.style.maxHeight = '0';
                svg.style.transform = 'rotate(0deg)';
                Object.setAttribute('data-active', 'false');
            }
        }
    });
    Object.addEventListener('mouseover', () => {
        const category: HTMLElement = Object.closest('.category') as HTMLDivElement;
        const svg: SVGSVGElement = category?.querySelector('.open-doc-svg') as SVGSVGElement;
        svg.style.transform = 'rotate(15deg)';
    });
    Object.addEventListener('mouseout', () => {
        const category: HTMLElement = Object.closest('.category') as HTMLDivElement;
        const svg: SVGSVGElement = category?.querySelector('.open-doc-svg') as SVGSVGElement;
        const isActive: boolean = Object.getAttribute('data-active') === 'true';
        if (!isActive){
            svg.style.transform = 'rotate(0deg)';
        }
        else{
            svg.style.transform = 'rotate(45deg)';
        }
    })
});

sendLocal.addEventListener('click', () => {
    const email: HTMLInputElement = document.querySelector('.mail') as HTMLInputElement;
    const name: HTMLInputElement = document.querySelector('.name') as HTMLInputElement;
    const number: HTMLInputElement = document.querySelector('.number-in') as HTMLInputElement;

    if (email.value === '' || name.value === '' || number.value === '') {
        alert('Error of Sending Data. One of the input fields is empty');
    } else {
        const dataToSend = {
            email: email.value,
            name: name.value,
            phoneNumber: number.value
        };

        addUserToLocalStorage(dataToSend);
        const sortedUsers = sortUsersByName();
        console.log(sortedUsers);
    }
});

window.addEventListener('load', () => {
    if (cpuCores <= 4){
        greenAmbientRecord.style.display = 'none';
        redAmbientRecord.style.display = 'none';
        yellowAmbientRecord.style.display = 'none';
        ambientsMain.forEach(ambientsMainObject => {
            ambientsMainObject.style.display = 'none';
        })
        recordPlace.style.background = 'rgba(1,1,1, .1)';
        mainContent.style.background = 'rgba(1,1,1, .1)';
    }
});

downPanel.forEach(downPanelObject => {
    downPanelObject.style.display = 'none';
});

lineBetween.forEach(lineBetweenObject => {
    lineBetweenObject.style.opacity = '0';
})

// categoryContainer.forEach(categoryContainerObject => {
//     categoryContainerObject.style.marginTop = '122px';
// })

mainMenuButton.addEventListener('click', (e : Event) => {
    if (activeV2){
        menuHeader.style.opacity = '1';
        // menuHeader.style.maxHeight = '999px';
        menuHeader.style.transform = 'scaleY(1) translate(0%, 0%)';
        activeV2 = false;
    }
    else{
        menuHeader.style.opacity = '0';
        // menuHeader.style.maxHeight = '0px';
        menuHeader.style.transform = 'scaleY(0) translate(0%, -150%)';
        activeV2 = true;
    }
})

v1Switch.addEventListener('click', (e : Event) => {
    ambientsMain.forEach(ambientsMainObject => {
        ambientsMainObject.style.display = 'none';
    });
    ambientsRecord.forEach(ambientsRecordObject => {
        mainContent.style.background = 'transparent'
        ambientsRecordObject.style.display = 'block';
    })

    mainContent.style.overflow = 'visible';

    downPanel.forEach(downPanelObject => {
        downPanelObject.style.display = 'block';
    });
    
    lineBetween.forEach(lineBetweenObject => {
        lineBetweenObject.style.opacity = '1';
    })

    mainOrderButton.style.display = 'none';

    fastRecordShell.style.width = '76%';
    fastRecordOutside.style.width = '100%';
    fastRecordOutside.style.borderRadius = '0px';
})

v2Switch.addEventListener('click', (e : Event) => {
    ambientsMain.forEach(ambientsMainObject => {
        if (cpuCores <= 4){
            mainContent.style.background = 'rgba(1,1,1, .1)';
            ambientsMainObject.style.display = 'none';
        }
        else{
            ambientsMainObject.style.display = 'block';
        }
    });
    ambientsRecord.forEach(ambientsRecordObject => {
        ambientsRecordObject.style.display = 'none';
    })

    mainContent.style.overflow = 'hidden';

    downPanel.forEach(downPanelObject => {
        downPanelObject.style.display = 'none';
    });
    
    lineBetween.forEach(lineBetweenObject => {
        lineBetweenObject.style.opacity = '0';
    })

    mainOrderButton.style.display = 'flex';

    fastRecordShell.style.width = '100%';
    fastRecordOutside.style.width = '';
    fastRecordOutside.style.borderRadius = '50px';
})

mainOrderButton.addEventListener('click', () => {
    recordPlace.scrollIntoView({
        behavior: 'smooth',
        block: 'start', 
    });
})

document.querySelectorAll('.order-btn')!.forEach(orderObject => {
    orderObject.addEventListener('click', () => {
        recordPlace.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    })
})

document.querySelector('.btn-order-main')!.addEventListener('click', () => {
    recordPlace.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
    });
})