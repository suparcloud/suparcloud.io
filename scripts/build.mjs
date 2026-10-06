import fs from 'node:fs/promises';
const files=['index.html','brand.html','styles.css','404.html','CNAME','.nojekyll','robots.txt','sitemap.xml','site.webmanifest','favicon.svg','favicon.ico','apple-touch-icon.png','social-card.png','suparcloud-brand-kit.zip'];
await fs.rm('_site',{recursive:true,force:true});
await fs.mkdir('_site');
for(const file of files) await fs.copyFile(file,`_site/${file}`);
await fs.cp('assets','_site/assets',{recursive:true});
console.log('Static site staged in _site/');
