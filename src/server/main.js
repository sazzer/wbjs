require('source-map-support').install();
import {buildServer} from './server';

buildServer().listen(3000);
