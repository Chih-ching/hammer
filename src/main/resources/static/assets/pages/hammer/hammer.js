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
let addHammerList = async function (dataArr) {//單筆
    allData = allData.concat(dataArr);
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
    addHammerLists();

}
let addHammerLists = async function () { //多筆
    $('#hammersInfo').empty(); //清空所有清單
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

let quickAddModalSubmit = function () {
    updateAllData();
    try {
        let modalDataArr = [];
        if (!$('#quickAddContent').val().startsWith('#')) throw "Exception";
        $('#quickAddContent').val().split('#').forEach((infos, i) => {
            if (i > 0) {
                let name = '';
                let price = 0;
                let tagArr = [];
                infos.split(/\s+/).forEach((info, idx) => {
                    if (idx == 0) name = info.trim();
                    if (idx == 1) {
                        if(!info.startsWith('$'))throw "Exception";
                        if(isNaN(Number(info.substr(1).trim())))throw "Exception";
                        price = parseInt(info.substr(1).trim());
                    }
                    if (idx > 1 && info.trim() != '') tagArr.push(info.trim());
                });
                modalDataArr.push(new hammerModel(name, price, tagArr, true, 'hammer' + parseInt(allData.length + i)))
            }
        });
        allData = allData.concat(modalDataArr);
        addHammerLists().then(res=>{
            $('#quickAddModal').modal('hide');
        }).catch(e => {
            alert('錯誤！');
        });
    } catch (e) {
        alert('解析錯誤！');
    }
}

let createReport=async function () {
    updateAllData();
    console.log(allData);
    await thymeleafPage("/createReport", allData).then(res => {
        $('#reportBlock').append(res);
        const content = document.querySelector("#reportBlock").innerHTML;
        const newPage = window.open("", "", "width=1000,height=500");
        newPage.document.write(content);
        newPage.print();
    })


}