var async = require('async'); 
async.series([

  // 첫번째 실행
  // async의 프로세스 흐름을 도와줄 수 있는 callback이 전달됩니다.
  // 이를 이용하여 흐름을 제어할 수 있는것입니다.
  // 즉, 다음 task으로 이동하기 위해서는 callback을 실행해야 합니다.
  // 사용방법은 callback(에러, 결과값) 형태로 사용됩니다.
  // -----------------------------------------------------

  function(callback) {
    console.log('--- async.series::ste#1 ---');

    // 다음 task으로 이동하기 위해 실행
    // 첫번째 인수로 에러
    // 두번째부터는 마지막 callback에 전달할 값들을 설정할 수 있습니다.
    // 예) callback(null, 'one' [, value ...]);
    // ---------------------------------------------------------

    callback(null, 'one');

    // 예) 첫번째 인수로 에러를 발생시킬 경우
    // 만약 이곳에서 첫번째 인수를 new Error('error message')를 전달하면
    // 선언된 tasks의 동작은 여기서 멈추고,
    // 마지막 callback으로 프로세스 진행이 넘어갑니다.
    // ----------------------------------------------------------

    // callback(new Error('error message'), null);
  },


  // 두번째 실행
  // -----------

  function(callback) {
    console.log('--- async.series::ste#2 ---');

    // 다음 task으로 이동하기 위해 실행
    // 에러는 null, 전달할 결과값은 'two'    
    callback(null, 'two');
  }
],

// 모든 task를 끝내고, 아래 callback으로 에러와 배열인자가 전달됩니다.
// ------------------------------------------------------

function(err, results) {
  console.log('--- async.series result ---');
  console.log(arguments);
});