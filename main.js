let bychkoMain = JSON.parse(localStorage.getItem('bychkoMain')) || { coin: 0, perTap: 1, batteryCharge: 100, max_batteryCharge: 100, batteryCharging: 1000, autoclicker: false};


// localStorage.clear()


function random(to, from){
    let main
    do{
        main = Math.random() * from
    } while(main < to)
    return Math.floor(main)
}
let mouseX = 0;
let mouseY = 0;

document.onmousemove = function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
};
function get_x() {
    return mouseX;
}
function get_y() {
    return mouseY;
}


function clickCoin(top, left){
    if(bychkoMain.batteryCharge > 0){
        const id = `key_${String.fromCharCode(random(97, 122), random(97, 122), random(97, 122))}`
        $('body').append(`<div class="particle" id="${id}"></div>`)
        $(`#${id}`).css('position', 'fixed')
        $(`#${id}`).css('top', top)
        $(`#${id}`).css('left', left)
        $(`#${id}`).css('top', parseInt($(`#${id}`).css('top')) - 100 + 'px');
    
        $(`#${id}`).text(`+${bychkoMain.perTap}`)
        setTimeout(function(){
            $(`#${id}`).css('opacity', 0)
            setTimeout(function(){
                $(`#${id}`).remove()
            }, 500)
    
        }, 1000)
    
    
        $('.coin').css('transform', 'scale(0.9)')
        $('.coin').css('box-shadow', '0 0 10px 5px #00123a')
        setTimeout(function(){
            $('.coin').css('transform', 'scale(1)')
            $('.coin').css('boxShadow', '0 0 20px 15px #00123a')
        }, 100)
        bychkoMain.coin += bychkoMain.perTap;
        bychkoMain.batteryCharge--
        localStorage.setItem('bychkoMain', JSON.stringify(bychkoMain));
        $('#numberCoin').text(bychkoMain.coin)
    }
}

$('.coin').click(function(){
    clickCoin(get_y(), get_x())
})
$('#numberCoin').text(bychkoMain.coin)


$('#perTap_btn').click(function(){
    bychkoMain.perTap++
})
$('#clearAll').click(function(){
    window.localStorage.clear();

    bychkoMain = { coin: 0, perTap: 1 };
    $('#numberCoin').text(bychkoMain.coin);
    localStorage.setItem('bychkoMain', JSON.stringify(bychkoMain));
})

let isOpenShop = false
// $('.btnContainer').mouseenter(function(){
//     if(!isOpenShop){
//         $('.btnContainer').css('top', '2%')
//         isOpenShop = true
//     }
// })
// $('.wrap').mouseenter(function(){
//     if(isOpenShop){
//         $('.btnContainer').css('top', '98%')
//         isOpenShop = false
//     }
// })

setInterval(function(){
    // $('.coinBar div').css('width', Math.min(((bychkoMain.coin / 500) * 100), 100) + '%')
    $('#batterCharge').text(`${bychkoMain.batteryCharge}/${bychkoMain.max_batteryCharge}`)
}, 100)
setInterval(function(){
    bychkoMain.batteryCharge = Math.min(bychkoMain.batteryCharge, bychkoMain.max_batteryCharge - 1)
    bychkoMain.batteryCharge++
    
}, bychkoMain.batteryCharging)


$('#autoclicker_btn').click(function(){
    if(bychkoMain.coin < 2000){
        alert('треба 2000 коін')
    } else{
        bychkoMain.coin -= 2000
        bychkoMain.autoclicker = true

        setInterval(function(){
            clickCoin((window.innerHeight / 2) - 100, window.innerWidth / 2)
        }, 1500)
    }
})

if(bychkoMain.autoclicker == true){
    setInterval(function(){
        clickCoin((window.innerHeight / 2) - 100, window.innerWidth / 2)
    }, 1500)
}


document.addEventListener('scroll', function () {
    if (window.scrollY == 0) {
        $('.btnContainer').css('top', '2%')
        isOpenShop = true
    } else if(window.scrollY <= 1){
            $('.btnContainer').css('top', '98%')
            isOpenShop = false
    }
});