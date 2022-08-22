const core = require('@actions/core'),
      exec = require('@actions/exec'),
      tool = require('@actions/tool-cache'),
      path = require('path'),
      fs = require('fs');
const child_process = require('child_process');

async function run() {
    const home = process.env.GITHUB_WORKSPACE;
    const instFolder = path.join(home, 'InstallResources');
    try {

        const version = core.getInput('version');
        //const vsixInst = '"C:\\Program Files (x86)\\Microsoft Visual Studio\\2019\\Enterprise\\Common7\\IDE\\VSIXInstaller.exe"';
		const vsixInst = '"C:\\Program Files (x86)\\Microsoft Visual Studio\\Installer\\resources\\app\\ServiceHub\\Services\\Microsoft.VisualStudio.Setup.Service\\VSIXInstaller.exe"';
        const toolUrl = 'https://github.com/EWSoftware/SHFB/releases/download/' + version + '/SHFBInstaller_' + version + '.zip';
        const shfbRoot = 'C:\\Program Files (x86)\\EWSoftware\\Sandcastle Help File Builder\\';

        // output infos
        console.log('Install SHFB Version: ', version);
        console.log('Download: ', toolUrl);
	console.log('Install folder: ', instFolder);

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

        let myOutput = '';
        let myError = '';

        //const options = {};
        //options.listeners = {
        //    stdout: (data) => {
        //        myOutput += data.toString();
        //    },
        //    stderr: (data) => {
        //        myError += data.toString();
        //    }
        //};
        //options.cwd = instFolder;
        //options.windowsHide = true;
        //options.shell = 'cmd';
		//options.timeout = 4 * 60 * 1000;
		//options.stdio = 'inherit';

        //await exec.exec(vsixInst, ['/q', '/a', '/logFile:vsixinst.log', 'SHFBVisualStudioPackage_VS2017And2019.vsix'], { cwd: instFolder});
        await exec.exec(vsixInst, ['/q', '/a', '/logFile:vsixinst.log', 'SHFBVisualStudioPackage_VS2017And2022.vsix'], { cwd: instFolder});

        //await exec.exec(vsixInst, ['/q', '/a', 'SHFBVisualStudioPackage_VS2017AndLater.vsix'], { cwd: instFolder});

		//options.env = { 
		//	NODE_ENV: 'production',
		//	PATH: process.env.PATH
		//};
		
        //child_process.execFileSync(vsixInst, ['/q', '/a', 'SHFBVisualStudioPackage_VS2017AndLater.vsix'], options)
        //child_process.execSync(vsixInst + ' /q /a SHFBVisualStudioPackage_VS2017AndLater.vsix', options)
        //child_process.spawnSync(vsixInst, ['/q', '/a', 'SHFBVisualStudioPackage_VS2017AndLater.vsix'], options)

        //console.log('Output: ', myOutput);
        //console.log('Error: ', myError);

    }
    catch (error) {
        core.setFailed(error.message);
        try {
            const data = await fs.readFileSync(path.join(instFolder, 'vsixinst.log'), 'utf8');
	    console.log('error - logfile follows:');
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    }
}

run();
