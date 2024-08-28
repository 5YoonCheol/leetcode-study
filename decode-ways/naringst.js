/**
 * 답안 참고 풀이
 * 💡 왜 못풀었을까?
 *  한 자리, 두 자리 경우 중 가능한 경우에 대해 조건 분기를 제대로 못했음.
 */

var numDecodings = function (s) {
  const dp = Array(s.length + 1).fill(0);

  // 예외 처리
  if (s[0] === "0") return 0;

  dp[0] = 1;
  dp[1] = 1;

  for (let i = 2; i <= s.length; i++) {
    // 1자리 값 , 2자리 값 파싱
    const oneDigit = +s.slice(i - 1, i);
    const twoDigits = +s.slice(i - 2, i);
    // 각 값이 가능한지 판단: 여기를 제대로 식을 세우지 못했음
    if (oneDigit > 0) dp[i] = dp[i - 1];
    if (twoDigits >= 10 && twoDigits <= 26) dp[i] += dp[i - 2];
  }
  return dp[s.length];
};

/**
 * 처음 떠올렸던 방식인 dp로는 풀기 어려울 것 같아 풀이를 다시 생각해 봄.
 * 문자를 만드는 걸 숫자를 칸막이로 나누는 개념으로 생각. ex) 2/5/2/4, 2/52/4
 * 그러면 숫자와 숫자 사이 칸막이를 넣을지, 말지의 문제로 귀결
 * 2의 (s.length-1)제곱의 경우의 수 발생
 * 그 중 안되는 경우를 제외하면 답이 됨.
 * */

/**
 * @param {string} s
 * @return {number}
 */

/**
 * NOTE 첫 풀이 -> 잘못된 풀이
 * dp를 사용해서 한자리씩, 그리고 다음 자릿수와 함께 두 자리 씩 확인해 경우의 수를 추가하면 된다고 생각했는데,
 * 2101과 같은 경우에 동작하지 않음.
 *
 * */

var numDecodings = function (s) {
  let dp = Array(s.length).fill(0);

  // 시작 숫자가 0이면 불가능 -> 예외 처리
  if (s[0] !== "0") {
    dp[0] = 1;
  } else {
    return 0;
  }

  for (let i = 0; i < s.length; i++) {
    if (i !== s.length - 1 && Number(s[i] + s[i + 1]) <= 26 && s[i] !== "0") {
      dp[i + 1] = dp[i] + 1;
    } else if (s[i + 1] === "0" || Number(s[i] + s[i + 1]) > 26) {
      dp[i + 1] = dp[i];
    }
  }
  return dp[s.length - 1];
};
