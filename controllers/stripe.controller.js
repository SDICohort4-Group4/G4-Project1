const stripe=require('stripe')("sk_test_51LIAztC2VmHakyazhdyRJMzKRRELUIAc10o8dF5Zi7eh2JCJ6HeZP8wYOnjJz20emcReOUxT2Lz2MpIAlilT7vGL00UnuyEnVi")

class StripePaymentController{
    
    async doPayment(req,res){
        const {amountPayable} = req.body

        if (!amountPayable || amountPayable<0){
            res.status(400);
            return res.json({
                message:"Invalid Amount Payable"
            })
        }   
      
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: amountPayable,
                currency: 'sgd',
                });
                const clientSecret = paymentIntent.client_secret
                console.log("payment intent",paymentIntent)
                res.status(200);
                return res.json({
                    message:"Stripe Success",
                        data: {clientSecret},
                    })
        } catch (error) {
                res.status(error.statusCode);
                return res.json({
                    message: error.raw.message})
        }
      
  
    }
}

module.exports=StripePaymentController;