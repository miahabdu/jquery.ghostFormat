(function($) {
  $.fn.ghostFormat = function(options) {
    var formatKeyUpInput, formatField, setFormat, settings, toggleFieldClass;
    settings = $.extend({
      type: "money",
      inputClass: ''
    }, options);
    formatMoney = function(value){
      return '$' + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
    }
    formatPhone = function(value) {
      return parseFloat(value).toFixed().replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    };
    formatSSN = function(value) {
      return parseFloat(value).toFixed().replace(/(\d{3})(\d{2})(\d{4})/, '$1-$2-$3');
    };
    setFormat = function(unformatted_val) {
      if (unformatted_val === '') return

      if (settings.type === 'money') {
        return formatMoney(unformatted_val);
      } else if (settings.type === 'phone') {
        return formatPhone(unformatted_val);
      } else if (settings.type === 'ssn') {
        return formatSSN(unformatted_val);
      }
    };
    formatKeyUpInput = function(unformatted) {
      var num;
      num = unformatted.val().replace(/[^0-9\.]/g, "");
      if (settings.type === "money") {
        if (num % 1 !== 0) {
          return false;
        }
        return unformatted.val("$" + num.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"));
      } else if (settings.type === "phone") {
        if (num.length > 10) {
          return false;
        }
        return unformatted.val(num.replace(/(\d{3})(\d{3})(?=(?!\d{10}))/g, "($1) $2-"));
      } else if (settings.type === "ssn") {
        if (num.length > 9) {
          return false;
        }
        return unformatted.val(num.replace(/(\d{3})(\d{2})(?=(?!\d{10}))/g, "$1-$2-"));
      }
    };

    toggleFieldClass = function(show_hide, unformatted, formatted) {
      var unformatted_val;
      if (show_hide === 'show') {
        unformatted.addClass('hidden');
        $(formatted).removeClass('hidden');
        unformatted_val = unformatted.val().replace(/[^0-9\.]/g, '');
        $(unformatted).val(unformatted_val);
        return $(formatted).val(setFormat(unformatted_val));
      } else {
        $(formatted).addClass('hidden');
        unformatted.removeClass('hidden');
        unformatted.focus();
        unformatted_val = unformatted.val().replace(/[^0-9\.]/g, '');
        $(unformatted).keyup(function(event) {
          if (event.which >= 37 && event.which <= 40) {
            event.preventDefault();
          }
          return formatKeyUpInput(unformatted);
        });
        $(unformatted).val(unformatted_val);
        return $(formatted).val(setFormat(unformatted_val));
      }
    };
    formatField = function(unformatted, formatted) {
      toggleFieldClass('show', unformatted, formatted);
      unformatted.blur(function() {
        return toggleFieldClass('show', unformatted, formatted);
      });
      return $(formatted).on("focus click", function() {
        return toggleFieldClass('', unformatted, formatted);
      });
    };
    return this.each(function() {
      var formatted, ghost_id, id, unformatted;
      id = $(this).attr("id");
      unformatted = $('#' + id);
      ghost_id = id + "_ghost_input";
      $('<input type="text" value="123" class=' + ghost_id + ' />').insertAfter(unformatted);
      formatted = $('.' + ghost_id);
      formatted.addClass(settings.inputClass);
      formatField(unformatted, formatted);
    });
  };
})(jQuery);
