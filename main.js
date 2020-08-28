let contributors = [
  // {
  //   img: 'https://avatars1.githubusercontent.com/u/1404810?v=4',
  //   login: 'SimenB',
  // },
];

// const Handlebars = require('handlebars'); //do not need if handlebars cdn is in html

const addContributorToArray = (data) => {
  // debugger;

  const newContributor = {
    img: data.author.avatar_url,
    login: data.author.login,
  };

  contributors.push(newContributor);
};

const renderContributors = () => {
  $('#commits').empty();

  for (let i = 0; i < contributors.length; i++) {
    let contributor = contributors[i];

    const source = $('#contributor-template').html();
    const template = Handlebars.compile(source);
    const contributorHTML = template(contributor);

    $('#commits').append(contributorHTML);
  }
};

const fetchData = (sha) => {
  $.ajax({
    method: 'GET',
    url: 'https://api.github.com/repos/facebook/react/commits/' + sha,
    dataType: 'json',
    success: function (data) {
      // console.log(data);
      addContributorToArray(data);
      renderContributors();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    },
  });
};

$('.search').on('click', function () {
  console.log('clicked');
  const sha = $('#sha').val();
  // console.log("usersearch val: " + userSearch);
  fetchData(sha);
});

// renderContributors();
