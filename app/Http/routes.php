<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('{any}', 'HomeController@index')->where('any', '(?!api).*');

Route::group(['prefix' => 'api'], function() {
	Route::get('braintree-token', function() {
		return Response::make(\Braintree_ClientToken::generate());
	});

	Route::post('redeem-nonce', function() {
		$nonce = \Input::json('nonce');

		$result = Braintree_Transaction::sale(array(
			'amount' => '45679.00',
			'paymentMethodNonce' => $nonce
		));

		if ($result instanceof Braintree_Result_Successful) {
			return \Response::make('', 204);
		}

		return \Response::json([
			'errors' => (array) $result
		], 400);
	});
});