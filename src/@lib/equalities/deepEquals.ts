// 두 값의 깊은 비교를 수행합니다
export function deepEquals<T>(objA: T, objB: T): boolean {
  // 1. 두 값이 정확히 같은지 확인 (참조가 같은 경우)
  // Object.is를 사용하면 NaN이나 +0, -0도 정확하게 구분할 수 있는 장점이 있다
  // === 보다는 더 정밀한 비교가 가능한 방식이라고 생각합니다
  if (Object.is(objA, objB)) {
    return true;
  }

  // 2. 타입 체크 - null도 함께 처리
  // typeof null은 Objectdlrl 때문에 null 체크를 따로 할 필요는 없음
  if (typeof objA !== "object" || typeof objB !== "object") {
    return false;
  }

  // 3. 배열인 경우 처리
  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (!Array.isArray(objB) || objA.length !== objB.length) {
      return false;
    }

    for (let i = 0; i < objA.length; i++) {
      if (!deepEquals(objA[i], objB[i])) {
        return false;
      }
    }
    return true;
  }

  // 4. 객체의 키 개수가 다른 경우 처리
  const keysA = Object.keys(objA as object);
  const keysB = Object.keys(objB as object);
  if (keysA.length !== keysB.length) {
    return false;
  }

  // 5. 모든 키에 대해 깊은 비교 수행, every를 이용한 방식으로 변경
  return keysA.every(
    (key) =>
      Object.prototype.hasOwnProperty.call(objB, key) &&
      deepEquals(objA[key as keyof T], objB[key as keyof T]),
  );

  // for (const key of keysA) {
  //   if (!deepEquals(objA[key as keyof T], objB[key as keyof T])) {
  //     return false;
  //   }
  // }
  // return true;
}
