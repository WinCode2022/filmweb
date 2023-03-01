import data from '../data.json'assert { type: 'json' }
filmArr = data;
import janrItem from "./script.js";
const filmBord = document.querySelector('.filmbord');
const pgContDiv = document.querySelector('.pageControl');
const navIt = document.querySelectorAll('.navItem');
const content = document.querySelector('.content');
const pop = document.querySelector('#popUp');
const filmInfo = document.querySelector('.filmInf');
const popBody = document.querySelector('.popBody');
const closeBt = document.querySelector('.closeBt');


closeBt.addEventListener('click', (e) => {
    pop.classList.remove('popOpen');
})

popBody.addEventListener('click', (e) => {
    if (!e.target.closest('.popCantent')) {
        pop.classList.remove('popOpen')
    }
})


loadPg(0)

function createPgControl() {
    pgContDiv.innerHTML = '';
    filmArr.forEach((it, ind) => {
        if (ind == 0) pgContDiv.innerHTML += `<span class="pg curPg" id='${ind}'></span>`
        else pgContDiv.innerHTML += `<span class="pg" id='${ind}'></span>`
    })
}
createPgControl()


const pgControlItem = document.querySelectorAll('.pg');
const goToPg = () => {
    pgControlItem.forEach(it => {
        it.addEventListener('click', (e) => {
            console.log(e.target.id);
            pgControlItem.forEach(i => {
                i.classList.remove('curPg')
            });
            e.target.classList.add('curPg')
            loadPg(e.target.id)
        })
    })

}

function asd() {
    let cards = document.querySelectorAll('.card');
    cards.forEach(item => {
        item.addEventListener('click', (event) => {
            pop.classList.add('popOpen');
            let { img, title, url, opis, janr } = filmArr[item.id.split('.')[0]][item.id.split('.')[1]];
            console.log(img, title, url, opis, janr);
            createFilmPop(url, img, title, opis, janr)
        })
    })
}
function createFilmPop(url, img, title, opis, janr) {
    filmInfo.innerHTML = ` <div class="imgWrap">
    <a href="${url}">
    <i class="fa-solid fa-circle-play play"></i>
     </a>
   <img src="${img}"
       alt="img">
</div>
<div class="descr">
   <h2 class="descIt">${title}</h2>
   <table>
       <tr>
           <td class="descIt">Жанр: </td>
           <td>${janr.join(' ')}</td>
       </tr>
       <tr>
           <td class="descIt">Описанте: </td>
           <td>${opis}</td>
       </tr>
   </table>
</div>`
}
function loadPg(x) {
    filmBord.innerHTML = '';
    for (let i = 0; i < filmArr[x].length; i++) {
        filmBord.innerHTML += `<div class="card" id='${x}.${i}'>
    <span class="add">
        <i class="fa-solid fa-bookmark"></i>
    </span>
    <img src="${filmArr[x][i].img}"
        alt="img">
    <div class="des">
        <h5 class="name">${filmArr[x][i].title}</h5>
    </div>
    </div>`
    }
    asd()
    content.scrollTo(0, 0)
}
goToPg()





navIt.forEach(it => {
    it.addEventListener('click', meniuClick)
})
function meniuClick(e) {
    let item = e.target;
    console.log(item.id);
    navIt.forEach(it => {
        it.classList.remove('activ')
    })
    item.classList.add('activ');

    if (item.id == 'mainPg') {
        location.reload();
    }
    else {
        pop.classList.add('popOpen');
        if (item.id == 'serch') {
            filmInfo.innerHTML = ` 
    <div class="serch">
            <div class="serchBar">
                <input type="text" class='serchArea'>
                <span class="find byName"><i class="fa-solid fa-magnifying-glass"></i></span>
            </div>
            <div class='result'>
              
            </div>
            
        <div class="janrSerch">
            <div class="catalog">   </div>
            <span class='findByJanr find byJanr'><i class="fa-solid fa-magnifying-glass"></i></span>
        </div>
    </div>`;
            janrItem();
            let findBName = document.querySelector('.byName');
            findBName.addEventListener('click', serchingName)
        }

    }
}

function serchingName() {
    let resultsOfSerching = document.querySelector('.result')
    let machedFilms = [];
    let inp = document.querySelector('.serchArea');
    let fReg = new RegExp(`${inp.value.toLocaleLowerCase()}`);
    filmArr.forEach(pages => {
        pages.forEach(f => {
            if (f.title.toLocaleLowerCase().match(fReg)) {
                machedFilms.push(f);
            }
        })
    })
    shoeMachedFilms()
    function shoeMachedFilms() {
        resultsOfSerching.innerHTML = '';
        machedFilms.forEach(it => {
            let { img, url, title } = it;
            resultsOfSerching.innerHTML += ` <div class="machCard">
            <img class='machFPoster'src="${img}" alt="img">
            <a href="${url}"><h5 class='machFTit'>${title}</h5></a>
        </div>`
        })

    }
}