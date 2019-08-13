var request = require('supertest'),
should = require('should'),
app = require('../app.js');
var data = require("../class.js");
var assert =require("assert");
describe( "Inserta datos", function() {
  it('PUT, responde ok', function (done) {
	request(app)
	    .put('/data/P1/12/34/23/123455')
	    .expect('Content-Type', /json/)
	    .expect(200,done);
    });
    it('should return ID', function (done) {
  	request(app)
  	    .put('/data/P1/12/34/22/123456')
  	    .expect('Content-Type', /json/)
  	    .expect(200)
  	    .end( function ( error, resultado ) {
        		if ( error ) {
        		    return done( error );
        		}
        		resultado.body.should.have.property('ID', "P1,12,123456");
        		done();
    	    });
    });
});


describe( "edita datos", function() {
  it('POST, responde ok', function (done) {
	request(app)
	    .post('/data/P1/12/34/23/123456')
	    .expect('Content-Type', /json/)
	    .expect(200,done);
    });
    it('should return 404', function (done) {
  	request(app)
  	    .post('/data/P2/12/34/22/123456')
  	    .expect('Content-Type', /text/)
  	    .expect(404)
  	    .end( function ( error, resultado ) {
        		if ( error ) {
        		    return done( error );
        		}
        		done();
    	    });
    });
});



describe( "obtiene datos", function() {
  it('GET responde ok', function (done) {
	request(app)
	    .get('/data')
	    .expect('Content-Type', /json/)
	    .expect(200,done);
    });
    it('ruta por defecto', function (done) {
  	request(app)
  	    .get('/')
  	    .expect('Content-Type', /json/)
  	    .expect(200,done);


    });
});



describe( "borra datos", function() {
  it('delete responde ok', function (done) {
	request(app)
	    .delete('/data/P1/12/34/23/123456')
	    .expect('Content-Type', /json/)
	    .expect(200,done);
    });
    it('delete responde ok', function (done) {
  	request(app)
  	    .delete('/data/P1/12/34/23/12334456')
  	    .expect('Content-Type', /text/)
  	    .expect(404,done);
      });
});



//clase
describe( "OBJECT TEST", function() {



  it('Add new id', function(done){
    var nuevos_datos = new data.Datos("P1",12,11,25,123356);

      assert.equal(nuevos_datos.ID,"P1,12,123356");
      done();
  });
});
