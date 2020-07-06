$(function () {
	
	showTable();

	$('.btn-addtocart').click(function() {
		
		let id = $(this).data('id');
		let name = $(this).data('name');
		let price = $(this).data('price');


		// ** create object
		let menu = {
			// key : value (value is from above )
			id: id,
			name: name,
			price: price, 
			qty: 1
		}


		// ** check whether localstorage is already existed
		let menuString = localStorage.getItem("menulist");
		let menuArray;
		if (menuString == null) {

			// create new array
			menuArray = Array();
		
		} else {
		
			// convert to array
			menuArray = JSON.parse(menuString);
		
		}


		// ** for adding quantity of same item, and its alternative 
		let status = false;
		$.each(menuArray, function(i, v) {
			if (id == v.id) {
				status = true;
				v.qty++;
			}
		});

		// for different item, push menu object to menuArray
		if (!status) {
			menuArray.push(menu);
		}


		// ** set item to localstorage
		let menuData = JSON.stringify(menuArray);
		localStorage.setItem('menulist', menuData);


		// ** call showTable
		showTable();

	});


	// if localstorage exists, table will show, its div is given id
	function showTable() {
		let menuString = localStorage.getItem('menulist');
		if (menuString) {

			$('#div-voucher').show();
			
			// ** show in html 
			let menuArray = JSON.parse(menuString);
			if (menuArray != 0) {	

				let total = 0;
				let tbodyData = '', tfootData = '';
				
				// looping 
				$.each(menuArray, function(i, v) {
					let name = v.name;
					let price = v.price;
					let qty = v.qty;
					let subtotal = price * qty;

					total += subtotal;

					// in plus and minus button data-id is set with array index
					tbodyData += `<tr>
													<td>${name}<br><em class="text-muted font-weight-light">${price} Ks</em></td>
													<td>
														<button type="button" class="btn-minus btn btn-sm btn-secondary" data-id="${i}">&#45;</button>
														<span class="mx-2">${qty}</span>
														<button type="button" class="btn-plus btn btn-sm btn-secondary" data-id="${i}">&#43;</button>
													</td>
													<td>${subtotal} Ks</td>
													<td align="center">
														<button type="button" class="btn btn-danger btn-sm btn-remove" data-id="${i}">&times;</button>
													</td>
												<tr>`;

				});	// looping end
				
				tfootData += `<tr>
												<td colspan="4">
													<button type="button" class="btn btn-light btn-block" id="btn-checkout">Check Out</button>
												</td>
											</tr>`;

				$('tbody').html(tbodyData);
				$('tfoot').html(tfootData);

			} else { 

				// although array is existed and value is empty
				$('#div-voucher').hide();
			
			}

		} else {
			$('#div-voucher').hide();
		}
	}


	// ** add quantity 
	$('tbody').on('click', '.btn-plus', function () {
		
		let id = $(this).data('id');	// id from plus button set in showTable tbodyData

		let menuString = localStorage.getItem('menulist');
		let menuArray = JSON.parse(menuString);
		$.each(menuArray, function(i, v) {
			if (i==id) {
				v.qty++;
			}
		});

		let menuData = JSON.stringify(menuArray);
		localStorage.setItem('menulist', menuData);

		showTable();

	}) // end of add quantity


	// ** minus quantity 
	$('tbody').on('click', '.btn-minus', function () {
		
		let id = $(this).data('id');	// id from minus button set in showTable tbodyData

		let menuString = localStorage.getItem('menulist');
		let menuArray = JSON.parse(menuString);
		$.each(menuArray, function(i, v) {
			if (i==id && v.qty > 1) {
				v.qty--;
			}
		});

		let menuData = JSON.stringify(menuArray);
		localStorage.setItem('menulist', menuData);

		showTable();

	}) // end of minus quantity


	// remove item
	$('tbody').on('click', '.btn-remove', function() {
		
		let id = $(this).data('id');

		let menuString = localStorage.getItem('menulist');
		let menuArray = JSON.parse(menuString);

		$.each(menuArray, function(i, v) {
			if (i == id) {
				menuArray.splice(i, 1);
			}
		});

		let menuData = JSON.stringify(menuArray);
		localStorage.setItem('menulist', menuData);

		showTable();
		
	});	// end of remove item


	// delete all items
	$('tfoot').on('click', '#btn-checkout', function() {

		localStorage.clear();
		showTable();
			
	}); // end of delete all items


}) // end of ready function