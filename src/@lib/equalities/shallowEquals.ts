// 두 값의 얕은 비교를 수행합니다
export function shallowEquals<T extends object>(objA: T, objB: T): boolean {
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

  // 3. 객체의 키 개수가 다른 경우 처리
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) {
    return false;
  }

  // 4. 모든 키에 대해 얕은 비교 수행
  // 4-1. 방식1: every 사용(권장): hasOwnProperty 안전장치가 있기 때문: prototype 체인에서 상속된 속성과의 충돌 방지
  return keysA.every(
    (item) =>
      Object.prototype.hasOwnProperty.call(objB, item) &&
      (objA as { [key: string]: unknown })[item] ===
        (objB as { [key: string]: unknown })[item],
  );
  // // 4-2. 방식2: for-of 사용
  // for (const key of keysA) {
  //   if (objA[key as keyof T] !== objB[key as keyof T]) {
  //     return false;
  //   }
  // }
  // return true;
}
