  let storedObjects = JSON.parse(localStorage.getItem('userDetails')) || [];
  var isEdit=false
  var editedId=''
function dataSubmit(params) {
    var userIncome = document.getElementById("income").value;
    var date = document.getElementById("date").value;
    //var userExpense=document.getElementById("expense").value;
    var e = document.getElementById("amount_type");
    var value = e.value;
    var amount_type = e.options[e.selectedIndex].text;
    //console.log(amount_type)
    var expenseDescription = document.getElementById("desc").value;
    var id = Math.floor(Math.random() * 100);

    var userdata = {
        id: id,
        income: userIncome,
        //date: date,
        description: expenseDescription,
        type: amount_type,
        date: date,

    };

    if (isEdit) {

        var userdata = {
            id: editedId,
            income: userIncome,
            
            description: expenseDescription,
            type: amount_type,
            date: date,

        };
        storedObjects.push(userdata);
        isEdit = false;
    }
    else {

        storedObjects.push(userdata);
          //isEdit = true;
    }

    window.localStorage.setItem("userDetails", JSON.stringify(storedObjects));
    document.getElementById("income").value = "";
    document.getElementById("date").value = "";
    document.getElementById("amount_type").selectedIndex = "";
    document.getElementById("desc").value = ""
    getData();
    calculateTotal();
}
function getData(){
   var data= window.localStorage.getItem("userDetails");
   console.log(JSON.parse(data))
   var result = JSON.parse(data);
   var tbody = document.getElementById("tbody");
    tbody.innerHTML = "";
    
     result.forEach((element) => {
      var tr = document.createElement("tr");
          tr.setAttribute('class','myRow')
      tr.setAttribute(
        "class",
        "bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
      );
    
      Object.keys(element).forEach(function (key) {
        var td = document.createElement("td");
        td.setAttribute('class','id_event')
        //console.log(key)
        if(key == 'id'){
            td.style.display='none'
        }
        td.innerText = element[key];
        td.setAttribute(
          "class",
          "px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        );
      
    
       
        tr.appendChild(td);
      });

      var editTd = document.createElement("td");
      editTd.innerHTML =
        "<button onclick='updateItem(" +
        element.id +
        ")'>Edit</button> | <button onclick='deleteItem(" +
        element.id +
        ")'>Delete</button>";
      editTd.setAttribute(
        "class",
        "px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      );
      tr.appendChild(editTd);

      tbody.appendChild(tr);
    });
}
function updateItem(id){
   // console.log(id);
    editedId=id;
    isEdit=true;
      let result=storedObjects.filter(transaction => transaction.id == id);
   //console.log(result);
    document.getElementById("income").value =result[0].income;
  document.getElementById("date").value=result[0].date;
  document.getElementById("amount_type").value=result[0].type;
  document.getElementById("desc").value=result[0].description
  storedObjects=storedObjects.filter(transaction => transaction.id !== id);
   //console.log(storedObjects)
   window.localStorage.setItem("userDetails",JSON.stringify(storedObjects));

}
function filterList(){
    var data= window.localStorage.getItem("userDetails");
   //console.log(JSON.parse(data))
   var result = JSON.parse(data);
   //console.log(result);
   var filterValue = document.querySelector('input[name="filter"]:checked').value;
    console.log("type_filter",filterValue)
      const table = document.getElementById('myTable');
    const rows = table.getElementsByTagName('tr');
      for (let i = 1; i < rows.length; i++) { // Start from 1 to skip header row
            let row = rows[i];
            let cells = row.getElementsByTagName('td');
            let foundMatch = false;
          if (filterValue != 'all') {
              for (let j = 0; j < cells.length; j++) {
                  let cell = cells[j];
                  if (cell) {
                      let cellValue = cell.textContent;
                      //console.log("cell..", cellValue)
                      if (cellValue.includes(filterValue)) {
                          foundMatch = true;
                          break;
                      }
                  }
              }
              if (foundMatch) {
                  row.style.display = '';
              } else {
                  row.style.display = 'none';
              }
          }
          else{
            getData();
          }
      }
    // if(filterSelection == "Income"){
    //    result= result.filter((type)=> type.type == filterSelection)
    //     console.log("filter_obj",result)
    //    // window.localStorage.setItem("userDetails",JSON.stringify(result));
    //     //getData();

    // }
    //  else if(filterSelection == "Expense"){
    //    result= result.filter((type)=> type.type == filterSelection)
    //     console.log("filter_obj1",result)
    //     // window.localStorage.setItem("userDetails",JSON.stringify(storedObjects));
    //     getData();
    // }
}
function deleteItem(target) {
    console.log(target)
     var isDelete = confirm("Are you sure do you want to delete this?");
    if (isDelete) {
    storedObjects=storedObjects.filter(transaction => transaction.id !== target);
   console.log(storedObjects)
   window.localStorage.setItem("userDetails",JSON.stringify(storedObjects));
    getData();
   calculateTotal();
   }
 
}
function calculateTotal() {
    var table = document.getElementById("myTable");
    var tr = table.getElementsByTagName("tr");
    var total_income = document.getElementById("t_income");
    var total_expense = document.getElementById("t_expense");
    var net_balance = document.getElementById("n_balance");
    var totalIncome = 0.00;
    var totalExpense = 0.00;
    var netBalance = 0.00;
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        td1 = tr[i].getElementsByTagName("td")[3];
        if (td) {
            if (td1.innerText == 'Income') { totalIncome = totalIncome + parseInt(td.innerText) }
            else if (td1.innerText == 'Expense') { totalExpense = totalExpense + parseInt(td.innerText) }
            netBalance = totalIncome - totalExpense;

            //total_income.innerText="12000";
        }
        
    }
      
    total_income.innerText = totalIncome;
    total_expense.innerText = totalExpense;
    net_balance.innerText = netBalance
}

getData();
calculateTotal();
