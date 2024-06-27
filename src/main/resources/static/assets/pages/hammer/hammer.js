$(document).ready(async function () {
})


function hammerModel(name, price, accountList) {
    this.name = name;
    this.price = price;
    this.accountList = accountList;
}

let addHammerList = async function () {
    let hammerList = getHammerList();
    hammerList.push(new hammerModel("", 0, []));
    $('#hammersInfo').empty();
    await thymeleafPage("/hammerList", hammerList).then(res => {
        $("#hammersInfo").append(res)
        createTagSelect(hammerList.length);
    })

}

let getHammerList = function () {
    let data = [];
    let hammerNum=$(".hammers").length;
    if(hammerNum>0){
        for(let i = 0; i < hammerNum; i++){
            let name=$('.hammers').eq(i).find('.nameInput').val();
            let price=$('.hammers').eq(i).find('.priceInput').val();
            let tagArr=[];
        }
    }
    data.push(new hammerModel("dsf", 10, []));

    return data;

}

let delList = function (id) {
    alert("del: "+id)
}

let batchAdd = function (id) {
    alert("batchAdd: "+id)
}


let createTagSelect=function(num){
    for (let i = 0; i < num; i++) {
        new Choices($('.tagInput')[i],{
            removeItemButton: true,
        });
    }
}
