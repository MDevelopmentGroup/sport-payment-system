/**
 * Created by Victor77 on 10.12.13.
 */
var app=angular.module('Dance.Filters', []);

app.filter('ReplaceLabel', function() {
    return function(input) {
        return input ? 'label-success' : 'label-danger';
    };
});
