let addDataNew;

$(document).ready(function () {
  fetchData();

  $('.design_property').on('click', function(){
    $('.design_properties_tab').css('display', 'block');
    $('.function_properties_tab').css('display', 'none');
    $(this).addClass('tab_active');
    $('.funtion_property').removeClass('tab_active');
  });

  $('.funtion_property').on('click', function(){
    $('.function_properties_tab').css('display', 'block');
    $('.design_properties_tab').css('display', 'none');
    $('.design_property').removeClass('tab_active');
    $(this).addClass('tab_active');
  });

  $('body').on('focus','#decision_name', '#decision_desc', function(){
    let decisionName = $(this).val();
    // alert($(this).val());
  });

  $('#button_with_bg').on('click', function(){
    $('.decision_btn').removeClass('take_decision_btn button_with_border button_with_bg_rounded button_with_border_rounded');
    $('.decision_btn').addClass('button_with_bg');
  });
  $('#button_with_border').on('click', function(){
    $('.decision_btn').removeClass('take_decision_btn button_with_bg button_with_bg_rounded button_with_border_rounded');
    $('.decision_btn').addClass('button_with_border');
  });
  $('#button_with_bg_rounded').on('click', function(){
    $('.decision_btn').removeClass('take_decision_btn button_with_bg button_with_border button_with_border_rounded');
    $('.decision_btn').addClass('button_with_bg_rounded');
  });
  $('#button_with_border_rounded').on('click', function(){
    $('.decision_btn').removeClass('take_decision_btn button_with_bg button_with_border button_with_bg_rounded');
    $('.decision_btn').addClass('button_with_border_rounded');
  });

  $('body').on('click', '.intermediate_decision_box', function(){
    $(this).toggleClass('decision_box_active decision_box');
    // let parentWrapper = $(this).closest('#decision').find('.check_wrapper .check_toggler');
    // parentWrapper.toggleClass('check_icon check_icon_active');
    // let decisionAttr = $(this).attr('data-id');
    // let checkAttr = parentWrapper.attr('data-id');
    // alert(decisionAttr);
    // alert(checkAttr);
    // if(decisionAttr === checkAttr){
    //   alert('satisfied');
    //   parentWrapper.toggleClass('check_icon check_icon_active');
    // }
    // else{
    //   alert('not satisfied'); 
    //   parentWrapper.removeClass('check_icon_active');
    // }
});


  // Accordion js starts here
  $(".accordion").on("click", ".heading", function () {
    $(this).toggleClass("active").next().slideToggle();

    $(".contents").not($(this).next()).slideUp(300);

    $(this).siblings().removeClass("active");
  });
  // Accordion js ends here

// Dropdown js starts here
  $('.dropdown_toggle').click(function() { 
    $(this).next('.dropdown').slideToggle();
  });
  $('.dropdown').on('click', 'li', function() {
    let text = $(this).text();
    $(this).parents().find('.dropdown_toggle').text(text);
  });

  $(document).click(function(e) { 
  let target = e.target; 
  if (!$(target).is('.dropdown_toggle') && !$(target).parents().is('.dropdown_toggle')) 
    { $('.dropdown').slideUp(); }
  });


  $('.dropdown_toggle1').click(function() { 
    $(this).next('.dropdown1').slideToggle();
  });
  $('.dropdown1').on('click', 'li', function() {
    let text1 = $(this).text();
    $(this).parents().find('.dropdown_toggle1').text(text1);
  });

  $(document).click(function(e) { 
  let target = e.target; 
  if (!$(target).is('.dropdown_toggle1') && !$(target).parents().is('.dropdown_toggle1')) 
    { $('.dropdown1').slideUp(); }
  });

  $('.dropdown_toggle2').click(function() { 
    $(this).next('.dropdown2').slideToggle();
  });
  $('.dropdown2').on('click', 'li', function() {
    let text1 = $(this).text();
    $(this).parents().find('.dropdown_toggle2').text(text1);
  });

  $(document).click(function(e) { 
  let target = e.target; 
  if (!$(target).is('.dropdown_toggle2') && !$(target).parents().is('.dropdown_toggle2')) 
    { $('.dropdown2').slideUp(); }
  });
  // Dropdown js ends here

  // Function to add a new decision
  function addDecision(name, desc) {
    $.ajax({
      url: "https://65979470668d248edf23020b.mockapi.io/myxd",
      type: "POST",
      dataType: "json",
      data: {
        Name: name,
        Description: desc
      },
      success: function (data) {
        addDataNew = data;
        fetchData();
      },
      error: function (error) {
        console.error("Error adding decision:", error);
      },
    });
  }

  // Function to delete a decision
  function deleteDecision(decisionId) {
    $.ajax({
      url: "https://65979470668d248edf23020b.mockapi.io/myxd/" + decisionId,
      type: "DELETE",
      success: function (data) {
        fetchData();
      },
      error: function (error) {
        console.error("Error deleting decision:", error);
      },
    });
  }

  // Add a new decision on button click
  $('#addDecisionBtn').on('click', function () {
    var newName = 'New Decision Name'; // Replace with actual data
    var newDesc = 'New Decision Description'; // Replace with actual data

    addDecision(newName, newDesc);
  });

  // Delete a decision on button click
  $(document).on('click', '.delete_btn', function () {
    var decisionId = $(this).data('id');

    if (confirm("Are you sure you want to delete this decision?")) {
      deleteDecision(decisionId);
    }
  });
});

function fetchData() {
  $.ajax({
    url: "https://65979470668d248edf23020b.mockapi.io/myxd",
    type: "GET",
    dataType: "json",
    success: function (data) {
      // Get the last object from the array
      var lastObject = data[data.length - 1];
      addDataNew = lastObject;
      $("#decision").empty();
      $.each(data, function (i, item) {
        let id = item.id;
        let name = item.Name;
        let desc = item.Description;
        let contents = `<div class="row align-items-center mt-3">
          <div class="col-lg-1 check_wrapper">
            <span class="check_icon check_toggler rounded-circle" data-id="${id}">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="#fff"><path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path></svg>
            </span>
          </div>
          <div class="col-lg-11">
            <div class="decision_box intermediate_decision_box" data-id="${id}">
              <div class="row align-items-center">
                <div class="col-lg-7">
                  <div class="d-flex align-items-center gap-4">
                    <span class="square_icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="#808080"><path d="M17 2H7C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5z"></path></svg>
                    </span>
                    <div>
                      <input type="text" class="fw-semibold primary_text_color m-0 font_size_12 w-100" value="${name}" id="decision_name">
                      <input type="text" class="fw-normal secondary_text_color m-0 font_size_12 mt-2 w-100" id="decision_desc" value="${desc}">
                    </div>
                  </div>
                </div>
                <div class="col-lg-5 text-end">
                  <button class="btn take_decision_btn decision_btn me-3 font_size_14">Take Decision</button>
                  <span class="delete_btn" data-id="${id}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#808080">
                      <path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path>
                      <path d="M9 10h2v8H9zm4 0h2v8h-2z"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>`;
        $("#decision").append(contents);
      });
    },
    error: function (error) {
      console.error("Error fetching data:", error);
    },
  });
}
