const basketBut = document.querySelectorAll('.card__button');
const finalPrice = document.querySelector('.basket__price');
const basketQuantity = document.querySelector('.basket__quantity');
const basketMain = document.querySelector('.basket__main');
const basket = document.querySelector('.basket');
 
let price = 0;
let randomId = 0;

const priceWithoutSpaces = (str) => {
    return str.replace(/\s/g, '');
};

const normalPrice = (str) => {
    return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};

const declOfNum = (number, titles) => {
    let cases = [2, 0, 1, 1, 1, 2];  
    return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];  
}

const plusePrice = (sums) => {
    return price += sums;
} 

const minusPrice = (sums) => {
    return price -= sums;
} 

const finalPrices = () => {
    finalPrice.textContent = `${normalPrice(price)}₽`;
}

const quantitys = () => {
    let qua = basketMain.children.length;
    basketQuantity.textContent = qua;

    qua > 0 ? basket.classList.add('active') : basket.classList.remove('active')
}

const render = (img, title, price, id) => {
    return  `
    <div class="basket__cart" data-id="${id}">

        <div class="basket__main-info">
            <img src="${img}" alt="basket-img" class="basket__img">
            <div class="basket__block-p">
                <div class="basket__prod-t">${title}</div>
                <div class="basket__p-c">${normalPrice(price)} ₽</div>
            </div>
        </div>

        <button class="basket__del">
            <img src="./img/Delete.svg" alt="del-cart">
        </button>

    </div>
    `;
}

const delP = (dels) => {
    let pms = parseInt(priceWithoutSpaces(dels.querySelector('.basket__p-c').textContent))
    minusPrice(pms);
    finalPrices();
    dels.remove();
    quantitys();
}

basketBut.forEach(e => {
    e.closest('.card').setAttribute('data-id', randomId++);
    e.addEventListener('click', el => {
        let mainCart = el.currentTarget;
        let parent = mainCart.closest('.card');
        let id = parent.dataset.id;
        let img = parent.querySelector('.card__img').getAttribute('src');
        let title = parent.querySelector('.card__title').textContent;
        let price = parseInt(priceWithoutSpaces(parent.querySelector('.card__price').textContent));
        
        plusePrice(price);
        finalPrices();
        basketMain.insertAdjacentHTML('afterbegin', render(img, title, price, id));
        quantitys();
    });
});

basketMain.addEventListener('click', e => {
    if(e.target.classList.contains('basket__del')) {
        delP(e.target.closest('.basket__cart'));
    }
});

// add cart

const showClick = document.querySelector('.button');
const carts = document.querySelectorAll('.card').length;
let views = 6;

showClick.addEventListener('click', () => {
    views += 3;

    const array = Array.from(document.querySelector('.cards').children);
    const view =  array.slice(0, views);

    view.forEach(el => el.classList.add('adds'));

    if (view.length === carts) {
        showClick.style.display = 'none';
    }
});
