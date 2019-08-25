<form method="POST" action="https://api.razorpay.com/v1/checkout/embedded">
    <input type="hidden" name="key_id" value="{{env('RAZOR_PAY_API_KEY')}}">
<input type="hidden" name="order_id" value="{{ $_GET['order_id'] }}">
    <input type="hidden" name="name" value="Loan Incept">
<input type="hidden" name="description" value="{{$_GET['description']}}">
    <input type="hidden" name="prefill[name]" value="{{$_GET['username']}}">
    <input type="hidden" name="prefill[contact]" value="">
    <input type="hidden" name="prefill[email]" value="{{$_GET['email']}}">
    <input type="hidden" name="notes[shipping address]" value="">
    <input type="hidden" name="callback_url" value="{{ url('/payment-callback')}}">
<input type="hidden" name="cancel_url" value="{{  url('/payment-cancel') }}">
    <button>Submit</button>
  </form>