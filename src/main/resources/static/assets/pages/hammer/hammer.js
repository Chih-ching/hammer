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
let addHammerButton = function () {
    addHammerList([new hammerModel("", 0, [], true, 'hammer' + parseInt(allData.length + 1))])
        .then(r => {
    })
        .catch(e => {
            alert("error")
        });
}
let addHammerList = async function (dataArr) {
    allData=allData.concat(dataArr);
    await thymeleafPage("/hammerList", dataArr).then(res => {
        $('#hammersInfo').append(res);
        $('.hammers').last().find('.card-title').text('# ' + $(".hammers").length);
        $('#cardNum').text($(".hammers").length);
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
            let target = allData.filter(data => {
                return data.id === element.attr('id')
            });
            new Choices($('.tagInput')[i], {}).setValue(target[0].accountList).disable();
            element.find('.accountDiv .badge').text(target[0].accountList.length);
        }
    }).finally(() => {
        $('#cardNum').text($(".hammers").length);
    })
}

let batchAddTargetId = '';
let batchAdd = function (id) {
    updateAllData();
    let tagArr = [];
    allData.forEach(data => {
        if (data.id === id) {
            tagArr = data.accountList;
        }
    });
    let tagWord = tagArr.join("\n");
    $('#acccountList').val(tagWord);
    $('#batchAddModal').modal({backdrop: 'static', keyboard: false});
    $('#batchAddModal').modal('show');
    batchAddTargetId = id;
}

let batchAddModalSubmit = function () {
    let id = '#' + batchAddTargetId;
    let tagArr = [];
    let accountList = $('#acccountList').val();
    accountList.split(/\s+/).forEach(account => {
        if (account.trim() !== '') {
            tagArr.push(account.trim());
        }
    })
    $(id).find('.tagBlock').empty();
    $(id).find('.tagBlock').append('<input type="text" class="form-control tagInput">');
    new Choices($(id).find('.tagInput')[0], {}).setValue(tagArr).disable();
    $(id).find('.accountDiv .badge').text(tagArr.length);
    $('#batchAddModal').modal('hide');

}

let quickAddHammerList = function () {
    $('#quickAddContent').val('');
    $('#quickAddModal').modal({backdrop: 'static', keyboard: false});
    $('#quickAddModal').modal('show');
}

// let quickAddModalSubmit = function () {
//     try {
//         let infoList = $('#quickAddContent').val().split('#');
//         infoList.forEach(infos => {
//             let name = '';
//             let price = 0;
//             let tagArr = [];
//             infos.split(/\s+/).forEach(info, idx => {
//                 if (idx == 0) {
//                     name = info;
//                 }
//                 if (idx == 1) {
//                     price = parseInt(info)
//                 }
//                 if (idx > 1) {
//                     tagArr.push(info)
//                 }
//             })
//             addHammerList();
//         })
//     } catch (e) {
//
//     }
// }