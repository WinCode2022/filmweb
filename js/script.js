

//! vekaluma kinoneri janrer@ u sarkum buutner poiski hamar
export default function janrItem() {
    let catal = document.querySelector('.catalog');
    let janrArr = [];
    filmArr.forEach(i => {
        i.forEach(e => {
            janrArr.push(...e.janr)
        })
    })
    janrArr = Array.from(new Set(janrArr));
    janrArr.forEach(it => {
        catal.innerHTML += `<span class="janItem">${it}</span>`
    })
    let janItem = document.querySelectorAll('.janItem');
    janItem.forEach(item => {
        item.addEventListener('click', (e) => {
            let targ = e.target;
            targ.classList.toggle('act')
        })
    })
}

