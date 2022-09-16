
fetch('https://jsonplaceholder.typicode.com/users')
.then(response => response.json())
.then(json => {
  let menu = document.getElementById('usersnames');
  let opciones = '';
  json.forEach(user => {
    opciones += `<option value = "${user.id}">${user.username}</option>`
  });
  menu.innerHTML = "<option value=''>- Selecione un username -</option>" + opciones;
});

let menuUS = document.getElementById('usersnames');
menuUS.addEventListener('change', () => {
fetch('https://jsonplaceholder.typicode.com/users/' + menuUS.value)
  .then (response => response.json())
  .then (json => {
    if(menuUS.value != ""){
      let infoUsers = document.getElementById('infoUsers');
      let datos = '';
      datos += `<form><br><label for="nombre">Nombre
      <br><input type="text" value="${json.name}" id="txtNombre"></label>
      <br><label for="compañia">Compañia
      <br><input type="text" value="${json.company.name}" id="txtCompañia"></label>
      <br><label for="correo">Correo
      <br><input type="email" value="${json.email}" id="txtCorreo"></label>
      <br><label for="telefono">Telefono
      <br><input type="text" value="${json.phone}" id="txtTelefono"></label>
      <br><label for="web">Web
      <br><input type="text" value="${json.website}" id="txtWeb"></label>
      <br><br><button type="button" Onclick="ocultarDatos()">Ocultar</button></form>`
      infoUsers.innerHTML = datos;
    }
  });
});

function ocultarDatos(){
let infoUsers = document.getElementById('infoUsers');
infoUsers.innerHTML = "";
}

const btnNoPosts = document.getElementById('btnNoPosts');
btnNoPosts.addEventListener('click', () =>{
let posts = document.getElementById('posts');
posts.innerHTML = "";
});

const btnPost = document.getElementById('btnPost');
btnPost.addEventListener('click', () => {
fetch('https://jsonplaceholder.typicode.com/posts?userId=' + menuUS.value)
  .then (response => response.json())
  .then(json => {
    let divposts = document.getElementById('posts');
    let posts = '';
    json.forEach(post => {
      posts += `<div  class="divPosts" id = "pub${post.id}"><h3>${post.title}</h3>
      <p>${post.body}</p>
      <button type="button" class="btnMostrar" onclick="mostrarComents(${post.id})">Mostrar comentarios</button>
      <div class="pComents" id="pcom${post.id}"></div>
      </div>`;
    });
    divposts.innerHTML = posts;
  });
});

function mostrarComents(id) {
fetch('https://jsonplaceholder.typicode.com/posts/'+ id + '/comments')
  .then (response => response.json())
  .then (json => {
    let divcomentarios = document.getElementById('pcom' + id);
    let coments = '';
    json.forEach(comentario => {
      coments += `<h5>${comentario.name}</h5><p>${comentario.body}</p>`;
    });
    divcomentarios.innerHTML =  `${coments} <button type="button" class="btnOcultar" onclick="ocultarComents(${id})">Ocultar comentarios</button>`;
});
};

function ocultarComents(id) {
let divcomentarios = document.getElementById('pcom' + id);
divcomentarios.innerHTML = "";
}