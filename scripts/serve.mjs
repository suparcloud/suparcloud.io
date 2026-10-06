import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('_site');
const types={'.html':'text/html; charset=utf-8','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.ico':'image/x-icon','.ttf':'font/ttf','.json':'application/json','.webmanifest':'application/manifest+json','.zip':'application/zip','.txt':'text/plain','.xml':'application/xml'};
http.createServer(async(req,res)=>{
 try{const url=new URL(req.url,'http://localhost');const name=decodeURIComponent(url.pathname);const file=path.resolve(root,'.'+(name.endsWith('/')?name+'index.html':name));if(!file.startsWith(root+path.sep))throw Error();const data=await fs.readFile(file);res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream'});res.end(data);}catch{res.writeHead(404,{'Content-Type':'text/html'});res.end(await fs.readFile(path.join(root,'404.html')));}
}).listen(4173,'127.0.0.1',()=>console.log('Preview: http://127.0.0.1:4173'));
