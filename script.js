window.addEventListener("load", function() {
    var inputs = document.querySelectorAll('input[type="radio"]');
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener("click", function() {
        var row = this.closest("tr");
        if (this.value == "present") {
          row.classList.remove("absent");
          row.classList.add("attendance");
        } else {
          row.classList.remove("attendance");
          row.classList.add("absent");
        }
      });
    }
  });
  