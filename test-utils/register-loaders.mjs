import { register } from 'node:module';
import { pathToFileURL } from 'node:url';

register('./test-utils/hb-loader.js', pathToFileURL('./'));
register('node-esm-loader', pathToFileURL('./'));
register('esm-loader-typescript', pathToFileURL('./'));
register('esm-loader-css', pathToFileURL('./'));
register('esmock', pathToFileURL('./'));
