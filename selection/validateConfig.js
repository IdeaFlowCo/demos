var exec = require('child_process').exec;
var nodeCmd = 'node -v';
var npmCmd = 'npm -v';

exec(nodeCmd, function(error, stdout, stderr) {
  // command output is in stdout
  try {
    // (format) v0.12.33 or v4.2.1 or v6.2.2 
    var parsedVersion = /v(\d+)\.(\d+)\.(\d+)/.exec(stdout)
    var mainVersionNumber = +parsedVersion[1]
    var fullVersionNumber = parsedVersion[0].trim()

    // ensure node v6.2.2
    if (fullVersionNumber !== 'v6.2.2') {
      console.error('Node Version does not match [expected v6.2.2] got: ', fullVersionNumber)
      process.exit(1)
    }
    else {
      console.log('Node Version Ok')
      // process.exit(0)
    }
  }
  catch(e) {
    console.error('Error while validating node version', error, error.stack)
    process.exit(1)
  }
});