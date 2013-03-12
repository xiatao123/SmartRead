var SR = SR || {};

SR.AdminTagsView = Backbone.View.extend({

    initialize:function () {
        this.render();
    },

    render:function () {
        $(this.el).html(this.template({
            action: this.model.toJSON()
        }));

        return this;
    }
});