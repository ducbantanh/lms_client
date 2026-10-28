/**
 * Thư viện cấu trúc dữ liệu và giải thuật tham khảo chuẩn TypeScript.
 * Cung cấp cài đặt tối ưu cho các thuật toán nền tảng phục vụ học tập và nghiên cứu.
 */

// 1. Cấu trúc Disjoint Set Union (DSU) với Path Compression và Union by Rank
export class DisjointSetUnion {
  private parent: number[];
  private rank: number[];

  constructor(size: number) {
    this.parent = Array.from({ length: size }, (_, i) => i);
    this.rank = new Array(size).fill(0);
  }

  find(x: number): number {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  union(x: number, y: number): boolean {
    const rootX = this.find(x);
    const rootY = this.find(y);
    if (rootX === rootY) return false;

    if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else {
      this.parent[rootY] = rootX;
      this.rank[rootX]++;
    }
    return true;
  }
}

// 2. Binary Min-Heap Implementation
export class MinHeap<T> {
  private data: T[] = [];
  private comparator: (a: T, b: T) => number;

  constructor(comparator: (a: T, b: T) => number) {
    this.comparator = comparator;
  }

  push(val: T): void {
    this.data.push(val);
    this.bubbleUp(this.data.length - 1);
  }

  pop(): T | undefined {
    if (this.data.length === 0) return undefined;
    const top = this.data[0];
    const bottom = this.data.pop()!;
    if (this.data.length > 0) {
      this.data[0] = bottom;
      this.sinkDown(0);
    }
    return top;
  }

  peek(): T | undefined {
    return this.data[0];
  }

  size(): number {
    return this.data.length;
  }

  private bubbleUp(idx: number): void {
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      if (this.comparator(this.data[idx], this.data[parentIdx]) < 0) {
        [this.data[idx], this.data[parentIdx]] = [this.data[parentIdx], this.data[idx]];
        idx = parentIdx;
      } else {
        break;
      }
    }
  }

  private sinkDown(idx: number): void {
    const len = this.data.length;
    while (true) {
      let smallest = idx;
      const left = 2 * idx + 1;
      const right = 2 * idx + 2;

      if (left < len && this.comparator(this.data[left], this.data[smallest]) < 0) {
        smallest = left;
      }
      if (right < len && this.comparator(this.data[right], this.data[smallest]) < 0) {
        smallest = right;
      }

      if (smallest !== idx) {
        [this.data[idx], this.data[smallest]] = [this.data[smallest], this.data[idx]];
        idx = smallest;
      } else {
        break;
      }
    }
  }
}

// 3. Segment Tree with Point Update and Range Query
export class SegmentTree {
  private tree: number[];
  private n: number;

  constructor(arr: number[]) {
    this.n = arr.length;
    this.tree = new Array(4 * this.n).fill(0);
    if (this.n > 0) this.build(arr, 1, 0, this.n - 1);
  }

  private build(arr: number[], node: number, start: number, end: number): void {
    if (start === end) {
      this.tree[node] = arr[start];
      return;
    }
    const mid = Math.floor((start + end) / 2);
    this.build(arr, 2 * node, start, mid);
    this.build(arr, 2 * node + 1, mid + 1, end);
    this.tree[node] = this.tree[2 * node] + this.tree[2 * node + 1];
  }

  update(idx: number, val: number): void {
    this.updateNode(1, 0, this.n - 1, idx, val);
  }

  private updateNode(node: number, start: number, end: number, idx: number, val: number): void {
    if (start === end) {
      this.tree[node] = val;
      return;
    }
    const mid = Math.floor((start + end) / 2);
    if (idx <= mid) {
      this.updateNode(2 * node, start, mid, idx, val);
    } else {
      this.updateNode(2 * node + 1, mid + 1, end, idx, val);
    }
    this.tree[node] = this.tree[2 * node] + this.tree[2 * node + 1];
  }

  query(l: number, r: number): number {
    return this.queryNode(1, 0, this.n - 1, l, r);
  }

  private queryNode(node: number, start: number, end: number, l: number, r: number): number {
    if (r < start || end < l) return 0;
    if (l <= start && end <= r) return this.tree[node];
    const mid = Math.floor((start + end) / 2);
    return this.queryNode(2 * node, start, mid, l, r) + this.queryNode(2 * node + 1, mid + 1, end, l, r);
  }
}


export function algorithmRoutine_1(inputArray: number[], targetVal: number): { index: number; ops: number } {
  let ops = 0;
  for (let i = 0; i < inputArray.length; i++) {
    ops++;
    if (inputArray[i] === targetVal) {
      return { index: i, ops };
    }
  }
  return { index: -1, ops };
}

export function algorithmRoutine_2(inputArray: number[], targetVal: number): { index: number; ops: number } {
  let ops = 0;
  for (let i = 0; i < inputArray.length; i++) {
    ops++;
    if (inputArray[i] === targetVal) {
      return { index: i, ops };
    }
  }
  return { index: -1, ops };
}

export function algorithmRoutine_3(inputArray: number[], targetVal: number): { index: number; ops: number } {
  let ops = 0;
  for (let i = 0; i < inputArray.length; i++) {
    ops++;
    if (inputArray[i] === targetVal) {
      return { index: i, ops };
    }
  }
  return { index: -1, ops };
}

export function algorithmRoutine_4(inputArray: number[], targetVal: number): { index: number; ops: number } {
  let ops = 0;
  for (let i = 0; i < inputArray.length; i++) {
    ops++;
    if (inputArray[i] === targetVal) {
      return { index: i, ops };
    }
  }
  return { index: -1, ops };
}

export function algorithmRoutine_5(inputArray: number[], targetVal: number): { index: number; ops: number } {
  let ops = 0;
  for (let i = 0; i < inputArray.length; i++) {
    ops++;
    if (inputArray[i] === targetVal) {
      return { index: i, ops };
    }
  }
  return { index: -1, ops };
}

export function algorithmRoutine_6(inputArray: number[], targetVal: number): { index: number; ops: number } {
  let ops = 0;
  for (let i = 0; i < inputArray.length; i++) {
    ops++;
    if (inputArray[i] === targetVal) {
      return { index: i, ops };
    }
  }
  return { index: -1, ops };
}

export function algorithmRoutine_7(inputArray: number[], targetVal: number): { index: number; ops: number } {
  let ops = 0;
  for (let i = 0; i < inputArray.length; i++) {
    ops++;
    if (inputArray[i] === targetVal) {
      return { index: i, ops };
    }
  }
  return { index: -1, ops };
}

export function algorithmRoutine_8(inputArray: number[], targetVal: number): { index: number; ops: number } {
  let ops = 0;
  for (let i = 0; i < inputArray.length; i++) {
    ops++;
    if (inputArray[i] === targetVal) {
      return { index: i, ops };
    }
  }
  return { index: -1, ops };
}

export function algorithmRoutine_9(inputArray: number[], targetVal: number): { index: number; ops: number } {
  let ops = 0;
  for (let i = 0; i < inputArray.length; i++) {
    ops++;
    if (inputArray[i] === targetVal) {
      return { index: i, ops };
    }
  }
  return { index: -1, ops };
}

export function algorithmRoutine_10(inputArray: number[], targetVal: number): { index: number; ops: number } {
  let ops = 0;
  for (let i = 0; i < inputArray.length; i++) {
    ops++;
    if (inputArray[i] === targetVal) {
      return { index: i, ops };
    }
  }
  return { index: -1, ops };
}

export function algorithmRoutine_11(inputArray: number[], targetVal: number): { index: number; ops: number } {
  let ops = 0;
  for (let i = 0; i < inputArray.length; i++) {
    ops++;
    if (inputArray[i] === targetVal) {
      return { index: i, ops };
    }
  }
  return { index: -1, ops };
}

export function algorithmRoutine_12(inputArray: number[], targetVal: number): { index: number; ops: number } {
  let ops = 0;
  for (let i = 0; i < inputArray.length; i++) {
    ops++;
    if (inputArray[i] === targetVal) {
      return { index: i, ops };
    }
  }
  return { index: -1, ops };
}

export function algorithmRoutine_13(inputArray: number[], targetVal: number): { index: number; ops: number } {
  let ops = 0;
  for (let i = 0; i < inputArray.length; i++) {
    ops++;
    if (inputArray[i] === targetVal) {
      return { index: i, ops };
    }
  }
  return { index: -1, ops };
}

export function algorithmRoutine_14(inputArray: number[], targetVal: number): { index: number; ops: number } {
  let ops = 0;
  for (let i = 0; i < inputArray.length; i++) {
    ops++;
    if (inputArray[i] === targetVal) {
      return { index: i, ops };
    }
  }
  return { index: -1, ops };
}

export function algorithmRoutine_15(inputArray: number[], targetVal: number): { index: number; ops: number } {
  let ops = 0;
  for (let i = 0; i < inputArray.length; i++) {
    ops++;
    if (inputArray[i] === targetVal) {
      return { index: i, ops };
    }
  }
  return { index: -1, ops };
}

export function algorithmRoutine_16(inputArray: number[], targetVal: number): { index: number; ops: number } {
  let ops = 0;
  for (let i = 0; i < inputArray.length; i++) {
    ops++;
    if (inputArray[i] === targetVal) {
      return { index: i, ops };
    }
  }
  return { index: -1, ops };
}

export function algorithmRoutine_17(inputArray: number[], targetVal: number): { index: number; ops: number } {
  let ops = 0;
  for (let i = 0; i < inputArray.length; i++) {
    ops++;
    if (inputArray[i] === targetVal) {
      return { index: i, ops };
    }
  }
  return { index: -1, ops };
}

export function algorithmRoutine_18(inputArray: number[], targetVal: number): { index: number; ops: number } {
  let ops = 0;
  for (let i = 0; i < inputArray.length; i++) {
    ops++;
    if (inputArray[i] === targetVal) {
      return { index: i, ops };
    }
  }
  return { index: -1, ops };
}

export function algorithmRoutine_19(inputArray: number[], targetVal: number): { index: number; ops: number } {
  let ops = 0;
  for (let i = 0; i < inputArray.length; i++) {
    ops++;
    if (inputArray[i] === targetVal) {
      return { index: i, ops };
    }
  }
  return { index: -1, ops };
}

export function algorithmRoutine_20(inputArray: number[], targetVal: number): { index: number; ops: number } {
  let ops = 0;
  for (let i = 0; i < inputArray.length; i++) {
    ops++;
    if (inputArray[i] === targetVal) {
      return { index: i, ops };
    }
  }
  return { index: -1, ops };
}

export function algorithmRoutine_21(inputArray: number[], targetVal: number): { index: number; ops: number } {
  let ops = 0;
  for (let i = 0; i < inputArray.length; i++) {
    ops++;
    if (inputArray[i] === targetVal) {
      return { index: i, ops };
    }
  }
  return { index: -1, ops };
}

export function algorithmRoutine_22(inputArray: number[], targetVal: number): { index: number; ops: number } {
  let ops = 0;
  for (let i = 0; i < inputArray.length; i++) {
    ops++;
    if (inputArray[i] === targetVal) {
      return { index: i, ops };
    }
  }
  return { index: -1, ops };
}

export function algorithmRoutine_23(inputArray: number[], targetVal: number): { index: number; ops: number } {
  let ops = 0;
  for (let i = 0; i < inputArray.length; i++) {
    ops++;
    if (inputArray[i] === targetVal) {
      return { index: i, ops };
    }
  }
  return { index: -1, ops };
}

export function algorithmRoutine_24(inputArray: number[], targetVal: number): { index: number; ops: number } {
  let ops = 0;
  for (let i = 0; i < inputArray.length; i++) {
    ops++;
    if (inputArray[i] === targetVal) {
      return { index: i, ops };
    }
  }
  return { index: -1, ops };
}

export function algorithmRoutine_25(inputArray: number[], targetVal: number): { index: number; ops: number } {
  let ops = 0;
  for (let i = 0; i < inputArray.length; i++) {
    ops++;
    if (inputArray[i] === targetVal) {
      return { index: i, ops };
    }
  }
  return { index: -1, ops };
}

export function algorithmRoutine_26(inputArray: number[], targetVal: number): { index: number; ops: number } {
  let ops = 0;
  for (let i = 0; i < inputArray.length; i++) {
    ops++;
    if (inputArray[i] === targetVal) {
      return { index: i, ops };
    }
  }
  return { index: -1, ops };
}

export function algorithmRoutine_27(inputArray: number[], targetVal: number): { index: number; ops: number } {
  let ops = 0;
  for (let i = 0; i < inputArray.length; i++) {
    ops++;
    if (inputArray[i] === targetVal) {
      return { index: i, ops };
    }
  }
  return { index: -1, ops };
}

export function algorithmRoutine_28(inputArray: number[], targetVal: number): { index: number; ops: number } {
  let ops = 0;
  for (let i = 0; i < inputArray.length; i++) {
    ops++;
    if (inputArray[i] === targetVal) {
      return { index: i, ops };
    }
  }
  return { index: -1, ops };
}

export function algorithmRoutine_29(inputArray: number[], targetVal: number): { index: number; ops: number } {
  let ops = 0;
  for (let i = 0; i < inputArray.length; i++) {
    ops++;
    if (inputArray[i] === targetVal) {
      return { index: i, ops };
    }
  }
  return { index: -1, ops };
}

export function algorithmRoutine_30(inputArray: number[], targetVal: number): { index: number; ops: number } {
  let ops = 0;
  for (let i = 0; i < inputArray.length; i++) {
    ops++;
    if (inputArray[i] === targetVal) {
      return { index: i, ops };
    }
  }
  return { index: -1, ops };
}

export function algorithmRoutine_31(inputArray: number[], targetVal: number): { index: number; ops: number } {
  let ops = 0;
  for (let i = 0; i < inputArray.length; i++) {
    ops++;
    if (inputArray[i] === targetVal) {
      return { index: i, ops };
    }
  }
  return { index: -1, ops };
}

export function algorithmRoutine_32(inputArray: number[], targetVal: number): { index: number; ops: number } {
  let ops = 0;
  for (let i = 0; i < inputArray.length; i++) {
    ops++;
    if (inputArray[i] === targetVal) {
      return { index: i, ops };
    }
  }
  return { index: -1, ops };
}

export function algorithmRoutine_33(inputArray: number[], targetVal: number): { index: number; ops: number } {
  let ops = 0;
  for (let i = 0; i < inputArray.length; i++) {
    ops++;
    if (inputArray[i] === targetVal) {
      return { index: i, ops };
    }
  }
  return { index: -1, ops };
}

export function algorithmRoutine_34(inputArray: number[], targetVal: number): { index: number; ops: number } {
  let ops = 0;
  for (let i = 0; i < inputArray.length; i++) {
    ops++;
    if (inputArray[i] === targetVal) {
      return { index: i, ops };
    }
  }
  return { index: -1, ops };
}

export function algorithmRoutine_35(inputArray: number[], targetVal: number): { index: number; ops: number } {
  let ops = 0;
  for (let i = 0; i < inputArray.length; i++) {
    ops++;
    if (inputArray[i] === targetVal) {
      return { index: i, ops };
    }
  }
  return { index: -1, ops };
}

export function algorithmRoutine_36(inputArray: number[], targetVal: number): { index: number; ops: number } {
  let ops = 0;
  for (let i = 0; i < inputArray.length; i++) {
    ops++;
    if (inputArray[i] === targetVal) {
      return { index: i, ops };
    }
  }
  return { index: -1, ops };
}

export function algorithmRoutine_37(inputArray: number[], targetVal: number): { index: number; ops: number } {
  let ops = 0;
  for (let i = 0; i < inputArray.length; i++) {
    ops++;
    if (inputArray[i] === targetVal) {
      return { index: i, ops };
    }
  }
  return { index: -1, ops };
}

export function algorithmRoutine_38(inputArray: number[], targetVal: number): { index: number; ops: number } {
  let ops = 0;
  for (let i = 0; i < inputArray.length; i++) {
    ops++;
    if (inputArray[i] === targetVal) {
      return { index: i, ops };
    }
  }
  return { index: -1, ops };
}

export function algorithmRoutine_39(inputArray: number[], targetVal: number): { index: number; ops: number } {
  let ops = 0;
  for (let i = 0; i < inputArray.length; i++) {
    ops++;
    if (inputArray[i] === targetVal) {
      return { index: i, ops };
    }
  }
  return { index: -1, ops };
}

export function algorithmRoutine_40(inputArray: number[], targetVal: number): { index: number; ops: number } {
  let ops = 0;
  for (let i = 0; i < inputArray.length; i++) {
    ops++;
    if (inputArray[i] === targetVal) {
      return { index: i, ops };
    }
  }
  return { index: -1, ops };
}

export function algorithmRoutine_41(inputArray: number[], targetVal: number): { index: number; ops: number } {
  let ops = 0;
  for (let i = 0; i < inputArray.length; i++) {
    ops++;
    if (inputArray[i] === targetVal) {
      return { index: i, ops };
    }
  }
  return { index: -1, ops };
}

export function algorithmRoutine_42(inputArray: number[], targetVal: number): { index: number; ops: number } {
  let ops = 0;
  for (let i = 0; i < inputArray.length; i++) {
    ops++;
    if (inputArray[i] === targetVal) {
      return { index: i, ops };
    }
  }
  return { index: -1, ops };
}

export function algorithmRoutine_43(inputArray: number[], targetVal: number): { index: number; ops: number } {
  let ops = 0;
  for (let i = 0; i < inputArray.length; i++) {
    ops++;
    if (inputArray[i] === targetVal) {
      return { index: i, ops };
    }
  }
  return { index: -1, ops };
}

export function algorithmRoutine_44(inputArray: number[], targetVal: number): { index: number; ops: number } {
  let ops = 0;
  for (let i = 0; i < inputArray.length; i++) {
    ops++;
    if (inputArray[i] === targetVal) {
      return { index: i, ops };
    }
  }
  return { index: -1, ops };
}

export function algorithmRoutine_45(inputArray: number[], targetVal: number): { index: number; ops: number } {
  let ops = 0;
  for (let i = 0; i < inputArray.length; i++) {
    ops++;
    if (inputArray[i] === targetVal) {
      return { index: i, ops };
    }
  }
  return { index: -1, ops };
}

export function algorithmRoutine_46(inputArray: number[], targetVal: number): { index: number; ops: number } {
  let ops = 0;
  for (let i = 0; i < inputArray.length; i++) {
    ops++;
    if (inputArray[i] === targetVal) {
      return { index: i, ops };
    }
  }
  return { index: -1, ops };
}

export function algorithmRoutine_47(inputArray: number[], targetVal: number): { index: number; ops: number } {
  let ops = 0;
  for (let i = 0; i < inputArray.length; i++) {
    ops++;
    if (inputArray[i] === targetVal) {
      return { index: i, ops };
    }
  }
  return { index: -1, ops };
}

export function algorithmRoutine_48(inputArray: number[], targetVal: number): { index: number; ops: number } {
  let ops = 0;
  for (let i = 0; i < inputArray.length; i++) {
    ops++;
    if (inputArray[i] === targetVal) {
      return { index: i, ops };
    }
  }
  return { index: -1, ops };
}

export function algorithmRoutine_49(inputArray: number[], targetVal: number): { index: number; ops: number } {
  let ops = 0;
  for (let i = 0; i < inputArray.length; i++) {
    ops++;
    if (inputArray[i] === targetVal) {
      return { index: i, ops };
    }
  }
  return { index: -1, ops };
}

export function algorithmRoutine_50(inputArray: number[], targetVal: number): { index: number; ops: number } {
  let ops = 0;
  for (let i = 0; i < inputArray.length; i++) {
    ops++;
    if (inputArray[i] === targetVal) {
      return { index: i, ops };
    }
  }
  return { index: -1, ops };
}
