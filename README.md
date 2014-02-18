CoinWidget.com (msc-mod)
==============

*The Bitcoin, Litecoin and Mastercoin Donation Button*

**Button preview:**

<img src="http://bitwatch.co/tips//preview_button.png">

**Clicking the button shows more details:**

<img src="http://bitwatch.co/tips//preview_box.png">

CoinWidget was initially created by http://scotty.cc/. Improvements were made by [q--](https://github.com/q--/coinwidget.com).

Visit http://coinwidget.com/ for the full documentation, demo, and a code wizard of the original.

With this version ("**msc-mod**") it is possible to build a [Mastercoin](http://mastercoin.org) donation button.

The following data providers can be used to fetch data:

	masterchest.info
	mymastercoins.com
	masterchain.info
	mastercoin-explorer.com



Released under the Open Source **MIT License** (see [**LICENSE**](./LICENSE) file for details).


Installation
==============
A. Download all files from GitHub: https://github.com/dexX7/coinwidget.com

B. Open [**coin.js**](https://github.com/dexX7/coinwidget.com/blob/master/coin.js#L46) and find:

	source: 'http://bitwatch.co/tips/'

C. Change the URL portion of this line to your own server/path.

D. (optional) To use an external CSS file, edit **coin.js** and change [**line 473**](./coin.js#L473) to:

	stylesheet_loaded: true

E. (optional) If you load JQuery somewhere else, edit **coin.js** and change [**line 493**](./coin.js#L493) to:

	loading_jquery: true

F. (optional) Open **lookup.php** and change data provider. This can be easily done by uncommenting a few lines of code.

G. (optional) Create your own implementation of lookup.php, stop using web APIs to fetch data or add more currencies.

G. Upload files to your server.

H. Follow the example code to include the donation button.

Watch out for **call to action** comments in the source code.


Example code and usage
==============

See the files: [**example-1.html**](./example-1.html) and [**example-2.html**](./example-2.html)

```html
  <span id="msctip">Tip Mastercoins</span>
  <!--The rest of the HTML document-->
    
  <script src="coin.js"></script>
  <script>
    CoinWidgetCom.go({
    
      /**
       * Call to action:
       * Replace wallet_address with your Mastercoin address and 
       * adjust configuration optionally.
       */
      wallet_address: "1JCwo8qnjDquGnx44N81NNehqytksL92zM",
      
      currency: "mastercoin",
      qrcode: false,
      send_button: false,
      auto_show: false,
      lbl_address: "Donate MSC to this address:",
      lbl_count: "tips received",
      lbl_amount: "MSC",
      alignment: "bl",
      
    }, "#msctip");
  </script>
```

A list of available options and acceptable values can be found on [coinwidget.com](http://coinwidget.com/).

The option **send_button** is new and allows to hide the "click here to open wallet" button and is not documented on [coinwidget.com](http://coinwidget.com/).


==============
*If you run into a bug, please e-mail coinwidget.com@gmail.com (original author) or dexx@bitwatch.co (msc-mod).*
