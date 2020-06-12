$(".order_page").hide()
const find = selector => document.querySelector(selector);
find(".loginForm").addEventListener("submit",e=>{
	e.preventDefault()
	const {email,pass} = e.target
	axios.post("https://mongo-bestwishes.herokuapp.com/checkoutLogin",{email:email.value,pass:pass.value})
	.then((data)=>{
		console.log(data.data)
		if(data.data.message){
			alert(data.data.message)
		}else{
			let userid = sessionStorage.getItem("userid")
			if(typeof userid !==undefined && userid!==null){
				return location.reload(true)
			}else{
				sessionStorage.setItem("userid",data.data.id)
				sessionStorage.setItem("userName",data.data.name)
				location.reload(true)
			}
		}
	})
})

function logout(){
	sessionStorage.removeItem('userid')
	location.reload(true)
}
function loggedIn(){
	const userid = sessionStorage.getItem("userid")
	const userName = sessionStorage.getItem("userName")
	if(typeof userid==undefined || userid==null){
		$(".login_page").show()
		$(".order_page").hide()
	}else{
		$(".login_page").hide()
		$(".order_page").show()
		axios.post("https://mongo-bestwishes.herokuapp.com/order2",{userid:userid})
		.then(data=>{
			const order = sessionStorage.getItem('order')
			if(typeof order ==undefined && order==null){
				console.log("nothing found")
			}else{
				if(data.data.length !==0){
					console.log(data.data)
					data.data.forEach(element => {
						$(".order_box").append(
						'<div class="row order" style="margin-bottom: 8px;padding: 15px;background-color: #ffffff;">'+
						'<div class="col">'+
							'<h1 class="title">'+element.productId.venuename+'</h1>'+
							'<p style="font-size: 25px;" class="body"><strong>Location: </strong>'+element.productId.location+'</p>'+
							'<p style="font-size: 25px;"><strong>Price: </strong>'+parseInt((element.productId.charges).slice(1))+'</p>'+
							'<p style="font-size: 25px;"><strong>Status: </strong>'+element.status+'</p>'+
							'<form class="order__form" onsubmit="submitForm()">'+
								'<input class="d-none" type="text" name="name" value="'+userName+'">'+
								'<input class="d-none" type="text" name="someid" value="'+element._id+'">'+
								'<input class="d-none" type="text" name="amount" value="'+parseInt((element.productId.charges).slice(1))+'">'+
								'<input class="d-none" type="text" name="currency" value="INR">'+
								'<button class="btn btn-primary">Checkout</button>'+
							'</form>'+
						'</div>'+
					'</div>')
					});
				}else{
					$(".order_box").append(
						'<h1 class="display-2 mt-5 text-center">Nothing Here</h1>'
					)
				}
			}
		})
	}
}

loggedIn()
function submitForm(){
	this.addEventListener("submit", e=>{
		e.preventDefault()
		submitOrder(e)
	})
}
function orderPay(){
	completeOrder()
}



const orderDetails = find(".order__details");
const orderName = find("section .order__name");
const orderAmount = find("section .order__amount");
const orderRazorpayId = find("section .order__id");
const payButton = find("section .order__pay");
function submitOrder(e){
  const { name, amount, currency, someid  } = e.target;
  const order = {
    user:name.value,
    amountInPaise: parseInt(amount.value) * 100,
    currency: currency.value
  };
  axios
    .post("https://mongo-bestwishes.herokuapp.com/checkout", order)
    .then(({ data: { name, orderId, amount} }) => {
		sessionStorage.setItem(
			"order",
			JSON.stringify({ name, orderId, amount })
		);
		sessionStorage.setItem("someid",someid.value)
		orderName.textContent = name;
		orderAmount.textContent = amount;
		orderRazorpayId.textContent = orderId;
    });
  	$("#checkout").modal() 
}

function completeOrder(){
//   const { name, orderId, amount } = JSON.parse(sessionStorage.getItem("order"));
  const name =  orderName.textContent
  const amount = orderAmount.textContent
  const orderId = orderRazorpayId.textContent
  const amountInPaise = parseInt(amount.replace(" INR", "")) * 100;
  const someid = sessionStorage.getItem("someid")

  const checkoutObject = {
    key: "rzp_test_G9ItKc7jp6dwLR",
    amount: amountInPaise,
    currency: "INR",
    name,
    order_id: orderId,
    handler: ({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    }) => {
      axios
        .post("https://mongo-bestwishes.herokuapp.com/checkoutVerify", {
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
          amount: amountInPaise,
          currency: "INR"
        }).then(() => {
			axios.post("https://mongo-bestwishes.herokuapp.com/orderUpdate",{id:someid})
			alert("payment complete")
			$("#checkout").modal("hide")
			location.reload()
		})
        .catch(err => alert(err.response.data.message));
    }
  };
  const razorpay = new window.Razorpay(checkoutObject);
  razorpay.open();
}
