
let addUsername  = async (user) => {
  $("#users").empty();
  try{
    await eval('var profile='+user["json_metadata"]);
    var profile_img_link = profile['profile']["profile_image"];
  }catch (err){
    var profile_img_link = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png'
  }
  console.log(profile_img_link);
  var display =
                '<div>'+
                  '<div class = "user">'+
                      '<h1>'+user.name+'</h1>' +
                      '<img class = "userImg" src=' + profile_img_link + '>' +
                      '<h6>Balance:</h6>' +
                      '<h6>'+user.balance+ ' | '+ user.sbd_balance+'</h6>' +
                      '<h6>Savings:</h6>' +
                      '<h6>'+user.savings_balance+ ' | '+ user.savings_sbd_balance+'</h6>' +
                      '<div id = "earnings" ></div>'+
                    '</div>'
                    
                '</div>';
  $("#users").append(display);       
};

let getIntervals = (n0tranx, limit) => {

  let counter = limit; let from = []; let limits = []
    while(counter < n0tranx){
      from.push(counter);
      counter += limit;
      limits.push(limit-1);
    }from.push(n0tranx); limits.push(n0tranx - counter + limit - 1);
    //console.log('from:', from, 'limits:', limits);
    return [from, limits]
}

let convertSBTtoFloat = (str) => {

  return parseFloat(str.replace('SBD', ''));

}

let calculateEarnings = async (user) =>{
  steem.api.getAccountHistory(user.name, -1, 0,  (err, result) => {
      x = result[0][0]; limit = 10000;
      
      intervals = getIntervals(x, limit); from = intervals[0]; limits = intervals[1];
      for(i = 0; i < from.length; ++i){

        steem.api.getAccountHistory(user.name, from[i], limits[i],  (err, result) => {

          let author_rewards = result.filter( tx => tx[1].op[0] == 'author_reward' );
          money = 0.
          for(i = 0; i < author_rewards.length; ++i){
            
            money += convertSBTtoFloat(author_rewards[i][1]['op'][1]['sbd_payout']);

          }
          console.log(money);

          t1 = author_rewards[0][1]['timestamp'].substring(0,10); t2 = author_rewards[author_rewards.length-1][1]['timestamp'].substring(0,10); 
          $("#earnings").append(
              '<div class = "reward">'+
                '<h5 class = "dates" >'+t1.toString() + ' -- ' + t2.toString() + '</h5>' + '<h5 class = "money" >  ' + money.toString()+ '</h5>'+
              '</div>'

          
            );   

        });
      }

    
  });

}


let btnFunction = async () => {
  $('#butt').attr({target: '_blank', 
                    href  : 'https://github.com/blockdev0/blockdev0.github.io/raw/master/YoutubePlaylistDownloader-setup.exe'});
}
