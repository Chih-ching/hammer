$(document).ready(async function () {
})


function hammerModel(name, num, price, accountList) {
    this.name = name;
    this.num = num;
    this.price = price;
    this.accountList = accountList;
}

let quickAddHammerList = function () {
    $('#quickAddModal').modal({backdrop: 'static', keyboard: false});
    $('#quickAddModal').modal('show');
}

let flag = true;
let errMsg = '';
let modalDataArr = [];
let quickAddModalSubmit = function () {
    flag = true;
    try {
        modalDataArr = [];
        let products = $('#quickAddContent').val().split('#');
        outerLoop:
            for (let i = 0; i < products.length; i++) {
                let product = products[i];
                if (i > 0) {
                    let name = null;
                    let num = null;
                    let price = null;
                    let tagArr = [];
                    errMsg = null;
                    let lines = product.split(/\n+/);
                    for (let idx = 0; idx < lines.length; idx++) {
                        let line = lines[idx].trim();
                        if (idx == 0 && flag) {
                            name = parseName(line);
                        }
                        if (idx == 0 && flag) {
                            num = parseNum(line);
                        }
                        if (idx == 1 && flag) {
                            price = parsePrice(line);
                        }
                        if (idx > 1 && line != '' && flag && tagArr.length < num) {
                            tagArr.push(parseAccount(line));
                        }
                    }
                    if (!flag || !name || !num || !price) {
                        flag = false;
                        parseErr(lines[0], errMsg);
                        break outerLoop;
                    }
                    modalDataArr.push(new hammerModel(name, num, price, tagArr))
                }
            }
        console.log("flag=" + flag);
        if (flag) {
            thymeleafPage("/hammerList", modalDataArr).then(res => {
                $('#hammersInfo').empty();
                $('#hammersInfo').append(res);
                $('#cardNum').text($('tbody tr').length);
                $('#quickAddModal').modal('hide');
            }).catch(e => {
                alert('解析錯誤！');
            })
        }
    } catch (e) {
        console.log(e);
        alert('解析錯誤！');
    }
}

let parseErr = function (errMsg1, errMsg2) {
    alert('error:  #' + errMsg1 + ' \n' + errMsg2);
}

function parseName(info) {
    errMsg = '商品名稱'
    let name = null;
    try {
        name=info.replaceAll('：', ':');
    } catch (e) {
        flag = false;
    }
    return name
}

function parseNum(info) {
    errMsg = '數量'
    flag = false
    let num = null;
    try {
        info=info.replaceAll('：', ':');
        let text = info.split(":")[1].replaceAll(" ", "");
        text=text.replace('：', ':');
        let match = text.match(/(\d+)/);
        let result;
        if (match) {
            result = match[1];
        }else{
            result = text;
        }
        const isAllDigits = /^\d+$/.test(result);
        if(isAllDigits){
            num=result;
            flag=true;
        }
    } catch (e) {
        flag = false
    }
    return num
}

function parsePrice(info) {
    errMsg = '價格'
    let price = null;
    try {
        if (!info.startsWith('$')) {
            flag = false;
        }
        if (isNaN(Number(info.substr(1)))) {
            flag = false;
        }
        price = parseInt(info.substr(1));
    } catch (e) {
        flag = false;
    }
    return price
}

function parseAccount(info) {
    errMsg = '帳號'
    if (info.startsWith('$')) {
        flag = false;
    }
    //if(有中文字)
    if (/[\u4E00-\u9FA5]+/g.test(info)) {
        flag = false;
    }
    return info;
}

let createReport = async function () {
    $('#reportBlock').empty();
    await thymeleafPage("/createReport", modalDataArr).then(res => {
        $('#reportBlock').append(res);
        printJS({
            printable: 'reportBlock',
            type: 'html',
            scanStyles: false,
            css: ["/assets/css/bootstrap.min.css"],
            documentTitle: ''
        });
    })
}

function onSignIn(googleUser) {
    let profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}