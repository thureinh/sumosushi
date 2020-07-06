$(function(){
	$('.btn-plus').click(function(){
		num = $('.number').val();
		$('.number').val(++num);
	})

	$('.btn-minus').click(function(){
		num = $('.number').val();
		if (num >= 1) {
			$('.number').val(--num);
		}
	})
	$('.toggle-mode').click(function(){
		$('div.swap-mode').toggle();
		var trow = ''; var catego = "";
		$('#eye-icon').toggleClass("fa-eye-slash fa-eye");
		$.get('sushi_list.json', function(response){
			if(response){
				// obj
				var sushiObjArray = response;
				var html = '';
				const def = ['Sushi', 'Bento Boxes', 'Ramen', 'Appetizers', 'Rice'];
				$.each(sushiObjArray, function(i, v){
					html += `
					<tr>
				      	<th scope="row">1</th>
				      	<td>${v.name}</td>
				      	<td>${v.price} Ks</td>
				      	<td>${def[parseInt(v.category)]}</td>
				      	<td>${v.description}</td>
				      	<td>
				      		<div class="d-flex justify-content-center">
				      			<div class="col">
				      				<button type="button" class="btn btn-success btn"><i class="fas fa-check"></i></button>
				      			</div>
				      			<div class="col">
				      				<button type="button" class="btn btn-warning btn"><i class="fas fa-pencil-alt"></i></button>
				      			</div>
				      			<div class="col">
				      				<button type="button" class="btn btn-danger btn delete" data-id="${i}"><i class="fas fa-trash"></i></button>
				      			</div>							      										      						
							</div>
				      	</td>
				    </tr>
					`;
				});
				$('tbody').html(html);
			}		
		})
	})
	getStudentList();
	function getStudentList(){
		$.get('sushi_list.json', function(response){
			if(response){
				// obj
				var sushiObjArray = response;
				var sushi = ''; var bebo = ''; var ramen = ''; var appe = ''; var rice = ''; var j = 1;
				$.each(sushiObjArray, function(i, v){
					switch(parseInt(v.category)) {
					  	case 0:
					    	sushi += getCards(i, v);
					    	break;
					  	case 1:
					    	bebo += getCards(i, v);
					    	break;
					    case 2:
					    	ramen += getCards(i, v);
					    	break;
					    case 3:
					    	appe += getCards(i, v);
					    	break;
					    case 4:
					    	rice += getCards(i, v);
					    	break;
					  	default:
					  		//code block
					}
				});
				$('div#pills-sushi div.row').html(sushi);
				$('div#pills-bentoboxes div.row').html(bebo);
				$('div#pills-ramen div.row').html(ramen);
				$('div#pills-appetizers div.row').html(appe);
				$('div#pills-rice div.row').html(rice);
			}		
		})
	}
	function getCards(i, v){
		html = `
			<div class="col-6 col-lg-4 mb-5">
				<div class="card">
					<span class="price badge badge-dark badge-pill">${v.price} Ks</span>
					<img src="${v.photo}" class="card-img-top">
					<div class="card-body">
						<h5 class="card-title text-center mb-2">${v.name}</h5>
						<hr>
						<button class="btn btn-outline-danger btn-block btn-addtocart" data-id="${i}" data-name="${v.name}" data-price=${v.price}>Add to Cart</button>
					</div>
				</div>
			</div>
			`;
		return html;
	}

})