$(".order_page").hide()
const find = selector => document.querySelector(selector);
find(".loginForm").addEventListener("submit",e=>{
	e.preventDefault()
	const {email,password} = e.target
	axios.post("http://bestwishes-sql.herokuapp.com/checkoutLogin",{email:email.value,password:password.value})
	.then((data)=>{
		// console.log(data)
		if(data.data.message){
			return alert(data.data.message)
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
	// $(".login_page").hide()
	const userid = sessionStorage.getItem("userid")
	const userName = sessionStorage.getItem("userName")
	if(typeof userid==undefined || userid==null){
		$(".login_page").show()
		$(".order_page").hide()
	}else{
		$(".login_page").hide()
		$(".order_page").show()
		axios.post("http://bestwishes-sql.herokuapp.com/order2",{userid:userid})
		.then(data=>{
			// console.log(data)
			const order = sessionStorage.getItem('order')
			if(typeof order ==undefined && order==null){
				console.log("nothing found")
			}else{
				if(data.data.length !==0){
					console.log(data.data)
					data.data.forEach(element => {
						console.log(element.id)
						$(".order_box").append(
						'<div class="row order" style="margin-bottom: 8px;padding: 15px;background-color: #ffffff;">'+
						'<div class="col">'+
							'<h1 class="title">'+element.venuename+'</h1>'+
							'<p style="font-size: 25px;"><strong>Price: </strong>'+element.charges+'</p>'+
							'<form class="order__form" onsubmit ="someFunc()" >'+
								'<input class="d-none" type="text" name="name" value="'+userName+'">'+
								'<input class="d-none" type="text" name="order_id" value="'+element.order_id+'">'+
								'<input class="d-none" type="text" name="someid" value="'+element.id+'">'+
								'<input class="d-none" type="text" name="amount" value="'+element.charges+'">'+
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

function someFunc(){
	this.addEventListener("submit",e=>{
		e.preventDefault()
		submitOrder(e)
	})
}
function someOtherFunc(){
	completeOrder()
}


const orderDetails = find(".order__details");
const orderName = find("section .order__name");
const orderAmount = find("section .order__amount");
const orderRazorpayId = find("section .order__id");
const payButton = find("section .order__pay");
function submitOrder(e){
  const { name, amount, currency, someid, order_id  } = e.target;
  const order = {
    user:name.value,
    amountInPaise: parseInt(amount.value) * 100,
    currency: currency.value
  };
  axios
    .post("http://bestwishes-sql.herokuapp.com/checkout", order)
    .then(({ data: { name, orderId, amount} }) => {
		sessionStorage.setItem(
			"order",
			JSON.stringify({ name, orderId, amount})
		);
		sessionStorage.setItem("someid",someid.value)
		sessionStorage.setItem("order_id",order_id.value)
		orderName.textContent = name;
		orderAmount.textContent = amount;
		orderRazorpayId.textContent = orderId;
    });
  	$("#checkout").modal() 
}

function completeOrder(){
  const name =  orderName.textContent
  const amount = orderAmount.textContent
  const orderId = orderRazorpayId.textContent
  const amountInPaise = parseInt(amount.replace(" INR", "")) * 100;
  const order_id = sessionStorage.getItem("order_id")

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
        .post("http://bestwishes-sql.herokuapp.com/checkoutVerify", {
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
          amount: amountInPaise,
          currency: "INR"
        }).then(() => {
			axios.post("http://bestwishes-sql.herokuapp.com/orderUpdate",{id:order_id})
			alert("payment complete")
			$("#checkout").modal("hide")
			setTimeout(function(){location.reload() }, 3000)
		})
        .catch(err => alert(err.response.data.message));
    }
  };
  const razorpay = new window.Razorpay(checkoutObject);
  razorpay.open();
}
