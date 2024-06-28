$(document).ready(async function () {
})


function hammerModel(name, price, accountList, show, id) {
    this.name = name;
    this.price = price;
    this.accountList = accountList;
    this.show = show;
    this.id = id;
}

let allData = [];
let addHammerList = async function () {
    let newInfo = new hammerModel("", 0, [], true, 'hammer' + parseInt(allData.length + 1));
    allData.push(newInfo);
    await thymeleafPage("/hammerList", [newInfo]).then(res => {
        $('#hammersInfo').append(res);
        new Choices($('.tagInput')[$(".hammers").length - 1], {
            removeItemButton: true,
        });
        $('.hammers').last().find('.card-title').text('# ' + $(".hammers").length);
    })

}

let updateAllData = function () {
    let hammerNum = $(".hammers").length;
    if (hammerNum > 0) {
        for (let i = 0; i < hammerNum; i++) {
            let name = $('.hammers').eq(i).find('.nameInput').val();
            let price = $('.hammers').eq(i).find('.priceInput').val();
            let tagArr = [];
            $('.hammers').eq(i).find('.choices__item--selectable').each(function () {
                tagArr.push($(this).attr('data-value'));
            });
            allData.forEach(data => {
                if (data.id === $('.hammers').eq(i).find('.card').attr('id')) {
                    data.name = name
                    data.price = price
                    data.accountList = tagArr;
                }
            })
        }
    }
}

let delList = async function (id) {
    updateAllData();
    allData.forEach(data => {
        if (data.id === id) {
            data.show = false;
        }
    })
    $('#hammersInfo').empty();
    await thymeleafPage("/hammerList", allData).then(res => {
        $('#hammersInfo').append(res);
        for (let i = 0; i < $(".hammers").length; i++) {
            let element = $('.hammers').eq(i).find('.card');
            element.find('.card-title').text('# ' + [i + 1]);
            let target=allData.filter(data => {return data.id===element.attr('id')});
            new Choices($('.tagInput')[i], {
                removeItemButton: true,

            }).setValue(target[0].accountList);
        }
    })
}

let batchAdd = function (id) {
    alert("batchAdd: " + id)
}

