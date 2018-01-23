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
## Contributing
Contributions of any kind are more than welcome! Feel free to fork and improve jsInjector in any way you want, make a pull request, or open an issue.

---
## Setup for development
The control panel is built with ReactJS, and npm is required for the development.

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
which will generate the necessary files for the control panel into the `./build` folder and into the `jsInjector.safariextension` container.

---
## License
This project is released under the MIT license; see `LICENSE` for more information. Some dependencies are bundled within this repository, but are under terms of separate licenses.

---
## Acknowledgements
Portions of this project utilize the following copyrighted material, the use of which is hereby acknowledged:
* [Ace](https://github.com/ajaxorg/ace) by [Cloud9](https://c9.io) and [Mozilla](https://www.mozilla.org)
* Icon by [Freepik](http://www.freepik.com/) from [www.flaticon.com](https://www.flaticon.com)


