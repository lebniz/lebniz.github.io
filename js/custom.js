window.onload=function() {
  // Month,Day,Year,Hour,Minute,Second
  upTime('1988-11-08 11:31:21'); // ****** Change this line!
}

function upTime(countTo) {
  now = new Date();

  countTo = countTo.toString().replace(/-/g, "/");
  // countTo = new Date(Date.parse(countTo.replace(/-/g, "/")));
  countTo = new Date(countTo);
  difference = (now-countTo);

  days=Math.floor(difference/(60*60*1000*24)*1);
  hours=Math.floor((difference%(60*60*1000*24))/(60*60*1000)*1);
  mins=Math.floor(((difference%(60*60*1000*24))%(60*60*1000))/(60*1000)*1);
  secs=Math.floor((((difference%(60*60*1000*24))%(60*60*1000))%(60*1000))/1000*1);


    $('#countdown').html(
            '<div class="day">' + days + ' <span>Days</span></div>'+
            '<div class="hour">' + hours + ' <span>Hours</span></div>'+
            '<div class="min">' + mins + ' <span>Minutes</span></div>'+
            '<div class="sec">' + secs + ' <span>Seconds</span></div>'
        );
    

  clearTimeout(upTime.to);
  upTime.to=setTimeout(function(){ upTime(countTo); },1000);
}