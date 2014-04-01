(function($) {
  $.fn.ghostFormat = function(options) {
    var formatField, setFormat, settings, toggleFieldClass;
    settings = $.extend({
      type: "money",
      inputClass: ''
    }, options);
    Number.prototype.formatMoney = function() {
      return '$' + this.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
    };
    Number.prototype.formatPhone = function() {
      return this.toFixed().replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    };
    Number.prototype.formatSsn = function() {
      return this.toFixed().replace(/(\d{3})(\d{2})(\d{4})/, '$1-$2-$3');
    };
    setFormat = function(formatted, unformatted_val) {
      if (settings.type === 'money') {
        return Number(unformatted_val).formatMoney();
      } else if (settings.type === 'phone') {
        return Number(unformatted_val).formatPhone();
      } else if (settings.type === 'ssn') {
        return Number(unformatted_val).formatSsn();
      }
    };
    toggleFieldClass = function(show_hide, unformatted, formatted) {
      var unformatted_val;
      if (show_hide === 'show') {
        unformatted.addClass('hidden');
        $(formatted).removeClass('hidden');
        unformatted_val = unformatted.val();
        return $(formatted).val(setFormat(formatted, unformatted_val));
      } else {
        $(formatted).addClass('hidden');
        unformatted.removeClass('hidden');
        unformatted.focus();
        unformatted_val = unformatted.val();
        return $(formatted).val(setFormat(formatted, unformatted_val));
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
