const $siteList = $(".siteList");
const $lastli = $siteList.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);

const hashMap = xObject || [
  { logo: "A", logoType: "text", url: "https://www.acfun.cn" },
  { logo: "B", logoType: "text", url: "https://www.bilibili.com" },
  {
    logo: "D",
    logoType: "text",
    url: "https://developer.mozilla.org",
  },
];

const removeurl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, "");
};
const render = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node, index) => {
    let $li = $(
      "<li>" +
        '   <div class="site">' +
        '     <div class="logo">' +
        node.logo +
        "</div>" +
        '     <div class="link">' +
        removeurl(node.url) +
        "    </div>" +
        "<div class='close'>" +
        " <svg class='icon' aria-hidden='true'>" +
        " <use xlink:href='#icon-baseline-close'></use>" +
        "</svg></div>" +
        "   </div>" +
        " </li>"
    );

    $li.insertBefore($lastli);
    $li.on("click", () => {
      window.open(node.url);
    });
    $li.on("click", ".close", (e) => {
      e.stopPropagation();
      hashMap.splice(index, 1);
      render();
    });
  });
};
render();

$(".addButton").on("click", () => {
  let url = window.prompt("请问您要添加的网址是什么？");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }

  hashMap.push({
    logo: removeurl(url)[0].toUpperCase(),
    logoType: "text",
    url: url,
  });
  render();
});

window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  localStorage.setItem("x", string);
};
$(window).on("keypress", (e) => {
  //const { key } = e;
  const key = e.key;
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});
