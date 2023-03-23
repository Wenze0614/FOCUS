
// let timer: null | NodeJS.Timer = null;
let timer = null;
function startTimer() {
  timer = setInterval(() => {
    postMessage("tick");
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

// eslint-disable-next-line no-restricted-globals
self.addEventListener('message', (event)=>{
  if(event.data === 'start'){
    startTimer()
  } else if (event.data === 'stop'){
    stopTimer()
  }
})