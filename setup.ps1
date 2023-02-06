<#
    .SYNOPSIS
    Creates a sign key file from secret
    .DESCRIPTION
    Creates a sign key file from secret
    .PARAMETER file
    Name of the key file to generate
    .PARAMETER key
    base64 encoded key file
    .NOTES
    Written by Ralf Beckers
#>

param(
    [parameter(Mandatory = $true)]
    [string]$version
	)
	
$instFolder = Join-Path -Path $PSScriptRoot -ChildPath "SHFBInstaller_$version"	
$vsixinstaller22 = "C:\Program Files\Microsoft Visual Studio\2022\Enterprise\Common7\IDE\VSIXInstaller.exe"
$vsixinstaller19 = "C:\Program Files (x86)\Microsoft Visual Studio\2019\Enterprise\Common7\IDE\VSIXInstaller.exe"
					
Write-Host "Install SHFB Version $version"

if (![IO.Directory]::Exists($instFolder))
{
	echo "Error: Unknown version"
	exit -1
}
	
Write-Host "Installing SandcastleHelpFileBuilder.msi..."
$msi = Join-Path -Path $instFolder -ChildPath "SandcastleHelpFileBuilder.msi"	
cmd /c start /wait msiexec /i $msi /quiet

if ([IO.File]::Exists($vsixinstaller19))
{
	Write-Host "Installing VSIX for VS 2019..."
	$vsix = Join-Path -Path $instFolder -ChildPath "SHFBVisualStudioPackage_VS2017And2019.vsix"	
	. $vsixinstaller19 /q /a $vsix
}

if ([IO.File]::Exists($vsixinstaller22))
{
	Write-Host "Installing VSIX for VS 2022..."
	$vsix = Join-Path -Path $instFolder -ChildPath "SHFBVisualStudioPackage_VS2022AndLater.vsix"	
	. $vsixinstaller22 /q /a $vsix

}

Write-Host "Sandcastle installed" -ForegroundColor Green	
