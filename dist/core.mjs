export const days=['Montag','Dienstag','Mittwoch','Donnerstag','Freitag'];
export const schedules={normal:[[480,525],[530,575],[600,645],[650,695],[715,760],[765,810],[820,865]],short:[[480,510],[515,545],[570,600],[605,635],[655,685],[690,720],[730,760]]};
export const time=n=>`${Math.floor(n/60)}`.padStart(2,'0')+':'+`${n%60}`.padStart(2,'0');
export function active(day,minute,mode){return day>=0&&day<5?schedules[mode].findIndex(([s,e])=>minute>=s&&minute<e):-1;}
export function parsePages(pages){
 const cells=days.map(()=>Array.from({length:7},()=>({entries:[],note:''})));let starts=null,seen=new Set();
 for(const items of pages){
  const heads=days.map(d=>items.find(t=>t.str.trim()===d));
  if(heads.every(Boolean))starts=heads.map(t=>t.x);
  if(!starts)throw Error('Wochentagsspalten nicht erkannt. Bitte eine Text-PDF im Aufbau des bisherigen Plans verwenden.');
  const step=(starts[4]-starts[0])/4;
  const marks=items.filter(t=>/^[1-7]$/.test(t.str.trim())&&t.x<starts[0]-4).sort((a,b)=>a.y-b.y);
  for(let m=0;m<marks.length;m++){
   const h=+marks[m].str-1;seen.add(h);const top=marks[m].y-4,bottom=m+1<marks.length?marks[m+1].y-4:Infinity;
   for(let d=0;d<5;d++){
    const left=starts[d]-3;const list=items.filter(t=>t.x>=left&&t.x<left+step&&t.y>=top&&t.y<bottom&&t.str.trim()).sort((a,b)=>a.y-b.y||a.x-b.x);
    const rows=[];for(const t of list){let row=rows.find(r=>Math.abs(r.y-t.y)<3);if(!row)rows.push(row={y:t.y,items:[]});row.items.push(t);}
    for(const row of rows){const v=[0,1,2].map(c=>row.items.filter(t=>t.x>=left+c*step/3&&t.x<left+(c+1)*step/3).sort((a,b)=>a.x-b.x).map(t=>t.str.trim()).join(' ').trim());
     if(/^[\p{L}]{2,5}$/u.test(v[0])&&v[2]&&!/\s/.test(v[2]))cells[d][h].entries.push({name:v[0],group:v[1],room:v[2]});
     else cells[d][h].note+=row.items.sort((a,b)=>a.x-b.x).map(t=>t.str.trim()).join(' ')+' ';
    }
   }
  }
 }
 if(seen.size!==7||cells.flat().reduce((n,c)=>n+c.entries.length,0)<1)throw Error('Der Plan konnte nicht vollständig zugeordnet werden. Erwartet werden die Stunden 1–7 und Montag–Freitag. Scans werden nicht unterstützt.');
 return cells;
}
