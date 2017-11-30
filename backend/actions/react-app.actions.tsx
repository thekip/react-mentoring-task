import { app } from '../app';
import fs from 'fs';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { App } from '../../src/components/app.component';
import { Request, Response } from 'express';

app.get('*', handleRender);

function handleRender(_req: Request, res: Response) {
  const html = ReactDOMServer.renderToString(
    <App />,
  );
  fs.readFile('./index.html', 'utf8', (_err, file) => {
    // if (err) {
    //   return console.log(err);
    // }

    const document = file.replace(/<div id="root"><\/div>/, `<div id="app">${html}</div>`);
    res.send(document);
  });
}
