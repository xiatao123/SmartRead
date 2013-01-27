var SR = SR || {};

SR.AdminStoriesView = Backbone.View.extend({

    initialize:function () {
        this.render();
    },

    render:function () {
        var stories = this.model.models;
        $(this.el).html(this.template({
            action: this.model.toJSON()
        }));
        return this;
    },

    events: {
    }
});