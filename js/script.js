function searchMovie() {
	$('#movie-list').html(`
	
	`);
	
	$.ajax({
		url: 'https://www.omdbapi.com/',
		type: 'get',
		dataType: 'json',
		data: {
			'apikey': 'f2128e56',
			's': $('#search-input').val()
		},
		success: function (result) {
			if (result.Response == "True") {
				let movies = result.Search;
                
				$.each(movies, function (i, data) {
					$('#movie-list').append(`
						<div class="col-md-3 mb-5">
							<div class="card h-100">
								<img src="`+ data.Poster + `" class="card-img-top movie-poster" alt="">
								<div class="card-body text-center">
									<h2 class="card-title movie-title">`+ data.Title +`</h2>
									<p class="card-subtitle mb-2 text-muted">`+ data.Year +`</p>
									<a href="#" class="card-link see-detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="`+ data.imdbID +`">See Detail</a>
								</div>
							</div>			
						</div>
                    `);
				});

				// Menghilangkan input di search bar
				$('#search-input').val('');
                    
            }
			
						else {
                $('#movie-list').html(`
                <div class="col">
                <h2 class="text-center">`+ result.Error +`</h2>
                </div>
                `)
            }
        }
    });
}


// Function film awal
function indexMovie() {	
	$.ajax({
		url: 'https://www.omdbapi.com/',
		type: 'get',
		dataType: 'json',
		data: {
			'apikey': 'f2128e56',
			's': 'x-men',
			'type': 'movie',
		},
		success: function (result) {
			if (result.Response == "True") {
				let movies = result.Search;
                
				$.each(movies, function (i, data) {
					$('#movie-list').append(`
						<div class="col-md-3 mb-5">
							<div class="card h-100">
								<img src="`+ data.Poster + `" class="card-img-top movie-poster" alt="">
								<div class="card-body text-center">
									<h2 class="card-title movie-title">`+ data.Title +`</h2>
									<p class="card-subtitle mb-2 text-muted">`+ data.Year +`</p>
									<a href="#" class="card-link see-detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="`+ data.imdbID +`">See Detail</a>
								</div>
							</div>			
						</div>
                    `);
				});

				// Menghilangkan input di search bar
				$('#search-input').val('');
                    
            }
			

        }
    });
}
// Function film awal end

$(function () {
	indexMovie();
});

$('#search-button').on('click', function () {
	searchMovie();
});

$('#search-input').on('keyup', function (e) {
	if (e.which === 13) {
		searchMovie();
	}
});

// Modal See Detail
$('#movie-list').on('click', '.see-detail', function () {
		$.ajax({
			url: 'https://www.omdbapi.com/',
			type: 'get',
			dataType: 'json',
			data: {
				'apikey': 'f2128e56',
				'i': $(this).data('id'),
			},

			success: function (movie) {
				if (movie.Response === "True") {
					
					$('.modal-body').html(`
				<div class="container-fluid">
        <div class="row">
            <div class="col-md-4">
                <img src="`+ movie.Poster + `" class="img-fluid">
            </div>
    
            <div class="col-md-8">
                <ul class="list-group">
                    <li class="list-group-item fw-bold fs-4">`+ movie.Title + `</li>
                    <li class="list-group-item"><span class="fw-bold">Released:</span> `+ movie.Released + `</li>
					<li class="list-group-item"><span class="fw-bold">Genre:</span> `+ movie.Genre + `</li>
					<li class="list-group-item"><span class="fw-bold">Actors:</span> `+ movie.Actors + `</li>
					<li class="list-group-item"><span class="fw-bold">Director:</span> `+ movie.Director + `</li>
					<li class="list-group-item"><span class="fw-bold">Synopsis:</span> `+ movie.Plot + `</li>
                </ul>
            </div>
        </div>
    </div>
				`);

				}
			}
		});
	});