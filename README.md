CoinWidget.com (msc-mod)
==============

*The Bitcoin, Litecoin and Mastercoin Donation Button*

Visit http://coinwidget.com/ for full documentation, demo, and a link code wizard.

CoinWidget was initially created by http://scotty.cc/.

Improvements were made by [q--](https://github.com/q--/coinwidget.com).

This version ("msc-mod") adds the currency Mastercoin and uses one of the following data providers:

	https://masterchest.info/
	http://www.mymastercoins.com/
	https://masterchain.info/
	http://mastercoin-explorer.com/

Released under the Open Source **MIT License** (see **LICENSE** file for details).


Installation
==============
A. Download all files from GitHub: https://github.com/dexX7/coinwidget.com

B. Open **coin.js** and find:

	source: 'http://mastercoin-faucet.com/tips/'

C. Change the URL portion of this line to your own server/path.

D. (optional) To use an external CSS file, edit **coin.js** and set the following statement true:

	stylesheet_loaded: false
  
E. (optional) If you already load JQuery somewhere else, edit **coin.js** and set the following statement true:

	loading_jquery: false
  
F. (optional) Open **lookup.php** and change data provider. This can be easily done by uncommenting a few lines of code.

G. (optional) Create your own implementation of lookup.php, stop using web APIs to fetch data or add more currencies.

G. Upload files to your server.

H. Follow the example code to include the donation button.

Watch out for **call to action** comments in the source code.


Example code and usage
==============

See the files: **example-1.html** and **example-2.html**

A list of available options and acceptable values can be found on http://coinwidget.com/.

Note: the option **send_button** is new and allows to hide the "click here to open wallet" button.


==============
*If you run into a bug, or if you need help or have an idea please e-mail:
coinwidget.com@gmail.com (original author)
dexx@bitwatch.co (msc-mod)*