$(function () {
  // Scrape news articles 
  $('scrape').on('click', function (event) {
    event.preventDefault();
    $.ajax({
        method: 'GET',
        url: '/scrape'
      })

      .then(function (data) {
        if (data) {
          console.log('Scraping completed');
        } else {
          console.log('error');
        }
      });
  });

  $(document).on('click', '#delete-unsaved', function () {
    $.ajax({
      method: 'DELETE',
      url: '/articles/' + $(this).attr('data-id'),
    }).then(function () {
      // console.log('delete')
    });
  });

  $(document).on('click', '#save-btn', function () {
    $.ajax({
      method: 'PUT',
      url: '/articles/' + $(this).attr('data-id'),
      data: {
        saved: true
      }
    }).then(function () {
      console.log('Updating complete')
    })
  });

  $(document).on('click', '#unsave-btn', function () {
    $.ajax({
      method: 'PUT',
      url: '/articles/' + $(this).attr('data-id'),
      data: {
        saved: false
      }
    }).then(function () {
      console.log('Updating complete')
    });

    //When the button is clicked on a article to Add a comment, an area will appear where a comment can be applied to the specific article
    $(document).on('click', '#comment-btn', function () {
      let thisId = $(this).attr('data-id');
      $('#notes').empty();
      // make an ajax call for the Article 
      $ajax({
        method: 'GET',
        url: '/articles/' + thisId,
        success: functioin(data) {
          $("#notes").addClass("shadow mt-5 mb-5 bg-white rounded h-75")
        }
      })

      if (data.note) {
        $("#notes").append("<button data-id='" + data.note._id + "' id='update-note' class='mt-2 btn btn-success mb-2'>Update</button>");
        // Place the title of the note in the title input
        $('#title').val(data.note.title);
        // Place the body of the note in the body textarea
        $('#body').val(data.note.body);
      } else {
        $("#notes").append("<button data-id='" + data._id + "' id='enter-note' class='mt-2 btn btn-success mb-2'>Submit Note</button>");
      }
    }); 
  }); 

$(document).on('click', '#enter-note', function() {
  $.ajax({
    method: "POST",
    url: "/articles/" + $(this).attr("data-id"),
    data: {
        title: $("#title").val().trim(),
        body: $("#body").val().trim()
    }
}).then(function(data) {
  $('#notes').empty(); 
})
$('#title').val(''); 
$('#body').val(''); 
}); 

// Updating the note that's already stored
$(document).on('click', '#update-note', function() {
  $.ajax({
    method: 'PUT', 
    url: '/note/' + $(this).attr('data-id'), 
    data: {
      title: $('title').val().trim(), 
      body: $('#body').val().trim()
    }
  }).then(function(data) {
    console.log(data); 
    $('#notes').empty(); 
  })

  $('#title').val(''); 
  $('#body').val(''); 
}); 









// Click Events

// Click event to add a book to the db
// $("#addbook").on("click", function() {
//   $.ajax({
//     type: "POST",
//     url: "/submit",
//     dataType: "json",
//     data: {
//       title: $("#title").val(),
//       author: $("#author").val(),
//       created: Date.now()
//     }
//   })
//     .then(function(data) {
//       console.log(data);
//       getUnread();
//       $("#author").val("");
//       $("#title").val("");
//     }
//     );
//   return false;
// });

// // Click event to mark a book as read
// $(document).on("click", ".markread", function() {
//   var thisId = $(this).attr("data-id");
//   $.ajax({
//     type: "PUT",
//     url: "/markread/" + thisId
//   });
//   $(this).parents("tr").remove();
//   getRead();
// });

// // Click event to mark a book as not read
// $(document).on("click", ".markunread", function() {
//   var thisId = $(this).attr("data-id");
//   $.ajax({
//     type: "PUT",
//     url: "/markunread/" + thisId
//   });
//   $(this).parents("tr").remove();
//   getUnread();
// });


// // Functions

// // Load unread books and render them to the screen
// function getUnread() {
//   $("#unread").empty();
//   $.getJSON("/unread", function(data) {
//     for (var i = 0; i < data.length; i++) {
//       $("#unread").prepend("<tr><td>" + data[i].title + "</td><td>" + data[i].author +
//         "</td><td><button class='markread' data-id='" + data[i]._id + "'>Mark Read</button></td></tr>");
//     }
//     $("#unread").prepend("<tr><th>Title</th><th>Author</th><th>Read/Unread</th></tr>");
//   });
// }

// // Load read books and render them to the screen
// function getRead() {
//   $("#read").empty();
//   $.getJSON("/read", function(data) {
//     for (var i = 0; i < data.length; i++) {
//       $("#read").prepend("<tr><td>" + data[i].title + "</td><td>" + data[i].author +
//         "</td><td><button class='markunread' data-id='" + data[i]._id + "'>Mark Unread</button></td></tr>");
//     }
//     $("#read").prepend("<tr><th>Title</th><th>Author</th><th>Read/Unread</th></tr>");
//   });
// }

// // Calling our functions
// getUnread();
// getRead();
