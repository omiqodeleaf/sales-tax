import prompt from 'prompt-sync';
const prompt1 = prompt();
import { arr } from "./sales_data.js"
let flag = true;

let bucketlist = [];

console.log("Enter the items you want to purchase from the list given below by entering their item no: ");

for (let item of arr) console.log(`${item.no}.  ${item.name}: ${item.price}$`);

console.log("Type END to get your bill receipt")

while (flag) {

    let selectedItem = prompt1("Enter the item number: ");
    selectedItem = selectedItem.toLowerCase();

    if (selectedItem == "end") {
        flag = false;
        printReceipt(bucketlist);
    }
    else {

        let find = false;

        for (let item = 0; item < arr.length; item++) {

            if (selectedItem == arr[item].no) {
                bucketlist.push(arr[item]);
                find = true;
                break;
            }

        }

        if (!find) {

            console.log(`SORRY! WE DON'T HAVE THIS ITEM, YOU CAN TYPE "END" TO GET YOUR RECEIPT OR KEEP ENTERING ITEMS`);

        }

    }
}

function printReceipt(bucketlist) {

    let totalSalesTax = 0;
    let totalPrice = 0;
    let salesTax = 0;
    let totalPriceWithTax = 0;


    for (let item = 0; item < bucketlist.length; item++) {

        salesTax = 0;
        if ((bucketlist[item].imported) && ((bucketlist[item].type != "Medicine") && (bucketlist[item].type != "Food") && (bucketlist[item].type != "Book"))) salesTax = (bucketlist[item].price * 15) / 100
        if ((!bucketlist[item].imported) && ((bucketlist[item].type != "Medicine") && (bucketlist[item].type != "Food") && (bucketlist[item].type != "Book"))) salesTax = (bucketlist[item].price * 10) / 100;
        totalSalesTax += salesTax;

        totalPriceWithTax = bucketlist[item].price + salesTax;
        totalPrice += totalPriceWithTax;

        console.log(`${bucketlist[item].name}: ${totalPriceWithTax}`)

    };

    totalPrice = totalPrice.toFixed(2);
    console.log(`Sales Taxes: ${totalSalesTax}`);
    console.log(`Total: ${totalPrice}`);

}


