const stripe=require('stripe')("sk_test_51LIAztC2VmHakyazhdyRJMzKRRELUIAc10o8dF5Zi7eh2JCJ6HeZP8wYOnjJz20emcReOUxT2Lz2MpIAlilT7vGL00UnuyEnVi")

class StripePaymentController{
    
    async doPayment(req,res){
        const {amountPayable} = req.body

        if (!amountPayable || amountPayable<0 || !Number.isInteger(userID)){
            res.status(400);
            return res.json({
                message:"Invalid amount"
            })
        }   

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amountPayable,
            currency: 'sgd',
          });
          const clientSecret = paymentIntent.client_secret

        res.status(200);
        return res.json({
        message:"Stripe controller layer",
            data: {clientSecret},
        })
    }
}

module.exports=StripePaymentController;