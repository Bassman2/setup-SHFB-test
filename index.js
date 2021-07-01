const core = require('@actions/core'),
      exec = require('@actions/exec'),
      tool = require('@actions/tool-cache'),
      path = require('path');

async function run() {
    try {

        const version = core.getInput('version');
        const vsixInst = '"C:\\Program Files (x86)\\Microsoft Visual Studio\\2019\\Enterprise\\Common7\\IDE\\VSIXInstaller.exe"';
        const toolUrl = 'https://github.com/EWSoftware/SHFB/releases/download/' + version + '/SHFBInstaller_' + version + '.zip';
        const shfbRoot = 'C:\\Program Files (x86)\\EWSoftware\\Sandcastle Help File Builder\\';
        const home = process.env.GITHUB_WORKSPACE;
        const instFolder = path.join(home, 'InstallResources');

        // output infos
        console.log('Install SHFB Version: ', version);
        console.log('Download: ', toolUrl);

        // set SHFBROOT env variable
        // needed by msbuild, nuget and VS        
        core.exportVariable('SHFBROOT', shfbRoot);

        // download SHFBInstaller
        const tempFile = await tool.downloadTool(toolUrl);
         
        // unzip download
        // await tool.extract7z does not work
        await exec.exec('7z', ['x', '-y', tempFile], { cwd: home});

        // install SandcastleHelpFileBuilder.msi
        await exec.exec('msiexec', ['/i', 'SandcastleHelpFileBuilder.msi', '/quiet'], { cwd: instFolder});
        
        // install SHFBVisualStudioPackage_VS2017AndLater.vsix
        await exec.exec(vsixInst, ['/q', '/a', 'SHFBVisualStudioPackage_VS2017AndLater.vsix'], { cwd: instFolder});

    }
    catch (error) {
        core.setFailed(error.message);
    }
}

run();