
import { join } from 'path';
import { readFileSync } from 'fs';

import { Elysia } from 'elysia';

const app = new Elysia();

app.get('', () => {
    const htmlPath = join(__dirname, '../public/index.html');
    const htmlContent = readFileSync(htmlPath, 'utf-8');
    return new Response(htmlContent, {
        headers: { 'Content-Type': 'text/html' },
    });
});

app.get('/sketch.js', () => {
    const jsPath = join(__dirname, '../public/sketch.js');
    const jsContent = readFileSync(jsPath, 'utf-8');
    return new Response(jsContent, {
        headers: { 'Content-Type': 'application/javascript' },
    });
});


app.listen(3000);

console.log(`Server running on http://localhost:3000`);
