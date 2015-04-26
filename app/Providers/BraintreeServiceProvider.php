<?php namespace App\Providers;

use Illuminate\Contracts\Events\Dispatcher as DispatcherContract;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class BraintreeServiceProvider extends ServiceProvider {

	/**
	 * Register any other events for your application.
	 *
	 * @param  \Illuminate\Contracts\Events\Dispatcher  $events
	 * @return void
	 */
	public function boot(DispatcherContract $events)
	{
		parent::boot($events);

		\Braintree_Configuration::environment('sandbox');
		\Braintree_Configuration::merchantId(env('BRAINTREE_MERCHANTID'));
		\Braintree_Configuration::publicKey(env('BRAINTREE_PUBLICKEY'));
		\Braintree_Configuration::privateKey(env('BRAINTREE_PRIVATEKEY'));
	}
}