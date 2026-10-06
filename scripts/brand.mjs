import fs from 'node:fs/promises';
import sharp from 'sharp';
import opentype from 'opentype.js';
const dir = 'assets/brand';
await fs.mkdir(dir, {recursive:true});
const bytes = await fs.readFile('assets/fonts/Poppins-Bold.ttf');
const font = opentype.parse(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength));
const colors = {blue:'#1261F3',violet:'#7850DA',ink:'#142747',paper:'#F7F9FC',muted:'#536178',line:'#DEE4EE'};
await fs.writeFile(`${dir}/tokens.json`,JSON.stringify(colors,null,2)+'\n');
const shapes = ['M 244 290 C 260 123 397 0 552 0 C 680 0 789 78 842 204 C 693 149 484 267 397 448 C 328 590 233 668 142 668 C 46 668 0 612 0 521 C 0 389 119 278 244 290 Z','M 110 748 C 270 783 432 684 508 522 C 562 407 657 294 774 294 C 902 294 1000 398 1000 529 C 1000 699 855 834 686 834 L 330 834 C 243 834 166 800 110 748 Z'];
const mark=(variant='color')=>shapes.map((d,i)=>`<path fill="${variant==='white'?'#FFFFFF':variant==='ink'?colors.ink:[colors.blue,colors.violet][i]}" d="${d}"/>`).join('');
const svg=(w,h,body)=>`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${body}</svg>`;
const text=(s,size,x,y,color)=>{
 const data=font.getPath(s,x,y,size).commands.map(c=>{
  const keys={M:['x','y'],L:['x','y'],Q:['x1','y1','x','y'],C:['x1','y1','x2','y2','x','y'],Z:[]}[c.type];
  return c.type+keys.map(k=>{if(!Number.isFinite(c[k]))throw Error('Invalid font outline');return c[k].toFixed(2);}).join(' ');
 }).join(' ');
 return '<path fill="'+color+'" d="'+data+'"/>';
};
const sources={};
for (const variant of ['color','reverse','ink','white']) {
 const fg=variant==='reverse'||variant==='white'?'#FFFFFF':colors.ink;
 const m=mark(variant==='reverse'?'color':variant);
 sources[`mark-${variant}`]=svg(1000,834,m);
 const word=text('uparcloud',172,232,173,fg);
 sources[`horizontal-${variant}`]=svg(1166,220,`<g transform="translate(8 14) scale(.21)">${m}</g>${word}`);
 sources[`stacked-${variant}`]=svg(1000,670,`<g transform="translate(260 20) scale(.48)">${m}</g>${text('suparcloud',150,50,600,fg)}`);
}
for(const [name,source] of Object.entries(sources)) {
 await fs.writeFile(`${dir}/${name}.svg`,source);
 for(const width of (name.startsWith('mark')?[32,64,128,256,512,1024]:[320,640,1280,2560])) await sharp(Buffer.from(source)).resize({width}).png().toFile(`${dir}/${name}-${width}.png`);
}
for(const [theme,bg,variant] of [['light','#FFFFFF','color'],['dark',colors.ink,'reverse'],['blue',colors.blue,'white']]) {
 for(const size of [180,192,400,512,1024]) {
 const source=svg(size,size,`<rect width="${size}" height="${size}" fill="${bg}"/><g transform="translate(${size*.18} ${size*.233}) scale(${size*.00064})">${mark(variant==='reverse'?'color':variant)}</g>`);
 await sharp(Buffer.from(source)).png().toFile(`${dir}/avatar-${theme}-${size}.png`);
 }
}
const favicon=svg(64,64,`<rect width="64" height="64" rx="14" fill="#FFFFFF"/><g transform="translate(7 11) scale(.05)">${mark()}</g>`);
await fs.writeFile('favicon.svg',favicon);
for(const size of [16,32,48]) await sharp(Buffer.from(favicon)).resize(size,size).png().toFile(`${dir}/favicon-${size}.png`);
await fs.copyFile(`${dir}/avatar-light-180.png`,'apple-touch-icon.png');
// ICO directory with embedded PNG payloads; modern browsers support this encoding.
const icons=await Promise.all([16,32,48].map(s=>fs.readFile(`${dir}/favicon-${s}.png`)));
const header=Buffer.alloc(6+16*icons.length);header.writeUInt16LE(1,2);header.writeUInt16LE(icons.length,4);let offset=header.length;
icons.forEach((b,i)=>{let p=6+i*16;header[p]=header[p+1]=[16,32,48][i];header.writeUInt16LE(1,p+4);header.writeUInt16LE(32,p+6);header.writeUInt32LE(b.length,p+8);header.writeUInt32LE(offset,p+12);offset+=b.length;});
await fs.writeFile('favicon.ico',Buffer.concat([header,...icons]));
const social=svg(1200,630,`<rect width="1200" height="630" fill="${colors.ink}"/><circle cx="1100" cy="70" r="310" fill="#20365B"/><g transform="translate(860 180) scale(.27)">${mark()}</g>${text('suparcloud',42,70,110,'#FFFFFF')}${text('Less friction.',76,70,270,'#FFFFFF')}${text('More possibility.',76,70,367,'#FFFFFF')}${text('Open tools. Your cloud.',27,74,505,'#B9CAEA')}`);
await fs.writeFile(`${dir}/social-card.svg`,social);
await sharp(Buffer.from(social)).png().toFile(`${dir}/social-card-1200x630.png`);
await fs.copyFile(`${dir}/social-card-1200x630.png`,'social-card.png');
console.log('Exported vector masters, PNG sizes, avatars, favicon and social card.');
