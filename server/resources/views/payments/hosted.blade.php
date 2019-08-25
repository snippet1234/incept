<form method="POST" action="https://api.razorpay.com/v1/checkout/embedded">
    <input type="hidden" name="key_id" value="{{env('RAZOR_PAY_API_KEY')}}">
    <input type="hidden" name="order_id" value="aijdkajsdk">
    <input type="hidden" name="name" value="Loan Incept">
    <input type="hidden" name="description" value="Forms with website">
    <input type="hidden" name="prefill[name]" value="Gaurav Kumar">
    <input type="hidden" name="prefill[contact]" value="9123456780">
    <input type="hidden" name="prefill[email]" value="gaurav.kumar@example.com">
    <input type="hidden" name="notes[shipping address]" value="L-16, The Business Centre, 61 Wellfield Road, New Delhi - 110001">
    <input type="hidden" name="callback_url" value="https://example.com/payment-callback">
  <input type="hidden" name="cancel_url" value="https://example.com/payment-cancel">
    <button>Submit</button>
  </form>