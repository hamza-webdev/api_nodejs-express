var request = require("request");
var base_url = "http://localhost:3000/";
var server = require("./app.js");

describe("Hello World Server", function () {
  describe("GET /", function () {
    it("returns status code 200", function (done) {
      request.get(base_url, function (error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    // it("returns Hello World", function (done) {
    //   request.get(base_url, function (error, response, body) {
    //     expect(body).toBe(
    //       "Hello, aws ! 👋 tapper le lien: /api/pokemons pour lister tous les poks"
    //     );
    //     done();

    //     server.close();
    //   });
    // });
  });
});
