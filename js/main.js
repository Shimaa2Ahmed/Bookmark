var bookName=document.getElementById("name");
var bookURL=document.getElementById("URL");
var submitBtn=document.getElementById("submitBtn");
var inputs=document.getElementsByClassName("form-control");
var searchInput=document.getElementById("search");
var checkInput=document.getElementById("checkInput");
var urlCheck=document.getElementById("urlcheck");
var bookMarks=[];
var currentIndex=0;

bookName.onkeyup=function(){
  var nameRejex=/^([a-z]{2,8}|[A-Z][a-z]{2,8})$/
 if(!nameRejex.test(bookName.value)){
     submitBtn.disabled="true";
     bookName .classList.add("is-invalid");
     bookName .classList.remove("is-valid");
     checkInput.classList.remove("d-none");
    


 }
 else{
    submitBtn.removeAttribute("disabled");
    bookName.classList.add("is-valid");
    bookName.classList.remove("is-invalid");
    checkInput.classList.add("d-none");


 }
}
bookURL.onkeyup=function(){
    var urlRejex=/^(https:\/\/www\.|http:\/\/www\.)[a-zA-Z0-9]+\.[a-zA-Z]{2,5}$/
   if(!urlRejex.test(bookURL.value)){
       submitBtn.disabled="true";
       bookURL.classList.add("is-invalid");
       bookURL.classList.remove("is-valid");
       urlCheck.classList.remove("d-none");
  
  
  
   }
   else{
      submitBtn.removeAttribute("disabled");
      bookURL.classList.add("is-valid");
      bookURL.classList.remove("is-invalid");
      urlCheck.classList.add("d-none");
  
  
   }
  }

if(JSON.parse(localStorage.getItem("bookMarksList"))!=null){
    bookMarks=JSON.parse(localStorage.getItem("bookMarksList"));
    displayData();
}
submitBtn.onclick=function(){
    
  if(submitBtn.innerHTML=="Submit"){
    addBookMarks();
  }
    else{
        updateBookMark();
    }
   displayData();
   resetForm();
}

function addBookMarks(){
    
       
        var bookMark={
            name: bookName.value,
            url: bookURL.value,
        }
        
        bookMarks.push(bookMark);
        localStorage.setItem("bookMarksList",JSON.stringify(bookMarks));
        
    }
    

    
function displayData(){
    var divs="";
    for(var i=0;i<bookMarks.length;i++){
      divs+=
         
     
    ` <div class="d-flex p-5 justify-content-between align-items-center  ">
     <div class="m-3"> <h4 >${bookMarks[i].name}</h4></div>
      <div >
      <button onclick="getInfoBookMark(${i})"  class="btn btn-info mb-3" > update </button>
      <button onclick="deleteBookMark(${i})"  class="btn btn-danger mb-3" > Delete </button>
     <a href="${bookMarks[i].url} "target="_blank" class="btn btn-primary mb-3 "> Visit </a>
     </div>
      
      </div>
  
   `
    
      
      
      
        
    }
    document.getElementById("tabelBody").innerHTML=divs
}
function resetForm(){
for(var i=0;i<inputs.length;i++){
    inputs[i].value="";
}
}
searchInput.onkeyup=function()
{
    var divs='';
    var val=searchInput.value;
    for(var i=0;i<bookMarks.length;i++){
        if(bookMarks[i].name.toLowerCase().includes(val.toLowerCase()))  
        {
            divs+=
         
     
            ` <div class="d-flex p-5 justify-content-between align-items-center  ">
             <div class="m-3"> <h4 >${bookMarks[i].name}</h4></div>
              <div >
              <button onclick="getInfoBookMark(${i})"  class="btn btn-info mb-3" > update </button>
              <button onclick="deleteBookMark(${i})"  class="btn btn-danger mb-3" > Delete </button>
             <a href="${bookMarks[i].url} "target="_blank" class="btn btn-primary mb-3 "> Visit </a>
             </div>
              
              </div>
          
           `
            
        }
       
    }
    document.getElementById("tabelBody").innerHTML=divs
}

function deleteBookMark(index){

 bookMarks.splice(index,1);
 displayData();
 localStorage.setItem("bookMarksList",JSON.stringify(bookMarks));

    }
    function getInfoBookMark(index){
        bookName.value=bookMarks[index].name;
        bookURL.value=bookMarks[index].url;
       submitBtn.innerHTML="update";
       currentIndex=index;
    }
   function updateBookMark(){
    var bookMark={
        name: bookName.value,
        url: bookURL.value,
    }
   bookMarks[currentIndex]=bookMark; 
   localStorage.setItem("bookMarksList",JSON.stringify(bookMarks));
   submitBtn.innerHTML="Submit";

   }
  
    



