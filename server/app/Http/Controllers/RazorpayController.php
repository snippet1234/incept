<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Payment;
use GuzzleHttp\Client;
use GuzzleHttp\RequestOptions;
use Illuminate\Support\Facades\Auth;
use Redirect, Response;


class RazorpayController extends Controller
{
    public function index()
    {
        return view('payments.razorpay');
    }

    public function createOrder(Request $request)
    {
        $request->validate([
            'plan_id' => 'required',
            'amount' => 'required',
            'form_count' => 'required',
            'renewal_term' => 'required',
            'currency' => 'required',
            'receipt' => 'required'
        ]);

        $razorPayOrdersEndPoint = 'https://api.razorpay.com/v1/orders';
        // $authString = env('RAZOR_PAY_API_KEY') .':'. env('RAZOR_PAY_API_SECRET');

        $client = new Client();
        $result = $client->post($razorPayOrdersEndPoint, [
            'auth' => [
                env('RAZOR_PAY_API_KEY'),
                env('RAZOR_PAY_API_SECRET')
            ],
            RequestOptions::JSON => [
                'amount' => $request->amount,
                'currency' => $request->currency,
                'receipt' => $request->receipt,
                'payment_capture' => '0',
            ],
            'headers' => [
                'Content-Type' => 'application/json'
            ]
        ]);
        $json =  json_decode($result->getBody());
        /* Mock response */
        // {"id":"order_DABnwHASAAAtNn","entity":"order","amount":20000,"amount_paid":0,"amount_due":20000,"currency":"INR","receipt":"receipt #1","offer_id":null,"status":"created","attempts":0,"notes":[],"created_at":1566741500}

        $payment = Auth::user()->payments()->save(new Payment([
            'razorpay_order_id' => $json->id,
            'amount' => $json->amount,
            'currency' => $json->currency,
            'renewal_term' => $request->renewal_term,
            'plan_id' => $request->plan_id,
            'form_count' => $request->form_count,
            'type' => 'subscription',
            'provider' => 'razor_pay',
        ]));

        return $payment;
    }

    public function razorPayCallback(Request $request)
    {

        // {"error":{"code":"BAD_REQUEST_ERROR","description":"Payment already done for this order."}}
        return $request->all();
        $payment = Payment::whereRazorpayOrderId($request->razorpay_order_id)->first();
        $payment->razorpay_payment_id = $request->razorpay_payment_id;
        $payment->razorpay_signature = $request->razorpay_signature;
        return $payment->save();
    }

    public function razorPayCancelled()
    {
        return view('payments.cancelled');
    }

    public function razorPaySuccess(Request $request)
    {
        $data = [
            'user_id' => '1',
            'payment_id' => $request->payment_id,
            'amount' => $request->amount,
        ];
        $getId = Payment::insertGetId($data);
        $arr = array('msg' => 'Payment successfully credited', 'status' => true);
        return Response()->json($arr);
    }

    public function RazorThankYou()
    {
        return view('payments.thankyou');
    }
}
