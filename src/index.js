import "./style.css"
import "bootstrap/dist/css/bootstrap.css"
import * as bootstrap from 'bootstrap';
import '@popperjs/core';



document.getElementById("all-content").style.display = "block"

/* 
  Add your JavaScript for all exercises Below or in separate js-files, which you must the import above
*/

/* JS For Exercise-1 below */
const SERVER_URL = "https://densorteudvikler.dk/devops-starter/api"
let editModalElement = document.getElementById("editmodal")
let editModal = new bootstrap.Modal(editModalElement)

let deleteModalElement = document.getElementById("deletemodal")
let deleteModal = new bootstrap.Modal(deleteModalElement)

document.getElementById("tablerows").addEventListener('click', e => {
e.preventDefault()
const node = e.target
const name = node.getAttribute("name")
const id = node.getAttribute("id")
switch(name)
{
  case "edit": editPerson(id); break;
  case "delete": deletePerson(id); break;
}})

function getPersonByHobby(){
  let getPerson = document.getElementById("getbyhobbybtn");
  getPerson.addEventListener('click', e => {
    e.preventDefault();
    const hobby = document.getElementById("hobby_textinput").value;

    fetch(`${SERVER_URL}/person/hobby/${hobby}`)
    .then(handleHttpErrors)
    .then(data =>
    {
      
      const allRows =  data.map(p => getPersonTableRow(p))
      const allRowsAsString = allRows.join("")
      document.getElementById("tablerows").innerHTML = allRowsAsString;;
      
      
    })
    .catch(errorHandling);
  })
}
getPersonByHobby();



function editPerson(ID)
{
  fetch(`${SERVER_URL}/person/${ID}`)
  .then(handleHttpErrors)
  .then(data =>
  {
    
    
    document.getElementById("edit_id").value = data.ID;
    document.getElementById("firstName").value = data.firstName
    document.getElementById("lastName").value = data.lastName
    document.getElementById("phoneNumber").value = data.phoneNumber
    document.getElementById("emailAddress").value = data.emailAddress
    document.getElementById("Address").value = data.addressDTO.Address
    editModal.toggle()
    
  })
  
  .catch(err =>{
    if(err.status){
      err.fullError.then(e=> console.log(e.msg))
    }
    else{console.log("Network error"); }
 });

 document.getElementById("edit-safebtn").addEventListener('click', updatePerson)

 function updatePerson(){
    
    
   const id = document.getElementById("edit_id").value

   const personObject = {
    "ID": id,
    "firstName": document.getElementById("firstName").value,
    "lastName": document.getElementById("lastName").value,
    "phoneNumber": document.getElementById("phoneNumber").value,
    "emailAddress": document.getElementById("emailAddress").value,
    "hobbyDTO": [],
    "addressDTO": {
        "Address": document.getElementById("Address").value,
        "cityInfoDTO": {
        "zipcode": document.getElementById("zipcode").value
  
      }
  
    }
   }
    
   const options = makeOptions('PUT', personObject)

   fetch(`https://densorteudvikler.dk/devops-starter/api/person/edit/` + id, options)
   .then(handleHttpErrors)
   .then(data => {
     editModal.toggle()
    getAllPersons()
   })
   
   .catch(errorHandling);
 }
 
}


function deletePerson(ID)
{
  
  fetch(`${SERVER_URL}/person/${ID}`)
  .then(handleHttpErrors)
  .then(data =>
  {
    
    document.getElementById("delete_id").value = data.ID;
    deleteModal.toggle()
    
  })
  .catch(err =>{
    if(err.status){
      err.fullError.then(e=> console.log(e.msg))
    }
    else{console.log("Network error"); }
 });

 document.getElementById("delete-safebtn").addEventListener('click', deletePerson)

 function deletePerson(){

  const id = document.getElementById("delete_id").value

  

  const options = makeOptions('DELETE', id)

   fetch(`https://densorteudvikler.dk/devops-starter/api/person/delete/`+ id, options)
   .then(handleHttpErrors)
   .then(data => {
     editModal.toggle()
    getAllPersons()
   })
   
   .catch(errorHandling);

 }
}

function createPerson(){
let createP = document.getElementById("createPerson_btn");
createP.addEventListener('click', e => {
  e.preventDefault();
  
  const personObject = {
    "firstName": document.getElementById("create_fname").value,
    "lastName": document.getElementById("create_lname").value,
    "phoneNumber": document.getElementById("create_phone").value,
    "emailAddress": document.getElementById("create_email").value,
    "hobbyDTO": [],
    "addressDTO": {
        "Address": document.getElementById("create_address").value,
        "cityInfoDTO": {
        "zipcode": document.getElementById("create_zipcode").value
  
      }
    }
   }

   const options = makeOptions('POST', personObject)

   fetch(`https://densorteudvikler.dk/devops-starter/api/person`, options)
   .then(handleHttpErrors)
   .then(data => {
     
    getAllPersons()
   })
   
   .catch(errorHandling);
  

})
}
createPerson();

function getAllPersons(){
fetch(`${SERVER_URL}/person/all`)
 .then(handleHttpErrors)
 .then(data =>
  {
   // Lav tabel rækker med data
  const allRows =  data.map(p => getPersonTableRow(p))
  const allRowsAsString = allRows.join("")
  document.getElementById("tablerows").innerHTML = allRowsAsString;
 })
 .catch(errorHandling);
}

function getPersonTableRow(p)
{
  
  return `<tr>
  <td>${p.ID}</td>
  <td>${p.firstName}</td>
  <td>${p.lastName}</td>
  <td>${p.phoneNumber}</td>
  <td>${p.emailAddress}</td>
  <td>${p.addressDTO.Address}</td>
  <td>${p.addressDTO.cityInfoDTO.zipcode}</td>
  <td>${p.addressDTO.cityInfoDTO.city}</td>
  <td>
    <input id="${p.ID}" type="button" name="edit" value="edit"/>
    <input id="${p.ID}" type="button" name="delete" value="delete"/>
  </td>
  </tr>`
}



/* JS For Exercise-2 below */



/* JS For Exercise-3 below */

/* Helper functions */
function makeOptions(method, body) {
  var opts =  {
    method: method,
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json"
    }
  }
  if(body){
    opts.body = JSON.stringify(body);
  }
  return opts;
 }

 function handleHttpErrors(res){
  if(!res.ok){
    return Promise.reject({status: res.status, fullError: res.json() })
  }
  return res.json();
 }

 function errorHandling(err){
  console.log(err =>{
    if(err.status){
      err.fullError.then(e=> console.log(e.msg))
    }
    else{console.log("Network error"); }
 });
 }
 
/* 
Do NOT focus on the code below, UNLESS you want to use this code for something different than
the Period2-week2-day3 Exercises
*/

function hideAllShowOne(idToShow)
{
  document.getElementById("about_html").style = "display:none"
  document.getElementById("person_html").style = "display:none"
  document.getElementById("ex2_html").style = "display:none"
  document.getElementById("ex3_html").style = "display:none"
  document.getElementById(idToShow).style = "display:block"
}

function menuItemClicked(evt)
{
  const id = evt.target.id;
  switch (id)
  {
    case "ex1": hideAllShowOne("person_html"); getAllPersons(); break
    case "ex2": hideAllShowOne("ex2_html"); break
    case "ex3": hideAllShowOne("ex3_html"); break
    default: hideAllShowOne("about_html"); break
  }
  evt.preventDefault();
}
document.getElementById("menu").onclick = menuItemClicked;
hideAllShowOne("about_html");



