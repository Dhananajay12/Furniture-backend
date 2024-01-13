import moment from "moment";
import { autoIncrementOrderId } from "../../helper/AutoIncrement";
import { Coupon, Order, ProductVariant, Products, User } from "../../model";
import { getAddressById } from "../address/controller";
import { Schema } from "mongoose";
import { APIConstants, customResponse } from "../../helper/ApiResponse";
import axios from "axios";

interface product {
	sku: string,
	quantity: number,
	productId: number,
}

interface OrderBookingData {
	products: product[]
	paymentMethodId: string,
	coupon: string,
	addressId: string,
	paymentKey: string,
	code:string
}

interface Address {
	uid?: Schema.Types.ObjectId,
	reciverName?: string,
	tag?: string
	line_1?: string,
	line_2?: string,
	postcode?: Number,
	city?: string,
	state?: string,
	country?: string,
	phone?: Number,
}

const RZP_KEY ='345545'
const RZP_SECRET = '345545'

const placeOrderController = async (req: OrderBookingData, uid: string) => {

	try {
		const order_id = await autoIncrementOrderId('temp_check');

		console.log(order_id)

		const Profiles = await User.read.findOne({ uid: uid });

		if (!Profiles) {
			throw new Error('Profile not found!')
		}

		const add1 = await getAddressById(req.addressId)

		if (add1?.statusCode !== 200) {
			throw new Error("Address not found with this addressId")
		}

		const addressData: Address = add1?.data;



		let delivery_Date;
		let custome_delivery;
		let same_day_delivery = false;



		// const estimatedDate = await pincodeDate(addressData?.postcode)
		const estimatedDate = {
			timestamp:''
		};

	
		let dates = estimatedDate.timestamp
		let dayName = moment(dates).date();
		let monthName = moment(dates).format('MMMM');
		let year = moment(dates).year();
		delivery_Date = dayName + " " + monthName + " " + year;

		if (new Date().getDate() == dayName) {
			same_day_delivery = true;
		}


	
		const order_items = req.products

		// const paymentMethod = await Payment.read.findOne({ name: req.paymentMethodId });
		let total_price = 0;
		let totalTax = 0;
		let lineItems = [];

		for (let i = 0; i < order_items.length; i++) {
			let element = order_items[i];

			if (element.quantity > 0) {

				const product_variant_details = await ProductVariant.read.findOne({ sku: element.sku }).exec();

				const product = await Products.read.findOne({ productId: product_variant_details?.productId });

				if (!product) {
					throw new Error('Product not available');
				}

				if (!product_variant_details) {
					throw new Error('item/sku not found');
				}

				const productVariant = product_variant_details?.salePrice
				if (product_variant_details) {
					total_price += element.quantity * Number(productVariant);
					let obj = {
						// id: product_variant_details?._id,
						name: product?.name + '-' + product_variant_details?.name,
						product_id: product_variant_details?.productId,
						variation_id: product_variant_details?.productVariantId,
						quantity: element.quantity,
						tax_class: 0,
						subtotal: element.quantity * Number(productVariant),
						subtotal_tax: 0,
						total: element.quantity * Number(productVariant),
						total_tax: 0,
						sku: product_variant_details?.sku,
						price: product_variant_details?.salePrice,
					}
					lineItems.push(obj);
				}
			}
		}

		let shippingFee = 0;

		const coupon = await Coupon.read.findOne({ code: req?.code });

		if (coupon && total_price < 500) {

			if (custome_delivery) {
				shippingFee = 99.00;
			} else {
				shippingFee = 39.00;
			}

		}

		let billingDetails = {
			first_name: Profiles.first_name,
			last_name: Profiles.last_name,
			email: Profiles?.email,
			company: '',
			address_1: addressData?.line_1,
			address_2: addressData?.line_2,
			city: addressData?.city,
			state: addressData?.state,
			postcode: addressData?.postcode,
			country: addressData?.country,
			phone: addressData?.phone,
		}


		let date = new Date();
		let utcDate = new Date();
		let utc_date = new Date(utcDate.toUTCString());
		// console.log("fsdfsdf ", cartDetails.data.estDeliveryDate);

		let extraCharges = 0;

		let total = Number(total_price + totalTax + shippingFee + extraCharges);


		let amount = 0;

		if (coupon) {
			if (coupon?.discountType == 'percentage') {
				const am = (coupon.discountAmount / 100) * total_price;
				amount = parseFloat(am.toFixed(2))

			} else {
				const am = coupon.discountAmount
				amount = parseFloat(am.toFixed(2))
			}

			if (total_price < Number(coupon.minimumAmount)){
				throw new Error('Coupon is not valid for This Amount');
			}

			total -= amount;

		}

		const couponData = {
			code: coupon?.code,
			discount: amount,
		}


		if (req.paymentKey == "Offline") {

			let obj1 = {
				id: order_id,
				created_via: "Mobile",
				version: "v3",
				status: "processing",
				currency: "INR",
				number: order_id,
				date_created: date.toISOString(),
				date_created_gmt: utc_date.toISOString(),
				date_modified: date.toISOString(),
				date_modified_gmt: utc_date.toISOString(),
				discount_total: amount,
				payment_method: "COD",
				discount_tax: 0,
				shipping_total: shippingFee,
				shipping_tax: 0,
				cart_tax: 0,
				total: Number(total),
				total_tax: totalTax,
				currency_symbol: "INR",
				line_items: lineItems,
				coupon_lines: couponData,

				billing: billingDetails,
				billing_scheduled_date: delivery_Date,
				date_custom_delivery: custome_delivery,
				pincode_city: addressData.city,
				same_day_delivery: same_day_delivery,
				razorpay_order_id: ''
			}
			const order = new Order.write(obj1);

			const result = await order.save();

			return customResponse("Successfully created", APIConstants.StatusCode.Ok, APIConstants.Status.Success, result, "");

		} else {

			let result;

			let obj1 = {
				id: order_id,
				status:"Pending",
				number: order_id,
				date_created: date.toISOString(),
				date_created_gmt: utc_date.toISOString(),
				date_modified: date.toISOString(),
				date_modified_gmt: utc_date.toISOString(),
				discount_total: amount,
				payment_method: "Razorpay",
				discount_tax: 0,
				shipping_total: shippingFee,
				shipping_tax: 0,
				cart_tax: 0,
				total: Number(total),
				total_tax: totalTax,
				prices_include_tax: true,
				cart_hash: null,
				currency_symbol: "INR",
				line_items: lineItems,
				coupon_lines: couponData,
				billing: billingDetails,
				billing_scheduled_date: delivery_Date,
				date_custom_delivery: custome_delivery,
				pincode_city: addressData.city,
				razorpay_order_id:''
			}

			if (obj1.total > 1) {

				// obj1.total
				const int = obj1.total * 100
				let dataObj = {
					amount: Number(int),
					currency: "INR",
					notes: {
						id: obj1.id
					},
					payment_capture: 1
				}

				var config = {
					method: 'post',
					url: 'https://api.razorpay.com/v1/orders/',
					headers: {
						'Content-Type': 'application/json'
					},
					auth: {
						username: RZP_KEY,
						password: RZP_SECRET
					},
					data: dataObj
				};

				const response = await axios(config).catch(err => {
					throw new Error(err.response.data.error);
				});

				obj1.razorpay_order_id = response?.data?.id

				const order = new Order.write(obj1)
				result = await order.save();


			} else {
	
				obj1.status = 'processing'

				const order = new Order.write(obj1)
				result = await order.save();
			}

			return customResponse("Successfully created", APIConstants.StatusCode.Ok, APIConstants.Status.Success, result, "");
		}


	} catch (error: any) {

		return customResponse('Error while creating order!', APIConstants.StatusCode.Ok, APIConstants.Status.Success, null, error.message);
	}

}

const getOrderController = async (req: any) => {
	console.log(req)
}


export { placeOrderController, getOrderController }