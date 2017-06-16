//Our cats
var initialCats = [
    {
        clickCount : 0,
        name : 'Tabby',
        imgSrc : 'img/434164568_fea0ad4013_z.jpg',
        imgAttribution : 'https://www.flickr.com/photos/bigtallguy/434164568',
        nicks: [{nick: 'tabtab'},{nick: 't-muffin'},{nick: 'tabariffic'},{nick:'Ponch'}]
    },
    {
        clickCount : 0,
        name : 'Tiger',
        imgSrc : 'img/4154543904_6e2428c421_z.jpg',
        imgAttribution : 'https://www.flickr.com/photos/xshamx/4154543904',
        nicks: [{nick:'Tigger'}]
    },
    {
        clickCount : 0,
        name : 'Scaredy',
        imgSrc : 'img/22252709_010df3379e_z.jpg',
        imgAttribution : 'https://www.flickr.com/photos/kpjas/22252709',
        nicks: [{nick:'Shooby'}]
    },
    {
        clickCount : 0,
        name : 'Shadow',
        imgSrc : 'img/1413379559_412a540d29_z.jpg',
        imgAttribution : 'https://www.flickr.com/photos/malfet/1413379559',
        nicks: [{nick:'Casper'}]
    },
    {
        clickCount : 0,
        name : 'Sleepy',
        imgSrc : 'img/9648464288_2516b35537_z.jpg',
        imgAttribution : 'https://www.flickr.com/photos/onesharp/9648464288',
        nicks: [{nick:'Zzzzz'}]
    }
];

//OOP function that allows us to build multiple cats easily from the same prototype
var Cat = function(data) {
    this.clickCount = ko.observable(data.clickCount);
    this.name = ko.observable(data.name);
    this.imgSrc = ko.observable(data.imgSrc);
    this.imgAttribution = ko.observable(data.imgAttribution);

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

    this.nicks = ko.observableArray(data.nicks);
}

var ViewModel = function() {
    //Forces the context to stay within the viewmodel
    var that = this;

    //This will hold the objects from the 'initialCats' array. The observable array will automatically
    //udate any bound DOM elements whenever the array changes.
    this.catList = ko.observableArray([]);

    //Push the initialCat objects to the observable array.
    initialCats.forEach(function(catItem) {
        that.catList.push(new Cat(catItem));
    });

    //This will hold the currently selected cat.
    this.currentCat = ko.observable(this.catList()[0]);

    //This will be the click functionality for the cat elements displayed in the DOM. It will
    //update the current cat to be whichever cat was clicked.
    this.setCat = function(clickedCat) {
        //alert(index);
        that.currentCat(clickedCat);
    };

    this.incrementCounter = function() {
        //The 'with' keyword in the DOM is placing this call in the currentCat binding
        //context. Could have simply used 'this' here instead of 'that.currentCat'
        //but the latter accesses the outer 'this' andhelps with maintainability in
        //showing that the currentCat is being referenced. 'this.currentCat' produces an
        //error because, as mentioned before, the 'with' keyword set the binding to currentCat
        //so effectively 'this.currentCat' would have been 'currentCat.currentCat'
        that.currentCat().clickCount(that.currentCat().clickCount() + 1);
    };
}

ko.applyBindings(new ViewModel());