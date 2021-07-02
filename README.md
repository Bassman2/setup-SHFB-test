# setup-SHFB

This is a Github action for setup a version of EWSoftware/SHFB to your actions.

Example:


    name: "Test"

    on: [push, pull_request]

    jobs:
      build:
        runs-on: windows-2019
    
        steps:
        - name: Install checkout
          uses: actions/checkout@v2
      
        - name: Add msbuild to PATH
          uses: microsoft/setup-msbuild@v1
      
        - name: Install SHFB
          uses: Bassman2/setup-SHFB@v1
          with:
            version: v2021.4.9.0
        
        - name: Create Test Documentation
          run: msbuild setup-SHFB-Test.sln /p:configuration="Release" /m /verbosity:minimal

A test repository is available at https://github.com/Bassman2/setup-SHFB-Test.
