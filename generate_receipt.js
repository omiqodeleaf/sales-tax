//importing necessary modules and data 
import prompt from 'prompt-sync';
const prompt1 = prompt();
import { arr } from "./sales_data.js"
let flag = true;


//Bucketlist array will store uiser's desired items that they want to purchase
let bucketlist = [];
console.log("Enter the items you want to purchase from the list given below by entering their item no: ");
for (let item of arr) console.log(`${item.no}.  ${item.name}: ${item.price}$`);
console.log("Type END to get your bill receipt")


//This while loop will take input from the user till they don't type "END" to get a receipt 
while (flag) {

    //Taking input from user 
    // User is supposed to enter item number like 1, 2 and many more to add item to bucketlist
    let selectedItem = prompt1("Enter the item number: ");      
    selectedItem = selectedItem.toLowerCase();


    //Here we will generate receipt as the user has typed "END"
    if (selectedItem == "end") {
        flag = false;
        printReceipt(bucketlist);
    }
    // Here we are adding ther desired item to the bucketlist and giving output if the item is not present
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


//This function will generate the receipt along with tax
function printReceipt(bucketlist) {

    let totalSalesTax = 0;       /* This will print the total sales tax that we calculated for each item */
    let totalPrice = 0;          /* This will print the total price along with tax */
    let salesTax = 0;            /* This will calculate tax for evry particular item */
    let totalPriceWithTax = 0;   /* This will calculate tax for each particular item */

//This for loop will iterate over the items of the user's bucketlist to calculate final price
    for (let item = 0; item < bucketlist.length; item++) {

        //Here we are calculating tax on each element and also adding it to the final price 
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

