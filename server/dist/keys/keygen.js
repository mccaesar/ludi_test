"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _crypto = require("crypto");

var _fs = require("fs");

var _path = _interopRequireDefault(require("path"));

/**
 * This module will generate a public and private keypair and save to current directory
 *
 * Make sure to save the private key elsewhere after generated!
 */
function keygen() {
  var __dirname = _path["default"].resolve(); // Generates an object where the keys are stored in properties `privateKey` and `publicKey`


  var keyPair = (0, _crypto.generateKeyPairSync)('rsa', {
    modulusLength: 4096,
    // bits - standard for RSA keys
    publicKeyEncoding: {
      type: 'pkcs1',
      // "Public Key Cryptography Standards 1"
      format: 'pem' // Most common formatting choice

    },
    privateKeyEncoding: {
      type: 'pkcs1',
      // "Public Key Cryptography Standards 1"
      format: 'pem' // Most common formatting choice

    }
  }); // Create the public key file

  (0, _fs.writeFileSync)(__dirname + '/id_rsa_pub.pem', keyPair.publicKey); // Create the private key file

  (0, _fs.writeFileSync)(__dirname + '/id_rsa_priv.pem', keyPair.privateKey);
} // Generate the keypair


keygen();