const config = require('config');
const fs = require('fs');
const path = require('path');
const router = require('express').Router();
const yaml = require('js-yaml');

const agriSeafoodOpScreening = require('../forms/attestations/agriseafoodopscreening');
const farmOpScreening = require('../forms/attestations/farmopscreening');
const forestrySectorOperatorScreening = require('../forms/attestations/forestrysectoroperatorscreening');
const form = require('../forms/form');
const minesOperatorScreening = require('../forms/attestations/minesoperatorscreening');

const getSpec = () => {
  const rawSpec = fs.readFileSync(path.join(__dirname, '../docs/v1.api-spec.yaml'), 'utf8');
  const spec = yaml.load(rawSpec);
  spec.servers[0].url = `${config.get('server.basePath')}/api/v1`;
  spec.components.securitySchemes.OpenID.openIdConnectUrl = `${config.get('server.keycloak.serverUrl')}/realms/${config.get('server.keycloak.realm')}/.well-known/openid-configuration`;
  return spec;
};

const agriSeafoodOpScreeningPath = agriSeafoodOpScreening.mount(router);
const farmOpScreeningPath = farmOpScreening.mount(router);
const forestrySectorOperatorScreeningPath = forestrySectorOperatorScreening.mount(router);
const formPath = form.mount(router);
const minesOperatorScreeningPath = minesOperatorScreening.mount(router);

// Base v1 Responder
router.get('/', (_req, res) => {
  res.status(200).json({
    endpoints: [
      agriSeafoodOpScreeningPath,
      '/docs',
      farmOpScreeningPath,
      forestrySectorOperatorScreeningPath,
      formPath,
      minesOperatorScreeningPath
    ]
  });
});

/** OpenAPI Docs */
router.get('/docs', (_req, res) => {
  const docs = require('../docs/docs');
  res.send(docs.getDocHTML('v1'));
});

/** OpenAPI YAML Spec */
router.get('/api-spec.yaml', (_req, res) => {
  res.status(200).type('application/yaml').send(yaml.dump(getSpec()));
});

/** OpenAPI JSON Spec */
router.get('/api-spec.json', (_req, res) => {
  res.status(200).json(getSpec());
});

module.exports = router;
