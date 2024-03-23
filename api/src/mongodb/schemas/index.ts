import fs from 'fs';
import path from 'path';

const models: { [key: string]: any } = {};

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && 
      file !== path.basename(__filename) && 
      file.slice(-3) === '.ts'
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file));
    const modelName = file.split('.')[0];
    models[modelName] = model.default;
  });

export default models;