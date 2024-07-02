//POST請求
let postAxios = async function (url, data, resCatch) {
    let responseData = null;
    await axios({
        method: 'POST',
        data: data,
        url: url,
        contentType: 'application/json; charset=UTF-8',
    }).then(res => {
        console.log('postAxios_res', res);
        if (resCatch) {
            if (res.data.returnCode === '0000') {
                responseData = res.data;
            } else {
                responseData = null;
                errorAlert('postAxios Error');
            }
        } else {
            responseData = res.data;
        }
    }).catch(err => {
        console.log('postAxios', err);
        errorAlert('postAxios Error');
        responseData = null;
    })
    return responseData;
}


// 跳轉頁面
let responseRedirect = async function (redirectUrl) {
    axios.get(redirectUrl)
        .then(function (response) {
            window.location = (redirectUrl);
        })
        .catch(function (err) {
            console.log('responseRedirect', err);
            errorAlert('responseRedirect Error');
        })

}

//thymeleaf頁面
let thymeleafPage = async function (url, data) {
    let responseData = null;
    await axios({
        method: 'POST',
        url: url,
        data: data,
        contentType: 'application/json; charset=UTF-8',
    }).then(res => {
        console.log('thymeleafPage Success', res);
        responseData
        responseData = res.data;
    }).catch(err => {
        console.log('thymeleafPageErr', err);
        errorAlert('thymeleafPageErr Error');
    })
    return responseData;
}

//Axios error alert
let errorAlert = function (errStr) {
    Swal.fire({
        html: '<div class="mt-3">' +
            '<lord-icon src="https://cdn.lordicon.com/tdrtiskw.json" trigger="loop" colors="primary:#f7b84b,secondary:#f06548" style="width:230px;height:230px"></lord-icon>' +
            '<div class="fs-15 mx-5">' +
            '<h4>Oops...! Something went Wrong !</h4>' +
            '<p class="text-muted mx-4 mb-0" >' + errStr + '</p>' +
            '</div>' +
            '</div>',
        showCancelButton: false,
        confirmButtonClass: 'btn btn-link link-danger fw-medium',
        confirmButtonText: '',
        cancelButtonClass: 'btn btn-danger w-xs mb-1',
        buttonsStyling: false,
        showCloseButton: true
    })
}