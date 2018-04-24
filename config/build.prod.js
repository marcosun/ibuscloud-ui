const execSync = require('child_process').execSync;
const rimraf = require('rimraf');

const exec = (command, extraEnv) => {
  execSync(command, {
    stdio: 'inherit',
    env: Object.assign({}, process.env, extraEnv),
  });
};

console.log('Building CommonJS modules ...');

rimraf('cjs', function() {
  exec('babel lib -d build --ignore test.js', {
    BABEL_ENV: 'cjs',
    NODE_ENV: 'production',
  });
});
