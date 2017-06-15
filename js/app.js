var Cat = function() {
    this.clickCount = ko.observable(0);
    this.name = ko.observable('Tabby');
    this.imgSrc = ko.observable('img/434164568_fea0ad4013_z.jpg');
    this.imgAttribution = ko.observable('https://www.flickr.com/photos/big');

    this.level = ko.computed(function() {
        if (this.clickCount() <= 10) {
            return 'Newborn'
        } else if (this.clickCount() > 10 && this.clickCount() <= 25) {
            return 'Infant';
        } else if (this.clickCount() > 25 && this.clickCount() <= 40) {
            return 'Teen';
        } else if (this.clickCount() > 40) {
            return 'Adult';
        }
    }, this);

    this.nicks = ko.observableArray([
        {nick: 'tabtab'},
        {nick: 't-muffin'},
        {nick: 'tabariffic'}
    ]);
}

var ViewModel = function() {
    //Forces the context to stay within the viewmodel
    var that = this;

    this.currentCat = ko.observable(new Cat());


    this.incrementCounter = function() {
        //The 'with' keyword in the DOM is placing this in the currentCat binding
        //context. Could have simply used 'this' here instead of 'that.currentCat'
        //but the latter helps with maintainability in showing that the currentCat
        //is being referenced.
        that.currentCat().clickCount(that.currentCat().clickCount() + 1);
    };
}

ko.applyBindings(new ViewModel());