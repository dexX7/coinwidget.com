<?php

/** -

Donations welcome:
  BTC: 122MeuyZpYz4GSHNrF98e6dnQCXZfHJeGS
  LTC: LY1L6M6yG26b4sRkLv4BbkmHhPn8GR5fFm
  MSC: 1JCwo8qnjDquGnx44N81NNehqytksL92zM
    ~ Thank you!

MIT License (MIT)

Copyright (c) 2013 http://coinwidget.com/ 
Copyright (c) 2013 http://scotty.cc/
Copyright (c) 2014 http://bitwatch.co/

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

  /**
  * Optional call to action:
  * Set cache/expiration headers.
  */
  error_reporting(0);
  header("Content-type: text/javascript");
  /**
  * You should server side cache this response, especially if your site is active.
  */
  $data = isset($_GET['data'])?$_GET['data']:'';
  if (!empty($data)) {
    $data = explode("|", $data);
    $responses = array();
    if (!empty($data)) {
      foreach ($data as $key) {
        list($instance,$currency,$address) = explode('_',$key);
        switch ($currency) {
          case 'bitcoin': 
            $response = get_bitcoin($address);
            break;
          case 'litecoin': 
            $response = get_litecoin($address);
            break;
          case 'mastercoin': 
            $response = get_mastercoin($address);
            break;
          /**
           * Optional call to action:
           * Add other currencies.
           */
        }
        $responses[$instance] = $response;
      }
    }
    echo 'var COINWIDGETCOM_DATA = '.json_encode($responses).';';
  }

  function get_bitcoin($address) {
    $return = array();
    $data = get_request('http://blockchain.info/address/'.$address.'?format=json&limit=0');
    if (!empty($data)) {
      $data = json_decode($data);
      $return += array(
        'count' => (int) $data->n_tx,
        'amount' => (float) $data->total_received/100000000
      );
      return $return;
    }
  }

  function get_litecoin($address) {
    $return = array();
    $data = get_request('http://explorer.litecoin.net/address/'.$address);
    if (!empty($data) 
      && strstr($data, 'Transactions in: ') 
      && strstr($data, 'Received: ')) {
        $return += array(
        'count' => (int) parse($data,'Transactions in: ','<br />'),
        'amount' => (float) parse($data,'Received: ','<br />')
      );
        return $return;
    }
  }
  
  function get_mastercoin($address, $currencyid=1) {
    $return = array();
    $return += array(
        'count' => get_msc_tx_count($address),
        'amount' => get_msc_balance($address)
      );
    return $return;
  }

  function get_request($url,$timeout=4) {
    if (function_exists('curl_version')) {
      $curl = curl_init();
      curl_setopt($curl, CURLOPT_URL, $url);
      curl_setopt($curl, CURLOPT_RETURNTRANSFER,true);
      curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, $timeout);
      curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
      curl_setopt($curl, CURLOPT_USERAGENT,'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13');
      $return = curl_exec($curl);
      curl_close($curl);
      return $return;
    } else {
      return @file_get_contents($url);
    }
  }

  function parse($string,$start,$stop) {
    if (!strstr($string, $start)) return;
    if (!strstr($string, $stop)) return;
    $string = substr($string, strpos($string,$start)+strlen($start));
    $string = substr($string, 0, strpos($string,$stop));
    return $string;
  }
  
  function get_msc_balance($address, $currencyid=1)
  {
    /**
     * Optional call to action:
     * Replace data provider
     */
    
    $data_provider_url =
      'https://masterchest.info/mastercoin_verify/addresses.aspx';
        
    // $data_provider_url = 
    //   'http://www.mymastercoins.com/jaddress.aspx?address='.$address.'&currency_id='.$currencyid;

    // $data_provider_url = 
    //   'https://masterchain.info/mastercoin_verify/addresses/'.($currencyid-1);
    
    // $data_provider_url = 
    //   'http://mastercoin-explorer.com/mastercoin_verify/addresses?currency_id='.$currencyid;
    
    $data = get_request($data_provider_url);
    $json = json_decode($data);
    foreach($json as $entry)
    {
      if($entry->address == $address)
      {
        return (float) $entry->balance;
      }
    }
    return 0.0;
  }
  
  function get_msc_tx_count($address, $currencyid=1)
  {
    /**
     * Optional call to action:
     * Replace data provider
     */
     
    $data_provider_url = 
      'https://masterchest.info/mastercoin_verify/transactions.aspx?address='.$address.'&currencyid='.$currencyid;
     
    // $data_provider_url = 
    //   'http://www.mymastercoins.com/jtransactions.aspx?Address='.$address.'&currency_id='.$currencyid;
      
    // $data_provider_url = 
    //   'https://masterchain.info/mastercoin_verify/transactions/'.$address;
      
    // $data_provider_url = 
    //   'http://mastercoin-explorer.com/mastercoin_verify/transactions/'.$address.'&currency_id='.$currencyid;
      
    $data = get_request($data_provider_url);
    $json = json_decode($data);
    return count($json->transactions);
  }
  
?>