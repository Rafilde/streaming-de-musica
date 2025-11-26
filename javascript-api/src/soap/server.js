const express = require('express');
const soap = require('soap');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../../.env') });

const soapService = require('./service');

const app = express();
const PORT = process.env.SOAP_PORT || 5000;

const xml = fs.readFileSync(path.join(__dirname, 'musicstreaming.wsdl'), 'utf8');

app.listen(PORT, () => {
  console.log(`SOAP API running on http://localhost:${PORT}`);
  
  soap.listen(app, '/wsdl', soapService, xml, () => {
    console.log(`WSDL available at http://localhost:${PORT}/wsdl?wsdl`);
  });
});

module.exports = app;
