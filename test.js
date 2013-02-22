cnt=0;

function a(){

  if(cnt<10){
    cnt++;
    console.log(cnt);
  } else
    clearInterval(tid);
 }

tid=setInterval(a,1000);