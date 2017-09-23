// console.log("load extract-item-info.js");
chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    if (request.type === "start") {
      //タイトル情報を取得
      let title = $("title").html();
      //画像を取得
      let imgs = $("img");
      let imageSrc = null;
      imgs.each(function () {
        let img = $(this);
        if (img.attr("id") === "imgBlkFront") {
          const srcStr = $("#imgBlkFront").attr("data-a-dynamic-image");
          const srcObj = JSON.parse(srcStr);
          imageSrc = Object.keys(srcObj)[0];
          //タイトル for amazon
          title = img.attr("alt");
        }else if(img.attr("id") === "landingImage"){
          const srcStr = $("#landingImage").attr("data-a-dynamic-image");
          const srcObj = JSON.parse(srcStr);
          imageSrc = Object.keys(srcObj)[0];
          //タイトル for amazon
          title = img.attr("alt");
        }
      });
      if(!imageSrc) {
        let img = $(imgs[0]);
        let src = img.attr("src");
        if(src && src.lastIndexOf("http", 0) === 0){
          imageSrc = img.attr("src");
        }
      }
      //URLを取得
      let src = document.URL;
      // console.log({ title, image: imageSrc, src });
      sendResponse({ title, image: imageSrc, src });
    }
  });
