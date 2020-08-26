function scrape() {
  
  let lptag = document.getElementById("lp");
  let loadingtag = document.getElementById("loading");
  let nametag = document.getElementById("name");
  let leveltag = document.getElementById("level");
  let ranktag = document.getElementById("rank");
  let ratiotag = document.getElementById("ratio");
  let icontag = document.getElementById("icon");
  let containertag = document.getElementById("container");
  let atag = document.querySelector("A");
  loadingtag.style.display = "block";
  loadingtag.innerHTML = "Loading ...";
  loadingtag.style.marginTop = "10%";
  fetch(
    `https://theapi.glitch.me/api/v1/getstats/${
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
        nametag.innerHTML = infos.name;
        leveltag.innerHTML = `${infos.level}`;
        ranktag.innerHTML = `${infos.rank}`;
        ratiotag.innerHTML = `${infos.KDARatio}`;

        let lps = [];

        for (let i = 0; i < infos.rankedLP.length - 2; i++) {
          lps.push(infos.rankedLP[i]);
        }
        lptag.innerHTML = `${lps.join("")}`;
        icontag.setAttribute("src", infos.avatarURL);
        containertag.style.display = "flex";
        atag.setAttribute(
          "href",
          `https://${
            document.getElementById("sel").value
          }.op.gg/summoner/userName=${document
            .getElementById("ine")
            .value.split(" ")
            .join("+")}`
        );
      }
    });
}
