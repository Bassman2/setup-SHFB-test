# setup-SHFB

This is a Github action for setup a version of EWSoftware/SHFB to your actions.

Example:


    name: "Test"

    on: [push, pull_request]

    jobs:
      build:
        runs-on: windows-2022
    
        steps:
        - name: Install checkout
          uses: actions/checkout@v3
      
        - name: Add msbuild to PATH
          uses: microsoft/setup-msbuild@v1.1
      
        - name: Install SHFB
          uses: Bassman2/setup-SHFB@v2
          with:
            version: 2022.12.30.0
        
        - name: Create Test Documentation
          run: msbuild setup-SHFB-Test.sln /p:configuration="Release" /m /verbosity:minimal

A test repository is available at https://github.com/Bassman2/setup-SHFB-Test.
