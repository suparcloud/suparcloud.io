import {execFileSync} from 'node:child_process';
import fs from 'node:fs/promises';
await fs.rm('suparcloud-brand-kit.zip',{force:true});
execFileSync('zip',['-qr','suparcloud-brand-kit.zip','assets/brand','assets/fonts','BRAND-GUIDE.md','brand.html','styles.css','favicon.svg','favicon.ico','apple-touch-icon.png','social-card.png']);
console.log('Brand kit archive refreshed.');
