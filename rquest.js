 var request = require("request");
  var fs = require("fs");
  var cheerio = require("cheerio");  
  
  var newNetwork = function() {
  request({
    
    url: "https://www.barchart.com/futures/quotes/MX*0/all-futures",
    method: "GET"
  }, function(error, response, body) {
    if (error || !body) {
      return;
    }
 
    // 爬完網頁後要做的事情
        var $ = cheerio.load(body);
        var varTime = new Date();
        var result = [];
        var title = $(".text-left div");
        var decimal = $("data");

        for (var i = 0; i < title.length; i++) {
            var priceString =$(title[i]).children("td").text();
            var priceList = priceString.split(/\s+/g);
            result.push($(title[i]).children("td").text().replace(/\s+/g, "").replace(/\r\n|\n/g,","));
        // result.push('{"'+title[i].children[1].data+'":['+decimal[4*i].children[0].data + ','+decimal[4*i+1].children[0].data+']}');
        }
        fs.writeFile("result.json", result, function() {
        console.log(result);

        });

 

  });
};

newNetwork();