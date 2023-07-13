//get all elements 
let title= document.getElementById("title");
let price= document.getElementById("price");
let taxes= document.getElementById("taxes");
let ads= document.getElementById("ads");
let discound= document.getElementById("discound");
let total =document.getElementById("total");
let count= document.getElementById("count");
let category= document.getElementById("category");
let serch= document.getElementById("serch");
let submit= document.getElementById("submit");

console.log(submit)

//all varible used
//mode
let mode="creat"
//temp used to slelcted index in update function and we can used call and this to get index number in this function
let temp;

//get total by descound 
function getTotal(){

    if(price.value !=""){
        let result=(+price.value + +taxes.value + +ads.value)- +discound.value;
        total.innerHTML=result;
        total.style.backgroundColor="#15A30D"
    }else{
        total.innerHTML=" ";
        total.style.backgroundColor="#df963d"
    }
}

//create product and save in the localstorge

    let newproduct ;
if(localStorage.prouduct != null){
    newproduct= JSON.parse(localStorage.prouduct)
}else{
    newproduct=[];
}

//create product by submit

submit.onclick=function(){

    if(title.value != ""){
       
        let objProduct={

            title:title.value,
            price:price.value,
            taxes:taxes.value,
            ads:ads.value,
            discound:discound.value,
            total:total.innerHTML,
            count:count.value,
            category:category.value,
        }
        scroll({
            top:700,
            behavior:"smooth"
        })

        if(mode==="creat"){
            if(count.value>1 ){
                for(let i=0;i < count.value ;i++){
                    newproduct.push(objProduct);

                }
            }else{
                newproduct.push(objProduct);
            }
        }else{
            console.log(temp)
            newproduct[temp]=objProduct;
            submit.innerHTML="creat";
            mode="creat";
            count.style.display="block"
            total.innerHTML=" ";
        total.style.backgroundColor="#df963d"

        }
       

        // console.log(newproduct)
        
        localStorage.setItem('prouduct' ,JSON.stringify( newproduct))
    
        //clear input when submit button
        title.value="";
        price.value="";
        taxes.value="";
        ads.value="";
        discound.value="";
        total.innerHTML="";
        count.value="";
        category.value="";
    }else{
        window.alert("enter the titel")
    }

    showdata()
  
}

//read data and show in table 


function showdata(){
    let table='';
    newproduct.forEach(function(elemint ,index ,array){

        // console.log(elemint.title)
   table +=`
            <tr>
            <td>${index}</td>
            <td>${elemint.title}</td>
            <td>${elemint.price}</td>
            <td>${elemint.taxes}</td>
            <td>${elemint.ads}</td>
            <td>${elemint.discound}</td>
            <td>${elemint.total}</td>
            <td>${elemint.count}</td>
            <td>${elemint.category}</td>
            <td><button onclick="updateone(${index})"id="update">update</but></td>
            <td><button onclick="deleteOne(${index})" id="delet">delete</button></td>

            </tr>
   
   `
    })
    if(newproduct.length >1){
        document.getElementById("deletall").innerHTML= `
        <button onclick="deleteAll()" id="deleteAll">Delete All  ( ${newproduct.length} )</button>
        `

    }else{
        document.getElementById("deletall").innerHTML= ``
    }


    document.getElementById("tablebody").innerHTML= table ;

}
  

//delet the one product 
function deleteOne(i){
    newproduct.splice(i,1)
    localStorage.prouduct= JSON.stringify(newproduct)
    showdata()
     
}

function deleteAll(){
    newproduct.splice(0,(newproduct.length))
    localStorage.prouduct= JSON.stringify(newproduct)
    showdata()
     
}

//update 

function updateone(i){
    // for test
    // console.log(newproduct[i].title)
    title.value=newproduct[i].title
    price.value=newproduct[i].price
    taxes.value=newproduct[i].taxes
    ads.value=newproduct[i].ads
    discound.value=newproduct[i].discound
    category.value=newproduct[i].category
    
    // hiddin count input
    count.style.display="none"
    submit.innerHTML="update"
    getTotal()
    mode="update"
     temp=i;
    console.log(temp)
    //scrole
    scroll({
        top:0,
        behavior:"smooth"

    })
}


//serch 
//the serch mode 

let searchmode="serchByTitle";

function searchMode(id){
    // console.log(id)

    if(id=="serchByTitle"){
        searchmode='serchByTitle'
        serch.placeholder="title"
        // console.log( serch.Placeholder)
    }else{
        searchmode='serchByCategory'
        serch.placeholder="Category"
        // console.log( serch.Placeholder)
    }
    serch.focus()
}

//serch function 
function serchintable(value){
    let table=''; 
 if (searchmode == "serchByTitle"){

    

    newproduct.forEach(function(elemint,index,array){
        if(elemint.title.includes(value)){
            console.log(value)
            table +=`
            <tr>
            <td>${index}</td>
            <td>${elemint.title}</td>
            <td>${elemint.price}</td>
            <td>${elemint.taxes}</td>
            <td>${elemint.ads}</td>
            <td>${elemint.discound}</td>
            <td>${elemint.total}</td>
            <td>${elemint.count}</td>
            <td>${elemint.category}</td>
            <td><button onclick="updateone(${index})"id="update">update</but></td>
            <td><button onclick="deleteOne(${index})" id="delet">delete</button></td>

            </tr>
   
            `
        }else{

            

        }

    }
    )

 }





 else{
    newproduct.forEach(function(elemint,index,array){
        if(elemint.category.includes(value)){
            console.log(value)
            table +=`
            <tr>
            <td>${index}</td>
            <td>${elemint.title}</td>
            <td>${elemint.price}</td>
            <td>${elemint.taxes}</td>
            <td>${elemint.ads}</td>
            <td>${elemint.discound}</td>
            <td>${elemint.total}</td>
            <td>${elemint.count}</td>
            <td>${elemint.category}</td>
            <td><button onclick="updateone(${index})"id="update">update</but></td>
            <td><button onclick="deleteOne(${index})" id="delet">delete</button></td>

            </tr>
   
            `
        }else{

            

        }

    }
    )

 }


 document.getElementById("tablebody").innerHTML= table ;


}




// do function 
showdata()