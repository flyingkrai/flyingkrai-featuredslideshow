// Generated by CoffeeScript 1.6.3
var Flying;

Flying = Flying || {};

Flying.Admin = (function($) {
  var bindEvents, countList, deleteItem, getEmptyList, handleUploadChoise, showImageUpload, sortableList, __addNew, __emptyList, __item, __list, __remove;
  __addNew = '.slide-add-new';
  __remove = '.remove';
  __list = '.slide-list tbody';
  __item = '.slide-item';
  __emptyList = '';
  getEmptyList = function() {
    return $.ajax({
      url: Flying.url,
      type: 'post',
      dataType: 'html',
      data: {
        action: Flying.admin_action,
        ajaxAction: 'empty_line',
        nonce: Flying.nonce
      }
    }).done(function(data) {
      return __emptyList = data;
    }).fail(function() {
      return console.log('Oh noes!');
    });
  };
  sortableList = function() {
    $(__list).sortable({
      placeholder: 'placeholder',
      forcePlaceholderSize: true,
      opacity: 0.8
    });
    return $(__list).disableSelection();
  };
  showImageUpload = function() {
    return window.tb_show('', 'media-upload.php?type=image&TB_iframe=true');
  };
  handleUploadChoise = function(html) {
    var image, imageId;
    image = jQuery('img', html);
    imageId = image.attr('class').replace(/(.*?)wp-image-/, '');
    window.tb_remove();
    return $.ajax({
      url: Flying.url,
      type: 'post',
      dataType: 'html',
      data: {
        action: Flying.admin_action,
        ajaxAction: 'new_line',
        image: {
          id: imageId
        },
        nonce: Flying.nonce
      }
    }).done(function(data) {
      var list;
      list = $(__list);
      if (countList() === 0) {
        list.empty();
      }
      return list.append(data);
    }).fail(function() {
      return console.log('Oh noes!');
    });
  };
  countList = function() {
    return $(__list).find(__item).length;
  };
  deleteItem = function(item) {
    if (countList() > 1) {
      return item.remove();
    } else {
      return $(__list).empty().append(__emptyList);
    }
  };
  bindEvents = function() {
    getEmptyList();
    $(__addNew).bind('click', function(event) {
      event.preventDefault();
      return showImageUpload();
    });
    $(__list).find(__item).find(__remove).bind('click', function(event) {
      var item;
      event.preventDefault();
      item = $(this).parents(__item);
      return deleteItem(item);
    });
    window['send_to_editor'] = handleUploadChoise;
    return sortableList();
  };
  return {
    init: function() {
      return bindEvents();
    }
  };
})(jQuery);

jQuery(function() {
  return Flying.Admin.init();
});
