import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiImmutable from 'chai-immutable';

chai.should();
chai.use(chaiImmutable);
chai.use(chaiAsPromised);
