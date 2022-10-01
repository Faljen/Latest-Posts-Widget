let request = new XMLHttpRequest();

request.open("GET", "https://tedee.com/wp-json/wp/v2/posts?per_page=4");
request.onload = function () {
  if (request.status >= 200 && request.status < 400) {
    let data = JSON.parse(request.responseText);
    loadData(data);
  } else {
    console.log("Connected to the server but an error has occurred.");
  }
};
request.onerror = function () {
  console.log("Connection error.");
};
request.send();

function loadData(wpData) {
  let html = "";

  for (i = 0; i < wpData.length; i++) {
    let postDate = new Date(wpData[i].date);

    html +=
      "<div class='post'>" +
      "<div class='post__element post__element--title'>" +
      wpData[i].title.rendered +
      "</div>";
    html +=
      "<div class='post__element post__element--details'>" +
      "<div class='post__element--author--container'>" +
      "<span class='post__element--author--prefix'>by </span> " +
      "<span class='post__element--author--name'>" +
      wpData[i].author +
      "</span>" +
      "</div>";
    html +=
      "<div class='post__element--date'>" +
      postDate.toLocaleString() +
      "</div>" +
      "</div>" +
      "</div>";
  }
  posts = document.getElementById("latest-posts");
  posts.innerHTML = html;
}
