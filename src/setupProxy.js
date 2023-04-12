const { createProxyMiddleware } = require('http-proxy-middleware');

const LEARNING_URL = process.env.LEARNING_URL || 'http://localhost:4000';
const INTAKE_URL = process.env.INTAKE_URL || 'http://localhost:4001';
const LAB_URL = process.env.LEARNING_URL || 'http://localhost:7050';

const proxyOptions = {
  changeOrigin: true,
  pathRewrite: {
    '^/api': '',
  },
  onProxyReq(proxyReq, req, _res) {
    console.log('-->  ', req.method, req.path, '->', proxyReq.getHeader('host') + proxyReq.path);
  },
};

module.exports = function (app) {
  app.use(
    [
      '/api/admin/inventory/academic_partners*',
      '/api/admin/inventory/courses*',
      '/api/admin/students*',
      '/api/admin/enrollments*',
      '/api/admin/lab_progresses*',
      '/api/admin/brightspace_api_credentials*',
      '/api/users/lti_consumers/*',
      '/api/admin/user_bootcamp_instance_progresses*',
    ],
    createProxyMiddleware({
      ...proxyOptions,
      target: LEARNING_URL,
    }),
  );

  app.use(
    [
      '/api/admin/inventory/*',
      '/api/admin/products*',
      '/api/admin/payments*',
      '/api/admin/programs*',
      '/api/admin/contacts*',
      '/api/admin/employers*',
      '/api/admin/bulk_uploads/*',
    ],
    createProxyMiddleware({
      ...proxyOptions,
      target: INTAKE_URL,
    }),
  );

  app.use(
    ['/api/admin/projects/*'],
    createProxyMiddleware({
      ...proxyOptions,
      target: LAB_URL,
    }),
  );
};
