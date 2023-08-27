/*Show main section and Hide other section*/
$(document).ready(function () {
    $('#Dashbordform').css('display', 'block')
    $('#Customerform').css('display', 'none');
    $('#Itemform').css('display', 'none');
    $('#PlaceOrderform').css('display', 'none');
    $('#AllOrderform').css('display', 'none');
});

/*Show clicking section*/

/*show dashboard section and hide others*/
$('#home').click(function () {
    $('#Dashbordform').css('display', 'block')
    $('#Customerform').css('display', 'none');
    $('#Itemform').css('display', 'none');
    $('#PlaceOrderform').css('display', 'none');
    $('#AllOrderform').css('display', 'none');
});

/*show customer section and hide others*/
$('#customer').click(function () {
    $('#Dashbordform').css('display', 'none')
    $('#Customerform').css('display', 'block');
    $('#Itemform').css('display', 'none');
    $('#PlaceOrderform').css('display', 'none');
    $('#AllOrderform').css('display', 'none');
});

/*show item section and hide others*/
$('#item').click(function () {
    $('#Dashbordform').css('display', 'none')
    $('#Customerform').css('display', 'none');
    $('#Itemform').css('display', 'block');
    $('#PlaceOrderform').css('display', 'none');
    $('#AllOrderform').css('display', 'none');
});

/*show placeOrder section and hide others*/
$('#placeOrder').click(function () {
    $('#Dashbordform').css('display', 'none')
    $('#Customerform').css('display', 'none');
    $('#Itemform').css('display', 'none');
    $('#PlaceOrderform').css('display', 'block');
    $('#AllOrderform').css('display', 'none');
});

/*show All Order section and hide others*/
$('#allOrder').click(function () {
    $('#Dashbordform').css('display', 'none')
    $('#Customerform').css('display', 'none');
    $('#Itemform').css('display', 'none');
    $('#PlaceOrderform').css('display', 'none');
    $('#AllOrderform').css('display', 'block');
});


let cus = /^(C00-)[0-9]{3}$/;

$("#txtCustomerID").keyup(function (event) {
    cus = /^(C00-)[0-9]{3}$/;
    let b = cus.test($("#txtCustomerID").val());
    if (b) {
        $("#txtCustomerID").css("border", "2px solid green");
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {

            $("#txtCustomerName").focus();
        }


    } else {
        $("#txtCustomerID").css("border", "2px solid red");
    }

});

$("#txtCustomerName").keyup(function (event) {

    let check = /[a-z]{5}/.test($("#txtCustomerName").val())

    if (check) {
        $("#txtCustomerName").css("border", "2px solid green");
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            $("#txtCustomerAddress").focus();

        }

    } else {
        $("#txtCustomerName").css("border", "2px solid red");
    }
});

$("#txtCustomerAddress").keyup(function (event) {

    let check = /[a-z]{5}/.test($("#txtCustomerAddress").val())

    if (check) {
        $("#txtCustomerAddress").css("border", "2px solid green");
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            $("#txtCustomerSalary").focus();

        }

    } else {
        $("#txtCustomerAddress").css("border", "2px solid red");
    }
});

$("#txtCustomerSalary").keyup(function (event) {

    let check = /('(?!0$)[0-9]+(?:\\.[0-9]+)?')/.test($("#txtCustomerSalary").val())

    if (check) {
        $("#txtCustomerAddress").css("border", "2px solid green");
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            $("#btnSaveCustomer").focus();

        }

    } else {
        $("#txtCustomerSalary").css("border", "2px solid red");
    }
});


/*In class assignment*/


// error

let cDetails = [];
$("#btnSaveCustomer").click(function () {
        let customerID = $("#txtCustomerID").val();
        let customerName = $("#txtCustomerName").val();
        let customerAddress = $("#txtCustomerAddress").val();
        let customerSalary = $("#txtCustomerSalary").val();
        // let customerID = $("#txtCustomerID").val();


        let cust = {customerID, customerName, customerAddress, customerSalary};
        let number = cDetails.push(cust);
        if (number != 0) {
            clearCustomerTextField();
        }

        loadAllCustomers();
        customerTableSelect();
    }
    // cDetails = [customerID, customerName, customerAddress, customerSalary];
    // let row = `<tr><td>${customerID}</td><td>${customerName}</td><td>${customerAddress}</td><td>${customerSalary}</td></tr>`;
    //  let row = `<tr><td>${cDetails}</td><td>${cDetails[1]}</td><td>${cDetails[2]}</td><td>${cDetails[3]}</td></tr>`;


    // $("#tblCustomer").append(row);


);


function clearCustomerTextField() {
    $("#txtCustomerID").val("");
    $("#txtCustomerName").val("");
    $("#txtCustomerAddress").val("");
    $("#txtCustomerSalary").val("");
    $("#txtCustomerID").focus();

}

function clearItemTextField() {
    $("#txtItemCode").val("");
    $("#txtItemName").val("");
    $("#txtUnitPrice").val("");
    $("#txtQTY").val("");
    $("#txtItemCode").focus();

}


//laod all customer data to table

$("#btnLoadAll").click(function () {
    $("#tblCustomer").empty();
    for (let i = 0; i < cDetails.length; i++) {
        let id = cDetails[i].customerID;
        let name = cDetails[i].customerName;
        let address = cDetails[i].customerAddress;
        let salary = cDetails[i].customerSalary;


        let row = `<tr><td>${id}</td><td>${name}</td><td>${address}</td><td>${salary}</td></tr>`;


        $("#tblCustomer").append(row);
    }
    customerTableSelect();

});

let itemDetails = [];
$("#btnSaveItem").click(function () {
    let itemCode = $("#txtItemCode").val();
    let itemName = $("#txtItemName").val();
    let itemQty = $("#txtQTY").val();
    let itemUnitePrice = $("#txtUnitPrice").val();

    let item = {itemCode, itemName, itemQty, itemUnitePrice};
    let number1 = itemDetails.push(item);
    if (number1 != 0) {
        clearItemTextField();
    }
    loadAllItem();
    ItemTableSelect();
});

$("#btnLoadAllItem").click(function () {
    $("#tblItems").empty();
    for (let j = 0; j < itemDetails.length; j++) {
        let code = itemDetails[j].itemCode;
        let iName = itemDetails[j].itemName;
        let iQty = itemDetails[j].itemQty;
        let iUnitePrice = itemDetails[j].itemUnitePrice;

        let iRow = `<tr><td>${code}</td><td>${iName}</td><td>${iQty}</td><td>${iUnitePrice}</td></tr>`;
        $("#tblItems").append(iRow);
    }
    ItemTableSelect();
});

function loadAllCustomers() {
    $('#inputCustomerID').empty();
    $('#inputCustomerID').append('<option selected>Select Customer</option>');
    for (let index in cDetails) {
        let option = $('<option value="' + index + '">' + cDetails[index].customerID + '</option>');
        $('#inputCustomerID').append(option)


        $("#orderId").val($.now());

    }
}

function loadAllItem() {
    $('#inputItemCode').empty();

    $('#inputItemCode').append('<option selected>Select code</option>');
    for (let index in itemDetails) {
        let optionI = $('<option value="' + index + '">' + itemDetails[index].itemCode + '</option>');
        $('#inputItemCode').append(optionI);


    }
}

function loadItemName() {
    for (let index in itemDetails) {
        $('#itemName').empty();
        let optionName = $('<option value="' + index + '">' + itemDetails[index].itemName + '</option>');
        $('#itemName').val(itemDetails[index].itemName);
    }
}

function customerTableSelect() {
    $("#tblCustomer>tr").click(function () {

        let cId = $(this).children(":eq(0)").text();
        let Cname = $(this).children(":eq(1)").text();
        let addrs = $(this).children(":eq(2)").text();
        let sal = $(this).children(":eq(3)").text();

        $("#txtCustomerID").val(cId);
        $("#txtCustomerName").val(Cname);
        $("#txtCustomerAddress").val(addrs);
        $("#txtCustomerSalary").val(sal);


    });

}

function ItemTableSelect() {
    $("#tblItems>tr").click(function () {
        let itemId = $(this).children(":eq(0)").text();
        let itemName = $(this).children(":eq(1)").text();
        let itQt = $(this).children(":eq(2)").text();
        let uPrice = $(this).children(":eq(3)").text();

        $("#txtItemCode").val(itemId);
        $("#txtItemName").val(itemName);
        $("#txtQTY").val(itQt);
        $("#txtUnitPrice").val(uPrice);


    });

}

$("#btnDeleteCustomer").click(function () {
    let tempId = $("#txtCustomerID").val();

    for (let c = 0; c < cDetails.length; c++) {
        if (cDetails[c].customerID == tempId) {
            cDetails.splice(c, 1);
            alert("deleted");

        } else {
            alert("not deleted");
        }

    }


});

$("#btnDeleteIItem").click(function () {
    let tempcode = $("#txtItemCode").val();

    for (let f = 0; f < itemDetails.length; f++) {
        if (itemDetails[c].itemCode == tempcode) {
            cDetails.splice(f, 1);
            alert("deleted");

        } else {
            alert("not deleted");
        }

    }


});


$("#btnUpdateCustomer").click(function () {
    let tempCId = $("#txtCustomerID").val();
    //
    // for (let c = 0; c < cDetails.length; c++) {
    //     if (cDetails[c].customerID==tempId){
    //
    //         alert("deleted");
    //
    //     }else {
    //         alert("not deleted");
    //     }
    //
    // }

    updateCustomer(tempCId);


});


function searchCustomer(id) {
    return cDetails.find(function (customer) {
        return customer.customerID == id;
    });
}

function updateCustomer(tId) {
    let tempId = $("#txtCustomerID").val();
    let tempname = $("#txtCustomerName").val();
    let tempad = $("#txtCustomerAddress").val();
    let temps = $("#txtCustomerSalary").val();


    let searchCustomer1 = searchCustomer(tId);
    searchCustomer1.customerID = tempId;
    searchCustomer1.customerName = tempname;
    searchCustomer1.customerAddress = tempad;
    searchCustomer1.customerSalary = temps;


}

function setDetails(val) {

    $("#customerName").val(cDetails[val].customerName);
    $("#customerAddress").val(cDetails[val].customerAddress);
    $("#customerSalary").val(cDetails[val].customerSalary);

}

function setIDetails(val) {
    $("#itemName").val(itemDetails[val].itemName);
    $("#itemPrice").val(itemDetails[val].itemUnitePrice);
    $("#qtyOnHand").val(itemDetails[val].itemQty);
}

let addTOCartD = [];
let fullTotal = 0;
$("#btnAddToCart").click(function () {
    $("#orderTable").empty();

    let index = $("#inputItemCode").val();
    let code = itemDetails[index].itemCode;
    let iN = $("#itemName").val();
    let iUP = $("#itemPrice").val();
    let oQ = $("#buyQty").val();

    let Tp = iUP * oQ;

    fullTotal = fullTotal + Tp;

    let AddtoCardObj = {
        itemCode: code,
        itemName: iN,
        unitPrice: iUP,
        qty: oQ,
        total: Tp,
    };
    if (addTOCartD.length < 1) {
        addTOCartD.push(AddtoCardObj)
    } else {

        for (let j = 0; j < addTOCartD.length; j++) {

            // alert(codeIndex);
            let codeIndex = searchICode(code);

            if (codeIndex !== -1) {
                qt = parseInt(addTOCartD[codeIndex].qty)
                qtad = parseInt(oQ)
                let tQ = qt + qtad;
                let Totalp = parseInt(addTOCartD[codeIndex].total + Tp);
                let data = {
                    itemCode: code,
                    itemName: iN,
                    unitPrice: iUP,
                    qty: tQ,
                    total: Totalp,
                };
                addTOCartD.splice(codeIndex, 1);

                addTOCartD.push(data)
                break;
            } else {
                addTOCartD.push(AddtoCardObj)
                break;
            }

        }
    }
    for (let j = 0; j < addTOCartD.length; j++) {

        let code = addTOCartD[j].itemCode;
        let iName = addTOCartD[j].itemName;
        let iQty = addTOCartD[j].qty;
        let TTotal = addTOCartD[j].total;
        let iUnitePrice = addTOCartD[j].unitPrice;

        let row = "<tr>" +
            "<td>" + code + "</td>" +
            "<td>" + iName + "</td>" +
            "<td>" + iUnitePrice + "</td>" +
            "<td>" + iQty + "</td>" +
            "<td>" + TTotal + "</td>" +
            "<tr/>";

        $("#orderTable").append(row);
    }

    // totalFunction
    $("#txtTotal").text(fullTotal)
});

// set discount and sub total

$("#txtDiscount").keyup(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        let number2 = fullTotal - $("#txtDiscount").val();
        alert(number2)
        let number3 = $("#txtCash").val() - number2;
        alert(number3);
        $("#txtSubTotal").text(number2);

        $("#txtBalance").val(number3);


    }


});

let placeOrderD = [];
$("#btnPlaceOrder").click(function () {
    let oderIdD = $("#orderId").val();
    let orderDateD = $("#orderDate").val();
    let cusIdD = $("#inputCustomerID option:selected").text();
    let discountD = $("#txtDiscount").val();
    let totalD = $("#txtSubTotal").text();
    let pDetails = {
        oderIdD,
        orderDateD,
        cusIdD,
        discountD,
        totalD,
    }
    placeOrderD.push(pDetails);

    for (let i = 0; i < placeOrderD.length; i++) {
        let oderIdD1 = placeOrderD[i].oderIdD;
        let orderDateD1 = placeOrderD[i].orderDateD;
        let cusIdD1 = placeOrderD[i].cusIdD;
        let discountD1 = placeOrderD[i].discountD;
        let totalD1 = placeOrderD[i].totalD;


        let row = `<tr><td>${oderIdD1}</td><td>${orderDateD1}</td><td>${cusIdD1}</td><td>${discountD1}</td><td>${totalD1}</td></tr>`;
        $("#tblAllOrders").append(row);
    }
    alert("place Ordered SuccessFully!")

});


function searchICode(code) {
    for (let i = 0; i < addTOCartD.length; i++) {
        if (addTOCartD[i].itemCode == code) {
            return i;
        }
    }
    return -1;
}


// orderTable
// inputItemCode
// itemName
// itemPrice
// buyQty

