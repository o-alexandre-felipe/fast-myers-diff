import * as p from "../src/affix";
// @ts-ignore
import Benchtable from 'benchtable';

let a = 'a';
let b = 'b';
let c = 'c';
for (let k = 0; k < 11; ++k) {
  a += a;
  b += b;
  c += c;
}

a = a.slice();
b = b.slice();
c = c.slice();

function getPrefix(n: number) {
  const t = p.getPrefix(a + b, a + c, a.length - n, a.length - n, Math.min(b.length, c.length) + n)
  if (t !== n) {
    throw `getPrefix(${n}) = ${t} Wrong answer`;
  }
}

function getStringPrefix(n: number) {
  const t = p.getStringPrefix(a + b, a + c, a.length - n, a.length - n, Math.min(b.length, c.length) + n)
  if (t !== n) {
    throw `getStringPrefix(${n}) = ${t} Wrong answer`;
  }
}

function getSuffix(n: number) {
  const t = p.getSuffix(b + a, c + a, b.length + n - 1, c.length + n - 1, Math.min(b.length, c.length) + n);
  if (t !== n) {
    throw `getSuffix(${n}) = ${t} Wrong answer`;
  }
}

function getStringSuffix(n: number) {
  const t = p.getStringSuffix(b + a, c + a, b.length + n - 1, c.length + n - 1, Math.min(b.length, c.length) + n);
  if (t !== n) {
    throw `getStringSuffix(${n}) = ${t} Wrong answer`;
  }
}

const suite = (new Benchtable('affix', {isTransposed: true})) as any;
for (let f of [getPrefix, getStringPrefix, getSuffix, getStringSuffix]) {
  suite.addFunction(f.name, f);
}
for (let i = 3; i < 6; ++i) {
  const n = (1 << i) - 1;
  suite.addInput(n, [n])
}
suite.on('cycle', (evt: any) => {
  console.log(" - " + evt.target);
})
suite.on('complete', () => {
  console.log(suite.table.toString());
})
console.log('running')
suite.run({});
