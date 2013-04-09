var suite = require('./kasperle').suite();

suite.run('/', function(test, waitFor) {

    waitFor(function() {
        return suite.exists('#splash-overlay.hide');
    });

    test('Click on featured app', function() {
        suite.press('.featured ul li a:first-child');
    });

    waitFor(function() {
        // Wait for reviews to load in.
        return suite.exists('#reviews-detail ul, #reviews-detail p.not-rated');
    });

    test('Detail page baseline tests', function(assert) {
        assert.URL(/\/app\/[a-zA-Z0-9]+/);
        //assert.invisible('#search-q');
        assert.invisible('.expand-toggle');
        assert.hasText('h1.title');

        assert.textIsnt('.mkt-tile h3', 'Loading...');
        assert.textIsnt('.mkt-tile .price', 'Loading...');

        assert.hasText('.blurbs .summary');

        assert.selectorExists('.support ul li');

        suite.capture('detail.png');
    });
});
