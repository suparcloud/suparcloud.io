import {chromium} from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import sharp from 'sharp';
const browser=await chromium.launch({headless:true});
await fs.mkdir('artifacts',{recursive:true});
let count=0;
try {
 for(const width of [1440,768,390,320]) {
  const context=await browser.newContext({viewport:{width,height:1000},deviceScaleFactor:1});
  const page=await context.newPage();
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  for(const route of ['/','/brand.html']) {
   await page.goto('http://127.0.0.1:4173'+route);await page.evaluate(()=>document.fonts.ready);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth),false,`Overflow ${width} ${route}`);
   assert.equal(await page.locator('h1').count(),1);
   assert.deepEqual(await page.locator('img').evaluateAll(imgs=>imgs.filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.src)),[]);
   const a11y=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
   assert.deepEqual(a11y.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)})),[],`Accessibility ${width} ${route}`);
   const links=await page.locator('a[href],link[href]').evaluateAll(es=>es.map(e=>e.getAttribute('href')));
   for(const href of links) {
    if(/^(https?:|mailto:)/.test(href))continue;
    const url=new URL(href,page.url());
    const response=await page.request.get(url.href);assert.equal(response.status(),200,`Broken ${href}`);
    if(url.hash&&url.pathname===new URL(page.url()).pathname)assert.equal(await page.locator(url.hash).count(),1,`Missing anchor ${href}`);
   }
   await page.screenshot({path:`artifacts/${route==='/'?'home':'brand'}-${width}.png`,fullPage:true});
   count++;
  }
  assert.deepEqual(errors,[]);await page.close();
 }
 const page=await browser.newPage();await page.goto('http://127.0.0.1:4173/');await page.keyboard.press('Tab');assert.equal(await page.locator('.skip').evaluate(e=>document.activeElement===e),true);
 await page.getByRole('link',{name:'Meet SuparShip'}).click();assert.equal(new URL(page.url()).hash,'#projects');
 await page.goto('http://127.0.0.1:4173/brand.html');const downloadEvent=page.waitForEvent('download');await page.getByRole('link',{name:'Download brand kit ↓',exact:true}).click();const download=await downloadEvent;assert.equal(download.suggestedFilename(),'suparcloud-brand-kit.zip');
 assert.equal((await page.request.get('http://127.0.0.1:4173/missing')).status(),404);
 const files=await fs.readdir('assets/brand');
 for(const name of files.filter(n=>n.endsWith('.png'))){const m=await sharp(path.join('assets/brand',name)).metadata();const avatar=name.match(/avatar-\w+-(\d+)/);if(avatar){assert.equal(m.width,Number(avatar[1]));assert.equal(m.height,m.width);}else if(name.startsWith('social-card')){assert.equal(m.width,1200);assert.equal(m.height,630);}else{assert.equal(m.width,Number(name.match(/-(\d+)\.png$/)[1]));}}
 const rgb=h=>h.match(/\w\w/g).map(x=>parseInt(x,16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);const lum=h=>rgb(h).reduce((a,x,i)=>a+x*[.2126,.7152,.0722][i],0);for(const [a,b] of [['FFFFFF','1261F3'],['FFFFFF','7850DA'],['142747','FFFFFF'],['536178','F7F9FC']]){const ls=[lum(a),lum(b)].sort((a,b)=>b-a);const ratio=(ls[0]+.05)/(ls[1]+.05);assert.ok(ratio>=4.5);console.log(`${a}/${b}: ${ratio.toFixed(2)}:1`);}
 console.log(`PASS: ${count} responsive page checks; WCAG A/AA automated checks; local links; downloads; keyboard entry; 404; PNG dimensions; palette contrast.`);
} finally {await browser.close();}
