const core = require('@actions/core');
//const exec = require('@actions/exec');
const tool = require('@actions/tool-cache');
//const path = require('path');




async function run() {
    try {

        const version = core.getInput('version');
        const toolUrl = 'https://github.com/EWSoftware/SHFB/releases/download/' + version + '/SHFBInstaller_' + version + '.zip';
        const home = process.env.GITHUB_WORKSPACE;

        console.log('Install SHFB Version: ' + version);

        const shfbRoot = 'C:\\Program Files (x86)\\EWSoftware\\Sandcastle Help File Builder\\';
        core.exportVariable('SHFBROOT', shfbRoot);


        const shfbInstaller = await tool.downloadTool(toolUrl);
        console.log('shfbInstaller: ', shfbInstaller);
        const shfbFolder = await tool.extractZip(shfbInstaller, home);
        console.log('shfbFolder: ', shfbFolder);
        const shfbResDir = path.join(shfbFolder, 'InstallResources');
        console.log('shfbResDir: ', shfbResDir);

/*

const options = {};
options.listeners = {
  stdout: (data: Buffer) => {
    console.log(data.toString());
  },
  stderr: (data: Buffer) => {
    console.eooro(data.toString());
  }
};
options.cwd = shfbResDir;


 
await exec.exec('msiexec', ['/i', 'SandcastleHelpFileBuilder.msi', '/quiet'], options );


const vsixInst = 'C:\\Program Files (x86)\\Microsoft Visual Studio\\2019\\Enterprise\\Common7\\IDE\\VSIXInstaller.exe';

await exec.exec(vsixInst, ['/q', '/a', 'SHFBVisualStudioPackage_VS2017AndLater.vsix'], options );
*/
    }
    catch (error) {
        core.setFailed(error.message);
    }
}

run();