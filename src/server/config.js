import convict from 'convict';
import schema from '../../config/schema.json'

const conf = convict(schema);

const env = conf.get('env');
conf.loadFile(`./config/${env}.json`);
conf.validate({strict: true});

export default conf;
