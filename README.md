# jsInjector
##### v0.1 alpha
![Platforms](https://img.shields.io/badge/platform-Safari-lightgrey.svg) ![License](https://img.shields.io/badge/license-MIT-blue.svg)

jsInjector is a Safari extension that allows users to inject arbitrary JS into specific web pages.\
The rules can be set up through a control panel and are based on URLs.

<p align="center">
  <img alt="Example" src="https://i.imgur.com/vGLLRLC.png" width="auto" height="600">
  <br/>
  (bad) example usage
</p>

---
## Installation
Download the latest version from [here](https://github.com/carlo-/jsinjector/releases) and open it with Safari to install.

---
## Setup for development
The control panel is built with ReactJS and npm is required for the development.

In order to **install** all of the necessary dependencies run:
```bash
cd ./jsinjector-rules
npm install
```

To **debug** run:
```bash
npm run start
```

To **build** for production run:
```bash
npm run build
```
which will generate the necessary files for the control panel into the `./build` folder.

---
## License
This project is released under the MIT license; see `LICENSE` for more information. Some dependencies are bundled within this repository, but are under terms of separate licenses.
