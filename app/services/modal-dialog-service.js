import Service from '@ember/service';

export default Service.extend({
    model: null,

    showModalDialog() {
      $('.ui.modal')
        .modal('show');
    }
});
