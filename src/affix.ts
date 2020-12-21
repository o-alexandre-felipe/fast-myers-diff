import {Indexable} from "./index";


export function getPrefix<T extends Indexable<unknown>> (xs: T, ys: T, i: number, j: number, count: number): number {
  for(let k = 0; k < count; ++k){
    if(xs[i+k] !== ys[j+k]) {
      return k;
    }
  }
  return count;
}

export function getSuffix<T extends Indexable<unknown>> (xs: T, ys: T, i: number, j: number, count: number): number {
  for(let k = 0; k < count; ++k){
    if(xs[i-k] !== ys[j-k]) {
      return k;
    }
  }
  return count;
}

export function getStringPrefix(xs: string, ys: string, i: number, j: number, count: number): number {
  let start = 0;
  let middle = start + 1;
  let end = count;
  // for very long strings avoid compare the complete substring
  // at the first iteration
  while(middle < count){
    if(xs.substring(i + start, i + middle) === ys.substring(j + start, i + middle)){
      [start, middle] = [middle, 3*middle - start];
    }else{
      end = middle;
      break;
    }
  }
  // proper binary search
  while(start < end - 1){
    middle = Math.floor((start + end) / 2);
    if(xs.substring(i + start, i + middle) === ys.substring(j + start, i + middle)){
      start = middle;
    }else{
      end = middle;
    }
  }
  if(xs[i+start] === ys[j+start]){
    ++start;
  }
  return start;
}

export function getStringSuffix(xs: string, ys: string, i: number, j: number, count: number): number {
  let start = 0;
  let middle = start + 1;
  let end = count;
  // for very long strings avoid compare the complete substring
  // at the first iteration
  while(middle < count){
    if(xs.substr(i - middle + 1, middle - start) === ys.substr(j - middle + 1, middle - start)){
      [start, middle] = [middle, 3*middle - start];
    }else{
      end = middle;
      break;
    }
  }
  // proper binary search
  while(start < end - 1){
    middle = Math.floor((start + end) / 2);
    if(xs.substr(i - middle + 1, middle - start) === ys.substr(j - middle + 1, middle - start)){
      start = middle;
    }else{
      end = middle;
    }
  }
  if(xs[i-start] === ys[j-start]){
    ++start;
  }
  return start;
}
