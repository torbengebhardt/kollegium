import assert from 'node:assert/strict';
import {active,schedules} from '../dist/core.mjs';
const expected={normal:['08:00-08:45','08:50-09:35','10:00-10:45','10:50-11:35','11:55-12:40','12:45-13:30','13:40-14:25'],short:['08:00-08:30','08:35-09:05','09:30-10:00','10:05-10:35','10:55-11:25','11:30-12:00','12:10-12:40']};
const min=s=>+s.slice(0,2)*60+(+s.slice(3));
for(const mode of Object.keys(expected))for(const [i,range] of expected[mode].entries()){
const [start,end]=range.split('-').map(min);
assert.deepEqual(schedules[mode][i],[start,end]);
for(let day=0;day<5;day++){assert.equal(active(day,start,mode),i);assert.equal(active(day,end-1,mode),i);assert.equal(active(day,end,mode),-1);assert.equal(active(day,start-1,mode),-1)}
for(const day of [5,6])assert.equal(active(day,start,mode),-1);
}
console.log('All 14 specified time ranges, boundaries, breaks and weekends passed.');
