// ANGULAR JS
angular.module('quoteApp', ['ui.bootstrap']).controller('quoteController', function($scope, $http) {
	$scope.quote = {
	  "salesman": {
	    "company": "Craft Santos",
	    "name": "Matheus Marques",
	    "mail": "matheus.marques@2wa.com.br",
	    "phone": "+55 13 97409-9869"
	  },
	  "quote": {
	    "number": "AMS-AIR-JFK0JS-150617-002-1",
	    "reference": "Craft Quote",
	    "expiration": "17/07/2015",
	    "to": "Coca-Cola",
	    "origin": "De Alpen, 1060 Amsterdam, Netherlands",
	    "load": {
	      "desc": "1 Box, 35.43 inch x 35.43 inch x 35.43 inch",
	      "totalweight": "198.42 lb",
	      "totalvolume": "25.75 cft"
	    },
	    "destination": "357 North central Avenue, Vailey Stream, NY 11580, USA",
	    "options": {
	      "hazardous": 0,
	      "customs": 1,
	      "insurance": 1,
	      "shipper": 0,
	      "incoterm": "EXW"
	    },
	    "modes": [
	      "LTL",
	      "AIR",
	      "LTL"
	    ],
	    "transittime": "5 days",
	    "service": "PREMIUM",
	    "shippingfactor": "3,000 cm3/kg",
	    "value": "243 kg"
	  },
	  "shipping": {
	    "steps": [
	      {
	        "infoFirst": "From: De Alpen, 1060 Amsterdam, Netherlands",
	        "infoLast": "To: AMS Amsterdan (Schipol Airport)",
	        "lines": [
	          {
	            "fcode": "PIKUP",
	            "fname": "Local Pick Up",
	            "units": "243",
	            "unitprice": "USD 0.287",
	            "amount": "USD 68.91"
	          }
	        ],
	        "subtotal": "USD 68.91"
	      },
	      {
	        "infoFirst": "Port Charges AMS Amsterdan (Schipol Airport)",
	        "infoLast": "",
	        "lines": [
	          {
	            "fcode": "PSS",
	            "fname": "Peak Season Surcharge",
	            "units": "1",
	            "unitprice": "USD 10.00",
	            "amount": "USD 10.00"
	          }
	        ],
	        "subtotal": "USD 10.00"
	      },
	      {
	        "infoFirst": "From: AMS Amsterdan (Schipol Airport)",
	        "infoLast": "To: JFK New York Itl.",
	        "lines": [
	          {
	            "fcode": "AIR",
	            "fname": "AIR Freight Cost",
	            "units": "121.5",
	            "unitprice": "USD 1.50",
	            "amount": "USD 182.27"
	          },
	          {
	            "fcode": "AMS",
	            "fname": "Automated Manifest System",
	            "units": "1",
	            "unitprice": "USD 30.00",
	            "amount": "USD 30.00"
	          },
	          {
	            "fcode": "FSC",
	            "fname": "Fuel Surcharge",
	            "units": "90",
	            "unitprice": "USD 1.25",
	            "amount": "USD 112.50"
	          },
	          {
	            "fcode": "LOAD",
	            "fname": "Loading Fee",
	            "units": "1",
	            "unitprice": "USD 30.00",
	            "amount": "USD 30.00"
	          },
	          {
	            "fcode": "CUST",
	            "fname": "Customs Operation Fee",
	            "units": "90",
	            "unitprice": "USD 0.25",
	            "amount": "USD 22.50"
	          }
	        ],
	        "subtotal": "USD 377.27"
	      },
	      {
	        "infoFirst": "From: JFK New York Itl.",
	        "infoLast": "To: 357 North central Avenue, Vailey Stream, NY 11580, USA",
	        "lines": [
	          {
	            "fcode": "HAUL",
	            "fname": "Local Delivery",
	            "units": "243",
	            "unitprice": "USD 0.25",
	            "amount": "USD 60.75"
	          }
	        ],
	        "subtotal": "USD 60.75"
	      }
	    ],
	    "insurancePremium": "USD 75.00",
	    "totalPrice": "USD 592.83"
	  }
	};
});