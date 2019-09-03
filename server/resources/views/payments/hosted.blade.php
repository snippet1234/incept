<html>
    <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<form name="theForm" method="POST" action="https://api.razorpay.com/v1/checkout/embedded" style="text-align: center">
    <input type="hidden" name="key_id" value="{{env('RAZOR_PAY_API_KEY')}}">
<input type="hidden" name="order_id" value="{{ $_GET['order_id'] }}">
    <input type="hidden" name="name" value="Loan Incept">
<input type="hidden" name="description" value="{{$_GET['description']}}">
    <input type="hidden" name="prefill[name]" value="{{$_GET['username']}}">
    <input type="hidden" name="prefill[contact]" value="8390516768">
    <input type="hidden" name="prefill[email]" value="{{$_GET['email']}}">
    <input type="hidden" name="notes[shipping address]" value="Some shiping address">
    <input type="hidden" name="callback_url" value="{{ url('payment-callback') }}/{{$_GET['email']}}">
<img src="{{asset('/images/icon.png')}}" widht="100px" style="width:100" />
<input type="hidden" name="cancel_url" value="{{  url('/payment-cancel') }}">
<br />
    <button style="padding: 1em 5em;
    background: transparent;
    margin-top: 20%;
    color: brown;
    font-size: 16;

    border: none;">Initiating payment...</button>
  </form>
  <script>
      document.theForm.submit();
      </script>
  </html>