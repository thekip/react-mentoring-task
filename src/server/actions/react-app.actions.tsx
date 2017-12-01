import { app } from '../app';
import { handleRender } from '../built/server.js';

app.get('*', handleRender);
