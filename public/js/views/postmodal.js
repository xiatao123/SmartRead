var SR = SR || {};

SR.PostModalView = Backbone.View.extend({

    initialize: function() {
    },

    render: function() {
        this.el = this.template(this.model.toJSON());

        return this;

    }


});