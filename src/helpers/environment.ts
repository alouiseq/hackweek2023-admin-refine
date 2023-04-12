export const devEnv = () => {
  const isDevFrontend = process.env.NODE_ENV === 'development' ? true : false;
  return isDevFrontend ? 'development' : '';
};

export const backendEnv = () => {
  if (document.location.href.includes('localhost')) return 'backend-dev';
  if (document.location.href.includes('staging')) return 'staging';
  return 'production';
};

export const getEnvTagColor = (env: string) => {
  switch (env) {
    case 'backend-dev':
      return 'cyan';
    case 'staging':
      return 'orange';
    case 'production':
      return 'red';
    default:
      return 'cyan';
  }
};
