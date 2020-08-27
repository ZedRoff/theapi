function scrape() {

  let loadingtag = document.getElementById("loading");
  let nametag = document.getElementById("name");
  let platformtag = document.getElementById("platform");
  let solotag = document.getElementById("solo");
  let duotag = document.getElementById("duo");
  let squadtag = document.getElementById("squad");
  let lifetimetag = document.getElementById("lifetime");
  let atag = document.querySelector("A");
  let icontag = document.getElementById("icon");
  let containertag = document.getElementById("container");
  loadingtag.style.display = "block";
  loadingtag.innerHTML = "Loading ...";
  loadingtag.style.marginTop = "10%";
  fetch(
    `https://theapi.glitch.me/api/v1/fortnite/getstats/${
      document.getElementById("sel").value
    }/${document.getElementById("ine").value}`
  )
    .then(res => res.json())
    .then(infos => {
      
      if (infos == "usernotfound") {
        loadingtag.innerHTML = "User Not found";
        loadingtag.style.backgroundColor = "#FF3636";
      } else {
        loadingtag.style.backgrounColor = "#594BFF";
        loadingtag.innerHTML = "Fetched";
        console.log(infos);
        nametag.innerHTML = infos.username;
        platformtag.innerHTML = `${infos.platform}`;
        solotag.innerHTML = `${infos.stats.solo.kd}`;
        duotag.innerHTML = `${infos.stats.duo.kd}`;
        squadtag.innerHTML = `${infos.stats.squad.kd}`;
      //  lifetimetag.innerHTML = `${infos.stats.lifetime.kd}`;

      //  icontag.setAttribute("src", infos.avatarURL);
        containertag.style.display = "flex";
        atag.setAttribute("href", infos.url);
      }
    });
}
