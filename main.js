// let books = [
//   {
//     title: 'Harry Potter',
//     author: 'J.K. Rowling',
//     imageURL:
//       'https://books.google.com/books/content?id=WV8pZj_oNBwC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
//     isbn: '9781921479311',
//     pageCount: 268,
//   },
// ];

// const Handlebars = require('handlebars'); //do not need if handlebars cdn is in html

let renderFaces = function () {
  console.log('rendering!');

  $('.faces').empty();
  let source = $('#face-template').html();

  console.log(source);

  const template = Handlebars.compile(source);

  for (let i = 0; i < renderFaces.length; i++) {
    // create HTML and append to .faces
    let newHTML = template(faces[i]);
    $('.faces').append(newHTML);
  }
};

var addFaces = function (data) {
  faces = [];

  for (var i = 0; i < data.items.length; i++) {
    var faceData = data.items[i];
    
    var face = {
      login: faceData.author.login || null,
      avatar_url: faceData.author.avatar_url || null,
    };

    faces.push(face);
  }
  renderFaces();
};

$('.search').on('click', function () {
  var userSearch = $('#search-query').val();
  // console.log("usersearch val: " + userSearch);
  fetch(userSearch);
});

var fetch = function (query) {
  $.ajax({
    method: "GET",
    url: "https://api.github.com/repos/facebook/react/commits/" + query,
    dataType: "json",
    success: function(data) {
      addFaces(data);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    }
  });
};




